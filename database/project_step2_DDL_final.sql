-- RARE CAR IMPORTS DATABASE DUMP
-- Created and designed by Leo Zimmer and Yupheng Xiong
-- CS 430 Intro to Databases

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Database: `cs340_zimmerl`

-- --------------------------------------------------------
-- Table: `Cars`
CREATE OR REPLACE TABLE `Cars` (
  `carID` int(11) NOT NULL AUTO_INCREMENT,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `modelYear` varchar(4) NOT NULL,
  `carValue` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`carID`),
  UNIQUE KEY `carID_UNIQUE` (`carID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------
-- Table: `Customers`
CREATE OR REPLACE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contactNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------
-- Table: `Locations`
CREATE OR REPLACE TABLE `Locations` (
  `locationID` int(11) NOT NULL AUTO_INCREMENT,
  `locationName` varchar(255) NOT NULL,
  PRIMARY KEY (`locationID`),
  UNIQUE KEY `locationID_UNIQUE` (`locationID`),
  UNIQUE KEY `locationName_UNIQUE` (`locationName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------
-- Table: `Transactions`
CREATE OR REPLACE TABLE `Transactions` (
  `salesID` int(11) NOT NULL AUTO_INCREMENT,
  `transactionDate` date NOT NULL,
  `customerID` int(11) NOT NULL,
  `fromLocation` int(11) NOT NULL,
  `toLocation` int(11) NOT NULL,
  PRIMARY KEY (`salesID`),
  UNIQUE KEY `salesID_UNIQUE` (`salesID`),
  KEY `fk_Transactions_Customers_idx` (`customerID`),
  KEY `fk_Transactions_Locations1_idx` (`fromLocation`),
  KEY `fk_Transactions_Locations2_idx` (`toLocation`),
  CONSTRAINT `fk_Transactions_Customers` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Transactions_Locations1` FOREIGN KEY (`fromLocation`) REFERENCES `Locations` (`locationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Transactions_Locations2` FOREIGN KEY (`toLocation`) REFERENCES `Locations` (`locationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------
-- Table: `TransactionCars`
CREATE OR REPLACE TABLE `TransactionCars` (
  `transactionCarID` int(11) NOT NULL AUTO_INCREMENT,
  `salesID` int(11) NOT NULL,
  `carID` int(11) NOT NULL,
  `salePrice` decimal(10,2) NOT NULL,
  PRIMARY KEY (`transactionCarID`),
  KEY `fk_TransactionCars_Transactions1_idx` (`salesID`),
  KEY `fk_TransactionCars_Cars1` (`carID`),
  CONSTRAINT `fk_TransactionCars_Cars1` FOREIGN KEY (`carID`) REFERENCES `Cars` (`carID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_TransactionCars_Transactions1` FOREIGN KEY (`salesID`) REFERENCES `Transactions` (`salesID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Insert Statements
INSERT INTO Cars (make, model, modelYear, carValue) VALUES 
("Ford", "Focus", "2010", 5000),
("Ferrari", "360 Modena", "1999", 500000),
("Nissan", "Skyline", "2024", 40000);

INSERT INTO Customers (name, contactNumber) VALUES 
("Didi Gregorious", "9079959590"),
("Aaron Judge", "8395746378"),
("Jazz Chisholm", "9394958690");

INSERT INTO Locations (locationName) VALUES 
("Japan"),
("Saudi Arabia"),
("Norway");

INSERT INTO Transactions (transactionDate, customerID, fromLocation, toLocation) VALUES 
("2025-02-04", 2, 1, 3),
("2019-12-25", 3, 2, 1),
("2023-11-20", 1, 3, 2);

INSERT INTO TransactionCars (salesID, carID, salePrice) VALUES 
(1, 1, 10000),
(2, 3, 10000),
(3, 2, 1000000);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

