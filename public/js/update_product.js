/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updateProductForm = document.getElementById('update-product-form-ajax');

// Submit function to upate product
updateProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let selectedProduct = document.getElementById("product-select");
    let inputPrice = document.getElementById("input-price-update");
    let inputLabel = document.getElementById("input-label-update");
    let inputDesigner = document.getElementById("input-designer-update");

    // Get values from form fields
    let productID = selectedProduct.value;
    let priceValue = inputPrice.value;
    let labelValue = inputLabel.value;
    let designerValue = inputDesigner.value;

    // Data validation
    if (isNaN(productID)) {
        return;
    }

    // Put our data in a javascript object
    let data = {
        product_id: productID,
        price: priceValue,
        label: labelValue,
        designer: designerValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update row
            updateProductRow(xhttp.response, productID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})



// Update product row if successful
function updateProductRow(data, product_id){
    // Get data and table
    let parsedData = JSON.parse(data);
    let data = parsedData[0];
    let table = document.getElementById("products-table");
    
    // Iterate until row found
    // Update each td to data entries
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == product_id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdPrice = updateRowIndex.getElementsByTagName("td")[2];
            tdPrice.innerHTML = data.price; 

            let tdLabel = updateRowIndex.getElementsByTagName("td")[3];
            tdLabel.innerHTML = data.label; 

            let tdDesigner = updateRowIndex.getElementsByTagName("td")[4];
            tdDesigner.innerHTML = data.designer; 
        }
    }
}