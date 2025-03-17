function updateLocation(event) {
    event.preventDefault();                                 // Prevent form from submitting normally

    locationID = $('#input-location-ajax').val();           // jQuery gets the LocationID value from the input
    if (!locationID) {
        alert("Please select a Location to update.");       // if no input, send an alert to select Location from the dropdown
        return;
    }

    updatedLocation = {                                     // creates an object to store attribute data
        Name: $('#locationName').val(),                     // jQuery fills in the data from the inputs
    };

    if (!updatedLocation.Name) {                            // if any of those fields are left empty
        alert("Name is a required Field");                  // send an alert saying they are required
        return;
    }

    $.ajax({
        url: `/locations/${locationID}`,                        // ensures the route based off LocationID for app.js PUT route
        type: 'PUT',
        data: JSON.stringify(updatedLocation),   
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            window.location.href = '/locations';                // when successful, reroute backt to Locations.hbs
        },
    });
}

$(document).ready(function () {                         // ensures the function is only run after everything is loaded 
    $('#updateLocation').submit(updateLocation);        // binds the PUT form in updateLocation.hbs to the updateLocation() function
});                                                     // so that when it is submitted it runs the function
