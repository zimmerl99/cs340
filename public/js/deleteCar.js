/*# Citation for the following function: deleteCar
2 # Date: 2/25/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their delete_person.js file and adpated it to fit the deleteCar feature
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

function deleteCar() {
  let carID = document.getElementById("input-carMake-ajax").value;
  console.log(carID);                             // Debugging

  let link = '/delete-car-ajax/';                 // link to deleteCar ajax function
  let data = {                                    // puts the extracted carID into a variable named within the function
    id: carID 
  };

  $.ajax({                                        // ajax specifications for what to do with the data
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        window.location.href = "/cars";           // when successful reroutes back to cars.hbs
      }
  });
}
