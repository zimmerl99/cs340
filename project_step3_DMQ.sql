-- all varibles are denoted by a : (eg :locationNameInput)


-- get all cars make, model, modelYear, and carValue for the cars.html list
SELECT make, model, modelYear, carValue FROM Cars

-- get name and contactNumber from Customers for cutomers.html list
SELECT name, contactNumber FROM Customers

-- get locationName from Locations for locations.html list
SELECT locationName FROM Locations

-- get transactionDate, customerName, fromLocation name, toLocation name from Transactions, Cars, and Locations for transactions.html list
SELECT Transactions.transactionDate, Customers.name, LocationsFrom.locationName AS fromLocation, LocationsTo.locationName AS toLocation FROM Transactions
JOIN Customers ON Transactions.customerID = Customers.customerID
JOIN Locations AS LocationsFrom ON Transactions.fromLocation = LocationsFrom.locationID
JOIN Locations AS LocationsTo ON Transactions.toLocation = LocationsTo.locationID;

-- get salesID, make, model, modelYear, and salePrice from TransactionCars and Cars for the transactionDetails.html list
SELECT TransactionCars.salesID, Cars.make, Cars.model, Cars.modelYear, TransactionCars.salePrice FROM TransactionCars
JOIN Cars ON TransactionCars.carID = Cars.carID;

-- insert a car into cars table
INSERT INTO Cars (make, model, modelYear, carValue) VALUES (:makeInput, :modelInput, :modelYearInput, :carValueInput);

-- insert a customer into Customers table
INSERT INTO Customers (name, contactNumber) VALUES (:nameInput, :contactNumberInput);

-- insert a location into Locations table
INSERT INTO Locations (locationName) VALUES (:locationNameInput);

-- insert a transaction into Transactions table
INSERT INTO Transactions (transactionDate, customerID, toLocation, fromLocation) VALUES (:transactionDateInput, :customerIDInput, :toLocationInput, :fromLocationInput);

-- query for the dropdown of customerName so that customerID is still stored in the Transactions table
SELECT customerID, name FROM Customers;

-- insert a transaction Detail into TransactionsCars table
INSERT INTO TransactionsCars (salesID, carID, salePrice) VALUES (:salesIDInput, :carIDInput, :salePriceInput);

-- delete TransactionCar
DELETE FROM TransactionCars WHERE transactionCarID = :transactionCarIDInput;

-- update transactionCars by transactionCarID
UPDATE TransactionCars SET carID = :carIDInput, salePrice = :salePriceInput WHERE transactionCarID = :transactionCarIDInput;

-- delete queries for all sheets
DELETE FROM Cars WHERE carID = :carIDInput;
DELETE FROM Customers WHERE customerID  = :customerIDInput;
DELETE FROM Locations WHERE locationID = :locationIDInput;
DELETE FROM Transactions WHERE salesID = :salesIDInput;