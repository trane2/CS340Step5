/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Delete location from location_id
function deleteLocation(location_id) {
    let link = '/delete-location-ajax';
    let data = {
      location_id: location_id
    };
  
    // Connect deletion success to deleteLocationRow
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          deleteLocationRow(location_id);
        }
    });
}
  
// Iterates through location table rows
// Removes location row from table with matching customer_id
function deleteLocationRow(location_id){
    let table = document.getElementById("locations-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == locationID) {
            table.deleteRow(i);
            deleteEmployeesDropDownMenu(location_id);
            break;
        }
    }
}

// Removes location option from drop down menu
function deleteLocationsDropDownMenu(location_id) {
  let selectMenu = document.getElementById("location-select");
  for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(location_id)) {
          selectMenu[i].remove();
          break;
      } 
  }
}