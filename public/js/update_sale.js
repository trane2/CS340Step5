/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updateSaleForm = document.getElementById('update-sale-form-ajax');

// Submit function to upate sale
updateSaleForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let selectedSale = document.getElementById("sale-select");
    let inputLocation = document.getElementById("input-location-update");
    let inputEmployee = document.getElementById("input-employee-update");
    let inputCustomer = document.getElementById("input-customer-update");
    let inputSaleDate = document.getElementById("input-sale_date-update");

    // Get values from form fields
    let saleID = selectedSale.value
    let locationID = inputLocation.value;
    let employeeID = inputEmployee.value;
    let customerID = inputCustomer.value;
    let saleDateValue = inputSaleDate.value;

    // Data validation
    if (isNaN(saleID)) {
        return;
    }

    // Put our data in a javascript object
    let data = {
        sale_id: saleID,
        lid: locationID,
        eid: employeeID,
        cid: customerID,
        sale_date: saleDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update row
            updateSaleRow(xhttp.response, saleID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Update customer row if successful
function updateSaleRow(rows, sale_id){
    // Get data and table
    let parsedData = JSON.parse(rows);
    let data = parsedData[0];
    let table = document.getElementById("sales-table");
    
    // Iterate until row found
    // Update each td to data entries
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == sale_id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdPrice = updateRowIndex.getElementsByTagName("td")[2];
            tdPrice.innerHTML = data.Location; 

            let tdLabel = updateRowIndex.getElementsByTagName("td")[3];
            tdLabel.innerHTML = data.Employee; 

            let tdDesigner = updateRowIndex.getElementsByTagName("td")[4];
            tdDesigner.innerHTML = data.Customer; 

            let tdDesigner2 = updateRowIndex.getElementsByTagName("td")[5];
            tdDesigner2.innerHTML = data.sale_date; 
        }
    }
}