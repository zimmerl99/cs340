/*# Citation for the following function: deleteCar
2 # Date: 2/25/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their delete_person.js file and adpated it to fit the deleteTransaction feature
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

function deleteTransaction() {
  let transactionID = document.getElementById("input-transaction-ajax").value;
  console.log(transactionID);                             // Debugging

  let link = '/delete-transaction-ajax/';                 // link to deleteTransaction ajax function
  let data = {                                            // puts the extracted transactionID into a variable named within the function
    id: transactionID 
  };

  console.log("Sending data:", JSON.stringify(data));  // Debugging

  $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        window.location.href = "/transactions";         // when successful reroutes back to transactions.hbs
      }
  });
}
