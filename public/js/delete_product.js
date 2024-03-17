/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Delete product from product_id
function deleteProduct(product_id) {
    let link = '/delete-product-ajax';
    let data = {
      product_id: product_id
    };
  
    // Connect deletion success to deleteProductRow
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          deleteProductRow(product_id);
        }
    });
}
  
// Iterates through product table rows
// Removes product row from table with matching product_id
function deleteProductRow(product_id){
    let table = document.getElementById("products-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == product_id) {
            table.deleteRow(i);
            deleteProductsDropDownMenu(product_id);
            break;
        }
    }
}

// Removes customer option from drop down menu
function deleteProductsDropDownMenu(product_id) {
  let selectMenu = document.getElementById("product-select");
  for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(product_id)) {
          selectMenu[i].remove();
          break;
      } 
  }
}