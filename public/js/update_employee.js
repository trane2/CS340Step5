let updatePersonForm = document.getElementById('update-employee-form-ajax');

updatePersonForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let selectedEmployee = document.getElementById("employee-select");
    let inputEmployeePhone = document.getElementById("input-employee_phone-update");

    let employeeID = selectedEmployee.value;
    let employeePhoneValue = inputEmployeePhone.value;

    if (isNaN(employeePhoneValue)) {
        return;
    }

    let data = {
        employee_id: employeeID,
        employee_phone: employeePhoneValue,
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, employeeID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, employee_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("employees-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employee_id) {
                let updateRowIndex = table.getElementsByTagName("tr")[i];
                let td = updateRowIndex.getElementsByTagName("td")[2];
                td.innerHTML = parsedData[0].employee_phone; 
        }
    }
}