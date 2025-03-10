/*# Citation for the following function: deleteTransactionCar
2 # Date: 2/25/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their delete_person.js file and adpated it to fit the deleteTransactionCar feature
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

function deleteTransactionCar() {
  let transactionCarID = document.getElementById("input-transactionCar-ajax").value;
  console.log(transactionCarID);                             // Debugging

  let link = '/delete-transactionCar-ajax/';                 // link to deleteTransactionCar ajax function
  let data = {                                            // puts the extracted transactionCarID into a variable named within the function
    id: transactionCarID 
  };

  console.log("Sending data:", JSON.stringify(data));  // Debugging

  $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        window.location.href = "/transactionCars";         // when successful reroutes back to transactionCars.hbs
      }
  });
}
