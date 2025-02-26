/*
    SETUP
*/

// Express setup
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9330;

// Database connector
var db = require('./database/db-connector')

//HandleBars setup
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

/**************************************************************************
    GET
**************************************************************************/

// setup routes for each page so navigation is possible
app.get('/diagram', (req, res) => {
    res.render('diagram');  // render diagram.hbs
});
app.get('/', function(req, res) {
    return res.render('index'); // render index.hbs as /
});
app.get('/deleteCar', (req, res) => {
    let dropdown_query1 = "SELECT carID, make AS Make, model AS Model FROM Cars";

    db.pool.query(dropdown_query1, function(error, rows, fields){   
        console.log("Cars data being sent to template:", rows);
        return res.render('deleteCar', {data: rows});
    })
});


app.get('/cars', function(req, res)
{
    // Cars Queries
    // get all cars make, model, modelYear, and carValue for the cars.html list
    let cars_query1 = "SELECT carID, make AS Make, model AS Model, modelYear AS Year, carValue AS Value FROM Cars";

    // run the get query
    db.pool.query(cars_query1, function(error, rows, fields){   
        let cars = rows;
        return res.render('cars', {data: rows});
    })
});

app.get('/customers', function(req, res)
{
    // Customers Queries
    // get name and contactNumber from Customers for cutomers.html list
    let customers_query1 = "SELECT customerID, name, contactNumber FROM Customers";
    
    // run the get query
    db.pool.query(customers_query1, function(error, rows, fields){
        let customers = rows;
        return res.render('customers', {data: customers});
    })
});                                                    

app.get('/locations', function(req, res)
{
    // Locations Queries
    // get locationName from Locations for locations.html list
    let locations_query1 = "SELECT locationID, locationName FROM Locations";

    // run the get query
    db.pool.query(locations_query1, function(error, rows, fields){
        let locations = rows;
        return res.render('locations', {data: locations});
    })
});       

app.get('/transactions', function(req, res)
{
    // transactions Queries
    // get locationName from Locations for locations.html list
    let transactions_query1 = 
       `SELECT Transactions.salesID AS salesID, Transactions.transactionDate AS transactionDate, Customers.name AS Name, LocationsFrom.locationName AS fromLocation, LocationsTo.locationName AS toLocation FROM Transactions
        JOIN Customers ON Transactions.customerID = Customers.customerID
        JOIN Locations AS LocationsFrom ON Transactions.fromLocation = LocationsFrom.locationID
        JOIN Locations AS LocationsTo ON Transactions.toLocation = LocationsTo.locationID`;

    // run the get query
    db.pool.query(transactions_query1, function(error, rows, fields){
        let transactions = rows;
        return res.render('transactions', {data: transactions});
    })
});  

app.get('/transactionCars', function(req, res)
{
    // transactionCars Queries
    // get locationName from Locations for locations.html list
    let transactionCars_query1 = 
       `SELECT TransactionCars.transactionCarID, TransactionCars.salesID, Cars.make, Cars.model, Cars.modelYear, TransactionCars.salePrice FROM TransactionCars
        JOIN Cars ON TransactionCars.carID = Cars.carID;`;

    // run the get query
    db.pool.query(transactionCars_query1, function(error, rows, fields){
        let transactionCars = rows;
        return res.render('transactionCars', {data: transactionCars});
    })
});  


/**************************************************************************
    POST
**************************************************************************/

app.post('/add-car-form', function(req, res) {
    let data = req.body;

    // make sure to handle if value is null
    let Value = parseInt(data['input-Value']);
    if (isNaN(Value))
    {
        Value = 'NULL'
    }

    // insert a car into cars table in the database
    post_car_query1 = `INSERT INTO Cars (make, model, modelYear, carValue) VALUES ('${data['input-Make']}', 
    '${data['input-Model']}', '${data['input-Year']}', '${data['input-Value']}')`;
    
    // submit the query
    db.pool.query(post_car_query1, function(error, rows, fields){

        res.redirect('/cars'); // redirect back to cars page
    })

})



/**************************************************************************
    DELETE
**************************************************************************/
app.delete('/delete-car-ajax/', function(req,res,next){ 
    let data = req.body;
    let carID = parseInt(data.id);
    let deleteCar_from_cars = `DELETE FROM Cars WHERE carID = ?`;

    // run delete query
    db.pool.query(deleteCar_from_cars, [carID], function(error, rows, fields){
        res.sendStatus(204);
    })
})



/**************************************************************************
    PUT
**************************************************************************/

  app.put('/put-person-ajax', function(req,res,next){
    let data = req.body;
  
    let homeworld = parseInt(data.homeworld);
    let person = parseInt(data.fullname);
  
    let queryUpdateWorld = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    let selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateWorld, [homeworld, person], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectWorld, [homeworld], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});






/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});