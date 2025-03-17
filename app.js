/*# Citation for the following functions: SETUP and LISTENER
2 # Date: 2/20/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their instruction and skeleton code to implement the listener and setup portions
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/


/*
    SETUP - all the required connetions to make node.js and handlebars function together
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
var exphbs = require('express-handlebars'); 
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs');

/*
    ROUTES - all the routes for each CRUD functionality of the hbs pages
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

// get routes to access each delete page
app.get('/deleteCar', (req, res) => {
    //query for the dropdown of deleteCar.hbs
    let dropdownCarQuery = "SELECT carID, make AS Make, model AS Model FROM Cars";

    db.pool.query(dropdownCarQuery, function(error, rows, fields){   // call the query
        
        return res.render('deleteCar', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/deleteLocation', (req, res) => {
    //query for the dropdown of deleteLocation.hbs
    let dropdownLocationQuery = "SELECT locationID, locationName AS location FROM Locations";

    db.pool.query(dropdownLocationQuery, function(error, rows, fields){   

        return res.render('deleteLocation', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/deleteCustomer', (req, res) => {
    //query for the dropdown of deleteCustomer.hbs
    let dropdownCustomerQuery = "SELECT customerID, name FROM Customers";

    db.pool.query(dropdownCustomerQuery, function(error, rows, fields){   
        
        return res.render('deleteCustomer', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/deleteTransaction', (req, res) => {
    //query for the dropdown of deleteTransaction.hbs
    let dropdownTransactionQuery = `SELECT Transactions.salesID, Transactions.transactionDate, Customers.customerID, Customers.name AS customerName FROM Transactions
                           JOIN Customers ON Transactions.customerID = Customers.customerID`;

    db.pool.query(dropdownTransactionQuery, function(error, rows, fields){   
        
        return res.render('deleteTransaction', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/deleteTransactionCar', (req, res) => {
    //query for the dropdown of deleteTransactionCar.hbs
    let dropdownTransactionCarQuery = `SELECT TransactionCars.salesID, TransactionCars.transactionCarID, Cars.carID, Cars.make, Cars.model FROM TransactionCars
                                       JOIN Cars on TransactionCars.carID = Cars.carID`;

    db.pool.query(dropdownTransactionCarQuery, function(error, rows, fields){   
        
        return res.render('deleteTransactionCar', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

// get routes to access each update page
app.get('/updateCar', (req, res) => {
    // query for filling in info for updateCar.hbs
    let infoCarsQuery = "SELECT carID, make AS Make, model AS Model, modelYear AS Year, carValue AS Value FROM Cars";

    db.pool.query(infoCarsQuery, function(error, rows, fields){   

        return res.render('updateCar', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/updateCustomer', (req, res) => {
    // query for filling in info for updateCustomer.hbs
    let infoCustomersQuery = "SELECT customerID, name, contactNumber FROM Customers";

    db.pool.query(infoCustomersQuery, function(error, rows, fields){   

        return res.render('updateCustomer', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/updateLocation', (req, res) => {
    // query for filling in info for updateLocation.hbs
    let infoLocationsQuery = "SELECT locationID, locationName FROM Locations";

    db.pool.query(infoLocationsQuery, function(error, rows, fields){   

        return res.render('updateLocation', {data: rows});           //renders the hbs page and gives it the sql data
    })
});

app.get('/updateTransaction', (req, res) => {
    // query for filling in info for updateTransaction.hbs
    let infoTransactionsQuery = `SELECT Transactions.salesID, Transactions.transactionDate, Customers.customerID, Customers.name AS customerName FROM Transactions
                       JOIN Customers ON Transactions.customerID = Customers.customerID`;

    // query to get all customers for dropdown
    let dropdownCustomersQuery = `SELECT customerID, name AS customerName FROM Customers`;

    // query to get all locations for dropdown
    let dropdownLocationsQuery = `SELECT locationID, locationName FROM Locations`;

    // run the triple query
    db.pool.query(infoTransactionsQuery, function(error, transactions) {

        db.pool.query(dropdownCustomersQuery, function(error, customers) {
    
            db.pool.query(dropdownLocationsQuery, function(error, locations) {
                //renders the hbs page and gives it the sql data and denotes what each handlebars dataset is titled
                res.render('updateTransaction', {transactions: transactions, customers: customers, locations: locations});
            });
        });
    });
});  

app.get('/updateTransactionCar', (req, res) => {
    // query for filling in info for updateTransactionCar.hbs
    let infoTransactionCarsQuery = `SELECT TransactionCars.salesID, TransactionCars.transactionCarID, Cars.carID, Cars.make, Cars.model FROM TransactionCars
                       JOIN Cars on TransactionCars.carID = Cars.carID`;

    // query to get all cars for dropdown
    let dropdownCarsQuery = `SELECT carID, make, model from Cars`;

    // run the get query
    db.pool.query(infoTransactionCarsQuery, function(error, transactions) {

        db.pool.query(dropdownCarsQuery, function(error, cars) {
            //renders the hbs page and gives it the sql data and denotes what each handlebars dataset is titled
            res.render('updateTransactionCar', {transactions: transactions, cars: cars});
        });

    });
}); 

// get routes for each main hbs page
app.get('/cars', function(req, res) {
    // get all cars make, model, modelYear, and carValue for the cars.hbs list
    let getCarsQuery = "SELECT carID, make AS Make, model AS Model, modelYear AS Year, carValue AS Value FROM Cars";

    // run the get query
    db.pool.query(getCarsQuery, function(error, cars, fields){   

        return res.render('cars', {data: cars});                //renders the hbs page and gives it the sql data
    })
});

app.get('/customers', function(req, res) {
    // get name and contactNumber from Customers for cutomers.hbs list
    let getCustomersQuery = "SELECT customerID, name, contactNumber FROM Customers";
    
    // run the get query
    db.pool.query(getCustomersQuery, function(error, customers, fields){

        return res.render('customers', {data: customers});                //renders the hbs page and gives it the sql data
    })
});                                                    

app.get('/locations', function(req, res) {
    // get locationName from Locations for locations.hbs list
    let getLocationsQuery = "SELECT locationID, locationName FROM Locations";

    // run the get query
    db.pool.query(getLocationsQuery, function(error, locations, fields){

        return res.render('locations', {data: locations});                //renders the hbs page and gives it the sql data
    })
});       

app.get('/transactions', function(req, res) {
    // get transactionDate, name, toLocation, fromLocation, from the db for the table
    let getTransactionsQuery = 
       `SELECT Transactions.salesID AS salesID, Transactions.transactionDate AS transactionDate, Customers.name AS Name, LocationsFrom.locationName AS fromLocation, LocationsTo.locationName AS toLocation FROM Transactions
        JOIN Customers ON Transactions.customerID = Customers.customerID
        JOIN Locations AS LocationsFrom ON Transactions.fromLocation = LocationsFrom.locationID
        JOIN Locations AS LocationsTo ON Transactions.toLocation = LocationsTo.locationID`;

    // query to get all customers for add transaction dropdown
    let getCustomersDropdownQuery = `SELECT customerID, name AS customerName FROM Customers`;

    // query to get all locations for add transaction dropdown
    let getLocationsDropdownQuery = `SELECT locationID, locationName FROM Locations`;

    // run the triple query
    db.pool.query(getTransactionsQuery, function(error, transactions) {

        db.pool.query(getCustomersDropdownQuery, function(error, customers) {
    
            db.pool.query(getLocationsDropdownQuery, function(error, locations) {
                //renders the hbs page and gives it the sql data and denotes what each hbs dataset is titled
                res.render('transactions', {transactions: transactions, customers: customers, locations: locations});
            });
        });
    });
});  


app.get('/transactionCars', function(req, res) {
    // get salesID, make, model, modelYearl, and salePrice from the db for the table
    let getTransactionCarsQuery = 
       `SELECT TransactionCars.transactionCarID, TransactionCars.salesID, Cars.make, Cars.model, Cars.modelYear, TransactionCars.salePrice FROM TransactionCars
        JOIN Cars ON TransactionCars.carID = Cars.carID
        ORDER BY TransactionCars.salesID`;

    // query to get all transactions for add transactionCar dropdown
    let getTransactionsDropdownQuery = `SELECT Transactions.salesID, Transactions.transactionDate, Customers.customerID, Customers.name AS customerName FROM Transactions
                                  JOIN Customers ON Transactions.customerID = Customers.customerID`;

    // query to get all cars for add transactionCar dropdown
    let getCarsDropdownQuery = `SELECT Cars.carID, Cars.make AS Make, Cars.model AS Model FROM Cars`;

    // run the get query
    db.pool.query(getTransactionCarsQuery, function(error, transactionCars) {

        db.pool.query(getTransactionsDropdownQuery, function(error, transactions) {
    
            db.pool.query(getCarsDropdownQuery, function(error, cars) {
                //renders the hbs page and gives it the sql data and denotes what each hbs dataset is titled
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
    let addCarQuery = 
       `INSERT INTO Cars (make, model, modelYear, carValue) 
        VALUES (?, ?, ?, ?)`;           // ? are placeholders for program security

    // submit the query - ['input-Make'] format is for program security and handles poor input
    db.pool.query(addCarQuery, [data['input-Make'], data['input-Model'], data['input-Year'], Value], function(error, rows, fields) {

        res.redirect('/cars'); // redirect back to cars page
    });

})

app.post('/add-customer-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a customer into Customers table
    let addCustomerQuery = 
        `INSERT INTO Customers (name, contactNumber)
        VALUES (?, ?)`;           // ? are placeholders for program security

    // submit the query - ['input-Name'] format is for program security and handles poor input
    db.pool.query(addCustomerQuery, [data['input-Name'], data['input-ContactNumber']], function(error, rows, fields) {

        res.redirect('/customers'); // redirect back to customers page
    });

})

app.post('/add-location-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a location into Locations table
    let addLocationQuery = 
        `INSERT INTO Locations (locationName)
        VALUES (?)`;           // ? are placeholders for program security

    // submit the query - ['input-Location'] format is for program security and handles poor input
    db.pool.query(addLocationQuery, [data['input-Location']], function(error, rows, fields) {

        res.redirect('/locations'); // redirect back to locations page
    });

})

app.post('/add-transaction-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a car into cars table in the database
    let addTransactionQuery = 
       `INSERT INTO Transactions (transactionDate, customerID, toLocation, fromLocation)
        VALUES (?, ?, ?, ?)`;           // ? are placeholders for program security

    // submit the query - ['input-Date'] format is for program security and handles poor input
    db.pool.query(addTransactionQuery, [data['input-Date'], data['input-Customer'], data['input-To'], data['input-From']], function(error, rows, fields) {

        res.redirect('/transactions'); // redirect back to transactions page
    });

})

app.post('/add-transactionCar-form', function(req, res) {
    let data = req.body;                                    // assigns the data from the inputs into the request body

    // insert a car into cars table in the database
    let addTransactionCarQuery = 
       `INSERT INTO TransactionCars (salesID, carID, salePrice)
        VALUES (?, ?, ?)`;           // ? are placeholders for program security

    // subit the query - ['input-salesID'] format is for program security and handles poor input
    db.pool.query(addTransactionCarQuery, [data['input-salesID'], data['input-car'], data['input-salePrice']], function(error, rows, fields) {

        res.redirect('/transactionCars'); // redirect back to transactionCars page
    });

})



/**************************************************************************
    DELETE
**************************************************************************/

app.delete('/delete-car-ajax/', (req, res) => {

    const carID = req.body.id;               // assigns the data from deleteCar (being the id of the deleted car) into the request body

    // disable foreign key checks
    let disableFKQuery = `SET FOREIGN_KEY_CHECKS=0;`;
    
    // query to delete a car by its ID
    let deleteCarQuery = `DELETE FROM Cars WHERE carID = ?;`;

    // enable foreign key checks
    let enableFKQuery = `SET FOREIGN_KEY_CHECKS=1;`;

    // run the triple query
    db.pool.query(disableFKQuery, (error) => {

        db.pool.query(deleteCarQuery, [carID], (error, results) => {

            db.pool.query(enableFKQuery, (error) => {
                res.json({ success: true});                     // message console that deletion was successful
            });
        });
    });
});


app.delete('/delete-location-ajax/', (req, res) => {

    const locationID = req.body.id;                                  // assigns the data from deleteLocation (being the id of the deleted location) into the request body

    // disable foreign key checks
    let disableFKQuery = `SET FOREIGN_KEY_CHECKS=0;`;
    
    // query to delete a location by its ID
    let deleteLocationQuery = `DELETE FROM Locations WHERE locationID = ?;`;

    // enable foreign key checks
    let enableFKQuery = `SET FOREIGN_KEY_CHECKS=1;`;

    // run the triple query
    db.pool.query(disableFKQuery, (error) => {

        db.pool.query(deleteLocationQuery, [locationID], (error, results) => {

            db.pool.query(enableFKQuery, (error) => {
                res.json({ success: true });                     // message console that deletion was successful
            });
        });
    });
});

app.delete('/delete-customer-ajax/', (req, res) => {

    const customerID = req.body.id;                                  // assigns the data from deleteCustomer (being the id of the deleted customer) into the request body

    // disable foreign key checks
    let disableFKQuery = `SET FOREIGN_KEY_CHECKS=0;`;
    
    // query to delete a customer by its ID
    let deleteCustomerQuery = `DELETE FROM Customers WHERE customerID = ?;`;

    // enable foreign key checks
    let enableFKQuery = `SET FOREIGN_KEY_CHECKS=1;`;

    // run the triple query
    db.pool.query(disableFKQuery, (error) => {

        db.pool.query(deleteCustomerQuery, [customerID], (error, results) => {

            db.pool.query(enableFKQuery, (error) => {
                res.json({ success: true});                     // message console that deletion was successful
            });
        });
    });
});

app.delete('/delete-transaction-ajax/', (req, res) => {

    const transactionID = req.body.id;                                  // assigns the data from deleteTransaction (being the id of the deleted transaction) into the request body

    // disable foreign key checks
    let disableFKQuery = `SET FOREIGN_KEY_CHECKS=0;`;
    
    // query to delete a transaction by its ID
    let deleteTransactionQuery = `DELETE FROM Transactions WHERE salesID = ?;`;

    // enable foreign key checks
    let enableFKQuery = `SET FOREIGN_KEY_CHECKS=1;`;

    // run the triple query
    db.pool.query(disableFKQuery, (error) => {

        db.pool.query(deleteTransactionQuery, [transactionID], (error, results) => {

            db.pool.query(enableFKQuery, (error) => {
                res.json({ success: true });                     // message console that deletion was successful
            });
        });
    });
});

app.delete('/delete-transactionCar-ajax/', (req, res) => {

    const transactionCarID = req.body.id;                                  // assigns the data from deleteTransactionCar (being the id of the deleted transactionCar) into the request body

    // disable foreign key checks
    let disableFKQuery = `SET FOREIGN_KEY_CHECKS=0;`;
    
    // query to delete a transactionCar by its ID
    let deleteTransactionCarQuery = `DELETE FROM TransactionCars WHERE transactionCarID = ?;`;

    // enable foreign key checks
    let enableFKQuery = `SET FOREIGN_KEY_CHECKS=1;`;

    // run the triple query
    db.pool.query(disableFKQuery, (error) => {

        db.pool.query(deleteTransactionCarQuery, [transactionCarID], (error, results) => {

            db.pool.query(enableFKQuery, (error) => {
                res.json({ success: true });                     // message console that deletion was successful
            });
        });
    });
});


/**************************************************************************
    PUT
**************************************************************************/

app.put('/cars/:id', function(req, res) {                   // uses /cars/:id to directly update the car instead of going through updateCar
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
        WHERE carID = ?`;

    //submit the update query
    db.pool.query(updateCarQuery, [Make, Model, ModelYear, CarValue, carID], function(error, results, fields) {
        console.log("Car updated successfully!");            // message console that update was successful
        res.sendStatus(200);
    });
});

app.put('/customers/:id', function(req, res) {                  // uses /customers/:id to directly update the customer instead of going through updateCustomer
    let customerID = req.params.id;                             // retrieves the id from the request url and makes it customerID
    let { Name, ContactNumber} = req.body;                      // assigns the data from the input into each variable

    // query to update a customer in Customers by customerID using ? as placeholder
    const updateCustomerQuery =                                      
       `UPDATE Customers 
        SET name = ?, contactNumber = ?
        WHERE customerID = ?`;

    //submit the update query
    db.pool.query(updateCustomerQuery, [Name, ContactNumber, customerID], function(error, results, fields) {
        console.log("Customer updated successfully!");           // message console that update was successful
        res.sendStatus(200);
    });
});

app.put('/locations/:id', function(req, res) {                  // uses /locations/:id to directly update the location instead of going through updateLocation
    let locationID = req.params.id;                             // retrieves the id from the request url and makes it LocationID
    let { Name } = req.body;                                    // assigns the data from the input into each variable

    // query to update a location in Locations by locationID using ? as placeholder
    const updateLocationQuery =                                      
       `UPDATE Locations 
        SET locationName = ?
        WHERE locationID = ?`;

    //submit the update query
    db.pool.query(updateLocationQuery, [Name, locationID], function(error, results, fields) {
        console.log("Location updated successfully!");          // message console that update was successful
        res.sendStatus(200);
    });
});

app.put('/transactions/:id', function(req, res) {                   // uses /transactions/:id to directly update the transaction instead of going through updateTransaction
    let salesID = req.params.id;                                    // retrieves the id from the request url and makes it salesID
    let { Date, Name, To, From } = req.body;                        // assigns the data from the input into each variable

    // query to update a transaction in transactions by salesID using ? as placeholder
    const updateTransactionQuery =                                      
       `UPDATE Transactions
        SET transactionDate = ?, customerID = ?, toLocation = ?, fromLocation = ?
        WHERE salesID = ?`;

    //submit the update query
    db.pool.query(updateTransactionQuery, [Date, Name, To, From, salesID], function(error, results, fields) {
        console.log("Transaction updated successfully!");           // message console that update was successful
        res.sendStatus(200);
    });
});

app.put('/transactionCars/:id', function(req, res) {                //  uses /transactionCars/:id to directly update the transactionCar instead of going through updateTransactionCar
    let transactionCarID = req.params.id;                           // retrieves the id from the request url and makes it transactionCarID
    let { Car, Price } = req.body;                                  // assigns the data from the input into each variable

    // query to update a transactionCar in transactionCars by transactionCarID using ? as placeholder
    const updateTransactionCarQuery =                                      
       `UPDATE TransactionCars
        SET carID = ?, salePrice = ?
        WHERE transactionCarID = ?`;

    //submit the update query
    db.pool.query(updateTransactionCarQuery, [Car, Price, transactionCarID], function(error, results, fields) {
        console.log("TransactionCar updated successfully!");        // message console that update was successful
        res.sendStatus(200);
    });
});


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});