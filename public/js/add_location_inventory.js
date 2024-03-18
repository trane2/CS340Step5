/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addLocationInventoryForm = document.getElementById('add-location_inventory-form-ajax');

// Submit function to add employee
addLocationInventoryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let inputLocationID = document.getElementById("input-location");
    let inputProductID = document.getElementById("input-product");

    // Get values from the form fields
    let locationIDvalue = inputLocationID.value;
    let productIDvalue = inputProductID.value;

    // Put our data in a javascript object
    let data = {
        location_id: locationIDvalue,
        product_id: productIDvalue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-location-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table and clear fields           
            addRowToTable(xhttp.response);
            inputLocationID.value = '';
            inputProductID.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Add entry if successful addition
function addRowToTable(data) {
    let currentTable = document.getElementById("location_inventory-table");

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create cells
    let row = document.createElement("TR");
    let location = document.createElement("TD");
    let product = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteLocationInventory(newRow.plid);
    };
    deleteCell.appendChild(deleteButton);

    // Fill cells with data
    location.innerText = newRow.address_line;
    product.innerText = newRow.label;

    // // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(location);
    row.appendChild(product);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.plid);
    
    // // Add the row to the table
    currentTable.appendChild(row);
}