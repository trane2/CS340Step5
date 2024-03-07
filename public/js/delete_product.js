/*
  Citation for the following code:
  Date: 2/28/24
  Adapted from the amazing work that has gone into the starter app resource
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/
function deleteProduct(productID) {
    let link = '/delete-product-ajax';
    let data = {
      product_id: productID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteProductRow(productID);
      }
    });
  }
  
function deleteProductRow(productID){
    let table = document.getElementById("products-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == productID) {
            table.deleteRow(i);
            deleteProductsDropDownMenu(productID);
            break;
        }
    }
}

function deleteProductsDropDownMenu(productID) {
  let selectMenu = document.getElementById("product-select");
  for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(productID)) {
          selectMenu[i].remove();
          break;
      } 
  }
}