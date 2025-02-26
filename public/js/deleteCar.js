/*# Citation for the following function: deleteCar, deleteRow
2 # Date: 2/25/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their delete_person.js file and adpated it to fit the deleteCar feature
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

function deleteCar(carID) {
    console.log("Delete button clicked for carID:", carID);

    let link = '/delete-car-ajax/';
    let data = {
      id: carID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(carID);
      }
    });
  }

  function deleteCar() {
    let carID = document.getElementById("input-carMake-ajax").value;

    let link = '/delete-car-ajax/';
    let data = { 
      id: carID 
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            window.location.href = "/cars";
        }
    });
}
  
  function deleteRow(carID){
      let table = document.getElementById("cars-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == carID) {
              table.deleteRow(i);
              break;
         }
      }
  }