/*
  Citation for the following code:
  Date: 2/28/24
  Adapted from the amazing work that has gone into the starter app resource
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/
function deleteLocation(locationID) {
    let link = '/delete-location-ajax';
    let data = {
      location_id: locationID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteLocationRow(locationID);
      }
    });
  }
  
function deleteLocationRow(locationID){
    let table = document.getElementById("locations-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == locationID) {
            table.deleteRow(i);
            deleteEmployeesDropDownMenu(locationID);
            break;
        }
    }
}

function deleteLocationsDropDownMenu(locationID) {
  let selectMenu = document.getElementById("location-select");
  for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(locationID)) {
          selectMenu[i].remove();
          break;
      } 
  }
}