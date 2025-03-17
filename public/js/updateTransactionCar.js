function updateTransactionCar(event) {
    event.preventDefault();                                         // Prevent form from submitting normally

    transactionCarID = $('#input-transactionCar-ajax').val();       // jQuery gets the transactionCarID value from the input
    if (!transactionCarID) {
        alert("Please select a Transaction Details to update.");    // if no input, send an alert to select TransactionCar from the dropdown
        return;
    }

    updatedTransactionCar = {                                       // creates an object to store attribute data
        Car: $('#input-car-ajax').val(),                            // jQuery fills in the data from the inputs
        Price: $('#input-salePrice').val(),
    };

    if (!updatedTransactionCar.Car || !updatedTransactionCar.Price) {   // if any of those fields are left empty
        alert("Car, Sale Price are required fields.");                  // send an alert saying they are required
        return;
    }

    $.ajax({
        url: `/transactionCars/${transactionCarID}`,                // ensures the route based off transactionsCarID for app.js PUT route
        type: 'PUT',
        data: JSON.stringify(updatedTransactionCar),   
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            window.location.href = '/transactionCars';              // when successful, reroute backt to TransactionCars.hbs
        },
    });
}

$(document).ready(function () {                                     // ensures the function is only run after everything is loaded 
    $('#updateTransactionCar').submit(updateTransactionCar);        // binds the PUT form in updateCar.hbs to the updateTransactionCar() function
});                                                                 // so that when it is submitted it runs the function
