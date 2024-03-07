function deleteEmployee(employee_id) {
    let link = '/delete-employee-ajax';
    let data = {
        employee_id: employee_id
    };
  
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

function deleteEmployeesDropDownMenu(employee_id) {
    let selectMenu = document.getElementById("employee-select");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(employee_id)) {
            selectMenu[i].remove();
            break;
        } 
    }
}