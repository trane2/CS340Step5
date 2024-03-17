/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Delete customer from customer_id
function deleteCustomer(customer_id) {
    let link = '/delete-customer-ajax';
    let data = {
        customer_id: customer_id
    };
  
    // Connect deletion success to deleteCustomerRow
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteCustomerRow(customer_id);
        }
    });
}

// Iterates through customer table rows
// Removes customer row from table with matching customer_id
function deleteCustomerRow(customer_id){
    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            deleteCustomersDropDownMenu(customer_id);
            break;
        }
    }
}

// Removes customer option from drop down menu
function deleteCustomersDropDownMenu(customer_id) {
    let selectMenu = document.getElementById("customer-select");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(customer_id)) {
            selectMenu[i].remove();
            break;
        } 
    }
}