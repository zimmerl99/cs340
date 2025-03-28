/*# Citation for the following function: deleteCustomer
2 # Date: 2/25/2025
3 # Adapted from nodejs-starter-app by CS 340 Instructional Staff
4 # Used their delete_person.js file and adpated it to fit the deleteCustomer feature
5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

function deleteCustomer() {
  let customerID = document.getElementById("input-customer-ajax").value;
  console.log(customerID);  // Debugging

  let link = '/delete-customer-ajax/';                 // link to deleteCustomer ajax function
  let data = {                                         // puts the extracted customerID into a variable named within the function
    id: customerID 
  };

  $.ajax({                                             // ajax specifications for what to do with the data
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        window.location.href = "/customers";           // when successful reroutes back to customers.hbs
      }
  });
}
