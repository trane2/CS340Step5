/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Delete sales from sale_id
function deleteSale(sale_id) {
    let link = '/delete-sale-ajax';
    let data = {
        sale_id: sale_id
    };
  
    // Connect deletion success to deleteSaleRow
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          deleteSaleRow(sale_id);
      }
    });
}
  
// Iterates through sales table rows
// Removes sale row from table with matching sale_id
function deleteSaleRow(sale_id){
    let table = document.getElementById("sales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == saleID) {
            table.deleteRow(i);
            deleteSalesDropDownMenu(sale_id);
            break;
        }
    }
}

// Removes sale option from drop down menu
function deleteSalesDropDownMenu(sale_id) {
  let selectMenu = document.getElementById("sale-select");
  for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(sale_id)) {
          selectMenu[i].remove();
          break;
      } 
  }
}