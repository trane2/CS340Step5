/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Submit function to upate employee
updateEmployeeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let selectedEmployee = document.getElementById("employee-select");
    let inputEmployeeNametag = document.getElementById("input-employee_nametag-update");
    let inputEmployeePhone = document.getElementById("input-employee_phone-update");

    // Get values from  form fields
    let employeeID = selectedEmployee.value;
    let employeeNametag = inputEmployeeNametag.value;
    let employeePhoneValue = inputEmployeePhone.value;

    // Data validation
    if (isNaN(employeeID)) {
        return;
    }

    // Put our data in a javascript object
    let data = {
        employee_id: employeeID,
        employee_nametag: employeeNametag,
        employee_phone: employeePhoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update row
            updateEmployeeRow(xhttp.response, employeeID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Update employee row if successful
function updateEmployeeRow(data, employee_id){
    // Get data and table
    let parsedData = JSON.parse(data);
    let data = parsedData[0];
    let table = document.getElementById("employees-table");
    
    // Iterate until row found
    // Update each td to data entries
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employee_id) {
                let updateRowIndex = table.getElementsByTagName("tr")[i];
                
                let tdNametag = updateRowIndex.getElementsByTagName("td")[2];
                tdNametag.innerHTML = data.employee_nametag
               
                let tdPhone = updateRowIndex.getElementsByTagName("td")[3];
                tdPhone.innerHTML = data.employee_phone; 
        }
    }
}