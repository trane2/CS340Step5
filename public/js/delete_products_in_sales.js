/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Delete customer from customer_id
function deleteProductsInSales(spid) {
    let link = '/delete-products_in_sales-ajax';
    let data = {
        spid: spid
    };
  
    // Connect deletion success to deleteCustomerRow
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteProductsInSalesRow(spid);
        }
    });
}

// Iterates through customer table rows
// Removes customer row from table with matching customer_id
function deleteProductsInSalesRow(plid){
    let table = document.getElementById("products_in_sales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == plid) {
            table.deleteRow(i);
            break;
        }
    }
}