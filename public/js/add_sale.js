/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addSaleForm = document.getElementById('add-sale-form-ajax');

// Submit function to add sale
addSaleForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let inputLocation = document.getElementById("input-location-ajax");
    let inputEmployee = document.getElementById("input-employee-ajax");
    let inputCustomer = document.getElementById("input-customer-ajax");
    let inputSaleDate = document.getElementById("input-sale_date");

    // Get the values from form fields
    let locationID = inputLocation.value;
    let employeeID = inputEmployee.value;
    let customerID = inputCustomer.value;
    let saleDateValue = inputSaleDate.value;

    // Put our data in a javascript object
    let data = {
        lid: locationID,
        eid: employeeID,
        cid: customerID,
        sale_date: saleDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table and clear fields
            addRowToTable(xhttp.response);
            inputLocation.value = '';
            inputEmployee.value = '';
            inputCustomer.value = '';
            inputSaleDate.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})



// Add sale entry if successful addition
addRowToTable = (data) => {
    let currentTable = document.getElementById("sales-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let idCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let employeeCell = document.createElement("TD");
    let customerCell = document.createElement("TD");
    let dateCell = document.createElement("TD");

    // Fill the cells with correct data
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSale(newRow.sale_id);
    };
    deleteCell.appendChild(deleteButton);

    idCell.innerText = newRow.sale_id;
    locationCell.innerText = newRow.address_line;
    employeeCell.innerText = newRow.employee_nametag;
    customerCell.innerText = newRow.email;
    dateCell.innerText = newRow.sale_date;

    // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(locationCell);
    row.appendChild(employeeCell);
    row.appendChild(customerCell);
    row.appendChild(dateCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.sale_id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("sale-select");
    let option = document.createElement("option");
    option.text = newRow.sale_id;
    option.value = newRow.sale_id;
    selectMenu.add(option);
}