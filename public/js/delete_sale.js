/*
  Citation for the following code:
  Date: 2/28/24
  Adapted from the amazing work that has gone into the starter app resource
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/
function deleteSale(saleID) {
    let link = '/delete-sale-ajax';
    let data = {
        sale_id: saleID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteSaleRow(saleID);
      }
    });
  }
  
function deleteSaleRow(saleID){
    let table = document.getElementById("sales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == saleID) {
            table.deleteRow(i);
            deleteSalesDropDownMenu(saleID);
            break;
        }
    }
}

function deleteSalesDropDownMenu(saleID) {
  let selectMenu = document.getElementById("sale-select");
  for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(saleID)) {
          selectMenu[i].remove();
          break;
      } 
  }
}