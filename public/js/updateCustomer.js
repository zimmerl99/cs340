function updateCustomer(event) {
    event.preventDefault();                           // Prevent form from submitting normally

    customerID = $('#input-customer-ajax').val();           // jQuery gets the customerID value from the input
    if (!customerID) {
        alert("Please select a customer to update.");      // if no input, send an alert to select customer from the dropdown
        return;
    }

    updatedCustomer = {                                    // creates an object to store attribute data
        Name: $('#customerName').val(),                    // jQuery fills in the data from the inputs
        ContactNumber: $('#customerContactNumber').val()
    };

    if (!updatedCustomer.Name || !updatedCustomer.ContactNumber) {   // if any of those fields are left empty
        alert("Name, Contact Number are required fields.");          // send an alert saying they are required
        return;
    }

    $.ajax({
        url: `/customers/${customerID}`,                                          // ensures the route based off customerID for app.js PUT route
        type: 'PUT',
        data: JSON.stringify(updatedCustomer),   
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            window.location.href = '/customers';                             // when successful, reroute backt to customers.hbs
        },
    });
}

$(document).ready(function () {                     // ensures the function is only run after everything is loaded 
    $('#updateCustomer').submit(updateCustomer);              // binds the PUT form in updateCustomer.hbs to the updateCustomer() function
});                                                 // so that when it is submitted it runs the function
