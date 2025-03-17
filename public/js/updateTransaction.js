function updateTransaction(event) {
    event.preventDefault();                                 // Prevent form from submitting normally

    salesID = $('#input-transaction-ajax').val();           // jQuery gets the salesID value from the input
    if (!salesID) {
        alert("Please select a Transaction to update.");    // if no input, send an alert to select Transaction from the dropdown
        return;
    }

    updatedTransaction = {                                  // creates an object to store attribute data
        Date: $('#input-Date').val(),                       // jQuery fills in the data from the inputs
        Name: $('#input-Customer-ajax').val(),
        To: $('#input-To-ajax').val(),
        From: $('#input-From-ajax').val()
    };

    if (!updatedTransaction.Date || !updatedTransaction.Name || !updatedTransaction.To || !updatedTransaction.From) {   // if any of those fields are left empty
        alert("Date, Name, To, and From are required fields.");          // send an alert saying they are required
        return;
    }

    $.ajax({
        url: `/transactions/${salesID}`,                                 // ensures the route based off salesID for app.js PUT route
        type: 'PUT',
        data: JSON.stringify(updatedTransaction),   
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            window.location.href = '/transactions';                      // when successful, reroute backt to Transactions.hbs
        },
    });
}

$(document).ready(function () {                                     // ensures the function is only run after everything is loaded 
    $('#updateTransaction').submit(updateTransaction);              // binds the PUT form in updateCar.hbs to the updateTransaction() function
});                                                                 // so that when it is submitted it runs the function
