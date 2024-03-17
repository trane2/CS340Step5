/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addProductsInSalesForm = document.getElementById('add-products-in-sales-form-ajax');

// Submit function to add employee
addProductsInSalesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let inputSaleID = document.getElementById("input-sale");
    let inputProduct = document.getElementById("input-product");
    let inputQuantity = document.getElementById("input-quantity");

    // Get values from the form fields
    let saleIDvalue = inputSaleID.value;
    let productIDvalue = inputProduct.value;
    let quantityValue = inputQuantity.value;

    // Put our data in a javascript object
    let data = {
        sale_id: saleIDvalue,
        product_id: productIDvalue,
        quantity: quantityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-products_in_sales-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table and clear fields           
            addRowToTable(xhttp.response);
            inputSaleID.value = '';
            inputProduct.value = '';
            inputQuantity.value = '';

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
    let saleID = document.createElement("TD");
    let product = document.createElement("TD");
    let quantity = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteProductsInSales(newRow.spid);
    };
    deleteCell.appendChild(deleteButton);

    // Fill cells with data
    saleID.innerText = newRow.sid;
    product.innerText = newRow.pid;
    quantity.innerText = newRow.quantity;

    // // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(saleID);
    row.appendChild(product);
    row.appendChild(quantity);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.spid);
    
    // // Add the row to the table
    currentTable.appendChild(row);
}