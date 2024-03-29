/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addPersonForm = document.getElementById('add-employee-form-ajax');

// Submit function to add employee
addPersonForm.addEventListener("submit", function (e) {
    e.preventDefault();

     // Get form fields
    let inputEmployeeNametag = document.getElementById("input-employee_nametag");
    let inputEmployeePhone = document.getElementById("input-employee_phone");

    // Get values from the form fields
    let employeeNametagValue = inputEmployeeNametag.value;
    let employeePhoneValue = inputEmployeePhone.value;

    // Put our data in a javascript object
    let data = {
        employee_nametag: employeeNametagValue,
        employee_phone: employeePhoneValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table and clear fields           
            addRowToTable(xhttp.response);
            inputEmployeeNametag.value = '';
            inputEmployeePhone.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Add employee entry if successful addition
function addRowToTable(data) {
    let currentTable = document.getElementById("employees-table");

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeNametagCell = document.createElement("TD");
    let employeePhoneCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteEmployee(newRow.employee_id);
    };
    deleteCell.appendChild(deleteButton);

    // Fill cells with data
    idCell.innerText = newRow.employee_id;
    employeeNametagCell.innerText = newRow.employee_nametag;
    employeePhoneCell.innerText = newRow.employee_phone;

    // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(employeeNametagCell);
    row.appendChild(employeePhoneCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.employee_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Add option to dropdown menu
    let selectMenu = document.getElementById("employee-select");
    let option = document.createElement("option");
    option.text = newRow.employee_nametag;
    option.value = newRow.employee_id;
    selectMenu.add(option);
}