/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addProductForm = document.getElementById('add-product-form-ajax');

// Submit function to add product
addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let inputPrice = document.getElementById("input-price");
    let inputLabel = document.getElementById("input-label");
    let inputDesigner = document.getElementById("input-designer");

    // Get values from the form fields
    let priceValue = inputPrice.value;
    let labelValue = inputLabel.value;
    let designerValue = inputDesigner.value;

    // Put our data in a javascript object
    let data = {
        price: priceValue,
        label: labelValue,
        designer: designerValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table and clear fields
            addRowToTable(xhttp.response);
            inputPrice.value = '';
            inputLabel.value = '';
            inputDesigner.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Add product entry if successful addition
function addRowToTable(data) {
    let currentTable = document.getElementById("products-table");

    // Get a reference to the new row from the database query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let labelCell = document.createElement("TD");
    let designerCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteProduct(newRow.product_id);
    };
    deleteCell.appendChild(deleteButton);

    // Fill cells with data
    idCell.innerText = newRow.product_id;
    priceCell.innerText = newRow.price;
    labelCell.innerText = newRow.label;
    designerCell.innerText = newRow.designer;
    
    // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(priceCell);
    row.appendChild(labelCell);
    row.appendChild(designerCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.product_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Add option to dropdown menu
    let selectMenu = document.getElementById("product-select");
    let option = document.createElement("option");
    option.text = newRow.label;
    option.value = newRow.product_id;
    selectMenu.add(option);
}