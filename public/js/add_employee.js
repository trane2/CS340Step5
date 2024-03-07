let addPersonForm = document.getElementById('add-employee-form-ajax');

addPersonForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputEmployeeNametag = document.getElementById("input-employee_nametag");
    let inputEmployeePhone = document.getElementById("input-employee_phone");

    let employeeNametagValue = inputEmployeeNametag.value;
    let employeePhoneValue = inputEmployeePhone.value;

    let data = {
        employee_nametag: employeeNametagValue,
        employee_phone: employeePhoneValue,
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);
            inputEmployeeNametag.value = '';
            inputEmployeePhone.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function addRowToTable(data) {
    let currentTable = document.getElementById("employees-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeNametagCell = document.createElement("TD");
    let employeePhoneCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    idCell.innerText = newRow.employee_id;
    employeeNametagCell.innerText = newRow.employee_nametag;
    employeePhoneCell.innerText = newRow.employee_phone;

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteLocation(newRow.employee_id);
    };
    deleteCell.appendChild(deleteButton);

    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(employeeNametagCell);
    row.appendChild(employeePhoneCell);

    row.setAttribute('data-value', newRow.employee_id);
    
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("employee-select");
    let option = document.createElement("option");
    option.text = newRow.employee_nametag;
    option.value = newRow.employee_id;
    selectMenu.add(option);
}