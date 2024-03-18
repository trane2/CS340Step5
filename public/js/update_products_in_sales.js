/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updateProductsInSalesForm = document.getElementById('update-location_inventory-form-ajax');

// Submit function to location customer
updateProductsInSalesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let inputSaleID = document.getElementById("update-sale");
    let inputProduct = document.getElementById("update-product");
    let inputQuantity = document.getElementById("update-quantity");
 
    // Get values from the form fields
    let saleIDvalue = inputSaleID.value;
    let productIDvalue = inputProduct.value;
    let quantityValue = inputQuantity.value;
 
    // Data validation
    if (isNaN(saleIDvalue)) {
        return;
    }
    if (isNaN(productIDvalue)) {
        return;
    }
    if (isNaN(quantityValue)) {
        return;
    }

    // Put our data in a javascript object
    let data = {
        sale_id: saleIDvalue,
        product_id: productIDvalue,
        quantity: quantityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-products_in_sales-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update row
            updateProductsInSalesRow(xhttp.response, data);
        
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request
    xhttp.send(JSON.stringify(data));
})



// Update location row if successful
function updateProductsInSalesRow(rows, updatedData){
    // Get data and table
    let parsedData = JSON.parse(rows);
    let data = parsedData[0]
    let table = document.getElementById("products_in_sales-table");

    // Iterate until row found
    // Update each td to data entries
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == data.spid) {
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                let saleID = updateRowIndex.getElementsByTagName("td")[1];
                saleID.innerHTML = data.sale_id; 
                
                let label = updateRowIndex.getElementsByTagName("td")[2];
                label.innerHTML = data.label;

                let quantity = updateRowIndex.getElementsByTagName("td")[3];
                quantity.innerHTML = data.quantity;
        }
    }
}