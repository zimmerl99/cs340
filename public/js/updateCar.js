function updateCar(event) {
    event.preventDefault();                           // Prevent form from submitting normally

    carID = $('#input-carMake-ajax').val();           // jQuery gets the carID value from the input
    if (!carID) {
        alert("Please select a car to update.");      // if no input, send an alert to select car from the dropdown
        return;
    }

    updatedCar = {                                    // creates an object to store attribute data
        Make: $('#carMake').val(),                    // jQuery fills in the data from the inputs
        Model: $('#carModel').val(),
        ModelYear: $('#carYear').val(),
        CarValue: $('#carValue').val()
    };

    if (!updatedCar.Make || !updatedCar.Model || !updatedCar.ModelYear) {   // if any of those fields are left empty
        alert("Make, Model, and Model Year are required fields.");          // send an alert saying they are required
        return;
    }

    if (!updatedCar.CarValue || updatedCar.CarValue == 0) {                 // if carValue is left empty or 0, send it as NULL
        updatedCar.CarValue = null;
    }

    $.ajax({
        url: `/cars/${carID}`,                                              // ensures the route based off carID for app.js PUT route
        type: 'PUT',
        data: JSON.stringify(updatedCar),   
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            window.location.href = '/cars';                                 // when successful, reroute backt to cars.hbs
        },
    });
}

$(document).ready(function () {                     // ensures the function is only run after everything is loaded 
    $('#updateCar').submit(updateCar);              // binds the PUT form in updateCar.hbs to the updateCar() function
});                                                 // so that when it is submitted it runs the function
