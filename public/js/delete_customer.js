/*
  Citation for the following code:
  Date: 2/28/24
  Adapted from the amazing work that has gone into the starter app resource
  Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/
function deleteCustomer(customerID) {
    let link = '/delete-customer-ajax';
    let data = {
        customer_id: customerID
    };
  
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteCustomerRow(customerID);
        }
    });
}

function deleteCustomerRow(customerID){
    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            deleteCustomersDropDownMenu(customerID);
            break;
        }
    }
}

function deleteCustomersDropDownMenu(customerID) {
    let selectMenu = document.getElementById("customer-select");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(customerID)) {
            selectMenu[i].remove();
            break;
        } 
    }
  }