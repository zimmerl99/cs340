/*# Citation for the following function: deleteCar, deleteRow
2 # Date: 3/5/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their delete_person.js file and adpated it to fit the deleteLocation() feature
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

  function deleteLocation() {
    let locationID = document.getElementById("input-location-ajax").value;

    let link = '/delete-location-ajax/';                 // link to deleteLocation ajax function
    let data = {                                    // puts the extracted locationID into a variable named within the function
      id: locationID 
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          window.location.href = "/locations";         // when successful reroutes back to locations.hbs
        }
    });
}