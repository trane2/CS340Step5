/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Delete employee from employee_id
function deleteEmployee(employee_id) {
    let link = '/delete-employee-ajax';
    let data = {
        employee_id: employee_id
    };
  
    // Connect deletion success to deleteEmployeeRow
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteEmployeeRow(employee_id);
        }
    });
}

// Iterates through employee table rows
// Removes employee row from table with matching employeeID
function deleteEmployeeRow(employee_id){
    let table = document.getElementById("employees-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employee_id) {
            table.deleteRow(i);
            deleteEmployeesDropDownMenu(employee_id);
            break;
        }
    }
}

// Removes employee option from drop down menu
function deleteEmployeesDropDownMenu(employee_id) {
    let selectMenu = document.getElementById("employee-select");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(employee_id)) {
            selectMenu[i].remove();
            break;
        } 
    }
}