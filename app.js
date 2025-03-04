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
    //query for the dropdown of deleteCar.hbs
    let dropdown_query1 = "SELECT carID, make AS Make, model AS Model FROM Cars";

    db.pool.query(dropdown_query1, function(error, rows, fields){   

        return res.render('deleteCar', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/updateCar', (req, res) => {
    // query for filling in info for updateCar.hbs
    let info_query1 = "SELECT carID, make AS Make, model AS Model, modelYear AS Year, carValue AS Value FROM Cars";

    db.pool.query(info_query1, function(error, rows, fields){   

        return res.render('updateCar', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/cars', function(req, res)
{
    // Cars Queries
    // get all cars make, model, modelYear, and carValue for the cars.html list
    let cars_query1 = "SELECT carID, make AS Make, model AS Model, modelYear AS Year, carValue AS Value FROM Cars";

    // run the get query
    db.pool.query(cars_query1, function(error, rows, fields){   
        let cars = rows;                                        //each car is a row in the table
        return res.render('cars', {data: cars});                //renders the hbs page and gives it the sql data
    })
});

app.get('/customers', function(req, res)
{
    // Customers Queries
    // get name and contactNumber from Customers for cutomers.html list
    let customers_query1 = "SELECT customerID, name, contactNumber FROM Customers";
    
    // run the get query
    db.pool.query(customers_query1, function(error, rows, fields){
        let customers = rows;                                                //each transactionCar is a row in the table
        return res.render('customers', {data: customers});                //renders the hbs page and gives it the sql data
    })
});                                                    

app.get('/locations', function(req, res)
{
    // Locations Queries
    // get locationName from Locations for locations.html list
    let locations_query1 = "SELECT locationID, locationName FROM Locations";

    // run the get query
    db.pool.query(locations_query1, function(error, rows, fields){
        let locations = rows;                                                //each transactionCar is a row in the table
        return res.render('locations', {data: locations});                //renders the hbs page and gives it the sql data
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

    // query to get all customers for dropdown
    let transactions_query2 = `SELECT customerID, name AS customerName FROM Customers`;

    // query to get all locations for dropdown
    let transactions_query3 = `SELECT locationID, locationName FROM Locations`;

    // run the get query
    db.pool.query(transactions_query1, function(error, transactions) {

        db.pool.query(transactions_query2, function(error, customers) {
    
            db.pool.query(transactions_query3, function(error, locations) {
                //renders the hbs page and gives it the sql data
                res.render('transactions', {transactions: transactions, customers: customers, locations: locations});
            });
        });
    });
});  


app.get('/transactionCars', function(req, res)
{
    // transactionCars Queries
    // get locationName from Locations for locations.hbl list
    let transactionCars_query1 = 
       `SELECT TransactionCars.transactionCarID, TransactionCars.salesID, Cars.make, Cars.model, Cars.modelYear, TransactionCars.salePrice FROM TransactionCars
        JOIN Cars ON TransactionCars.carID = Cars.carID
        ORDER BY TransactionCars.salesID`;

    // query to get all transactions for dropdown
    let transactionCars_query2 = `SELECT Transactions.salesID, Transactions.transactionDate, Customers.customerID, Customers.name AS customerName FROM Transactions
                                  JOIN Customers ON Transactions.customerID = Customers.customerID`;

    // query to get all cars for dropdown
    let transactionCars_query3 = `SELECT Cars.carID, Cars.make AS Make, Cars.model AS Model FROM Cars`;

    // run the get query
    db.pool.query(transactionCars_query1, function(error, transactionCars) {

        db.pool.query(transactionCars_query2, function(error, transactions) {
    
            db.pool.query(transactionCars_query3, function(error, cars) {
                //renders the hbs page and gives it the sql data
                res.render('transactionCars', {data: transactionCars, transactions: transactions, cars: cars});
            });
        });
    });
});  



/**************************************************************************
    POST
**************************************************************************/

app.post('/add-car-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // make sure to handle if value is null
    let Value = parseInt(data['input-Value']);              //turns inputted carValue into an int called Value and if 0 or NaN it becomes NULL in the db
    if (isNaN(Value)) {
        Value = null;
    }

    // insert a car into cars table in the database
    let post_car_query1 = 
       `INSERT INTO Cars (make, model, modelYear, carValue) 
        VALUES (?, ?, ?, ?)`;           // ? are placeholders for program security

    // subit the query
    db.pool.query(post_car_query1, [data['input-Make'], data['input-Model'], data['input-Year'], Value], function(error, rows, fields) {

        res.redirect('/cars'); // redirect back to cars page
    });

})

app.post('/add-customer-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a customer into Customers table
    let post_customer_query1 = 
        `INSERT INTO Customers (name, contactNumber)
        VALUES (?, ?)`;           // ? are placeholders for program security

    // subit the query
    db.pool.query(post_customer_query1, [data['input-Name'], data['input-ContactNumber']], function(error, rows, fields) {

        res.redirect('/customers'); // redirect back to cars page
    });

})

app.post('/add-location-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a location into Locations table
    let post_location_query1 = 
        `INSERT INTO Locations (locationName)
        VALUES (?)`;           // ? are placeholders for program security

    // subit the query
    db.pool.query(post_location_query1, [data['input-Location']], function(error, rows, fields) {

        res.redirect('/locations'); // redirect back to cars page
    });

})

app.post('/add-transaction-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a car into cars table in the database
    let post_transaction_query1 = 
       `INSERT INTO Transactions (transactionDate, customerID, toLocation, fromLocation)
        VALUES (?, ?, ?, ?)`;           // ? are placeholders for program security

    // subit the query
    db.pool.query(post_transaction_query1, [data['input-Date'], data['input-Customer'], data['input-To'], data['input-From']], function(error, rows, fields) {

        res.redirect('/transactions'); // redirect back to cars page
    });

})

app.post('/add-transactionCar-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    console.log("Incoming form data:", data);

    // insert a car into cars table in the database
    let post_transaction_car_query1 = 
       `INSERT INTO TransactionCars (salesID, carID, salePrice)
        VALUES (?, ?, ?)`;           // ? are placeholders for program security

    console.log("Executing query:", post_transaction_car_query1);
    console.log("Query parameters:", [data['input-salesID'], data['input-car'], data['input-salePrice']]);

    // subit the query
    db.pool.query(post_transaction_car_query1, [data['input-salesID'], data['input-car'], data['input-salePrice']], function(error, rows, fields) {
        if (error) {
            console.error('Error executing query:', error);
            console.error('Full error object:', JSON.stringify(error, null, 2)); // Log the full error object
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/transactionCars'); // redirect back to cars page
    });

})



/**************************************************************************
    DELETE
**************************************************************************/
app.delete('/delete-car-ajax/', function(req, res, next){ 
    let data = req.body;                                                // assigns the data from deleteCar (being the id of the deleted car) into the request body
    let carID = parseInt(data.id);                                      // parses the carID into an int and names in carID in the route

    // query to delete a car by its ID
    let deleteCar_from_cars = `DELETE FROM Cars WHERE carID = ?`;       

    // run delete query
    db.pool.query(deleteCar_from_cars, [carID], function(error, rows, fields){
        res.sendStatus(204);
    })
})



/**************************************************************************
    PUT
**************************************************************************/

// Route for updating a car
app.put('/cars/:id', function(req, res) {                   //  uses /cars/:id to directly update the car instead of going through updateCar
    let carID = req.params.id;                              // retrieves the id from the request url and makes it carID
    let { Make, Model, ModelYear, CarValue } = req.body;    // assigns the data from the input into each variable

    // Handle CarValue for NULL support
    CarValue = parseFloat(CarValue);                        // converts CarValue to float and ensures that if it is left blank or 0 it becomes NULL in the db
    if (isNaN(CarValue) || CarValue === 0) {
        CarValue = null;
    }

    // query to update a car in Cars by carID using ? as placeholder
    const updateCarQuery =                                      
       `UPDATE Cars 
        SET make = ?, model = ?, modelYear = ?, carValue = ?
        WHERE carID = ?
    `;

    //submit the update query
    db.pool.query(updateCarQuery, [Make, Model, ModelYear, CarValue, carID], function(error, results, fields) {
        if (error) {
            console.error("Error updating car:", error);    //if there is an error message the console
            return;
        }
        res.sendStatus(200);
        console.log("Car updated successfully!");
    });
});





/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});