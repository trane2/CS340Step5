/*
    Citation for the following code:
    Date: 2/28/24
    Adapted from the amazing work that has gone into the starter app resource
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/

// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputLocation = document.getElementById("input-location-ajax");
    let inputEmployee = document.getElementById("input-employee-ajax");
    let inputCustomer = document.getElementById("input-customer-ajax");
    let inputSaleDate = document.getElementById("input-sale_date");

    // Get the values from the form fields
    let locationID = inputLocation.value;
    let employeeID = inputEmployee.value;
    let customerID = inputCustomer.value;
    let saleDateValue = inputSaleDate.value;

    // Put our data we want to send in a javascript object
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

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputLocation.value = '';
            inputEmployee.value = '';
            inputCustomer.value = '';
            inputSaleDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    // let newRow = parsedData[parsedData.length - 1]

    // // Create a row and 7 cells
    // let row = document.createElement("TR");
    // let deleteCell = document.createElement("TD");
    // let idCell = document.createElement("TD");
    // let waresCell = document.createElement("TD");
    // let addressCell = document.createElement("TD");
    // let cityCell = document.createElement("TD");
    // let postalCell = document.createElement("TD");
    // let sitePhoneCell = document.createElement("TD");

    // // Fill the cells with correct data
    // let deleteButton = document.createElement("button");
    // deleteButton.innerHTML = "Delete";
    // deleteCell.onclick = function(){
    //     deleteLocation(newRow.location_id);
    // };
    // deleteCell.appendChild(deleteButton);

    // idCell.innerText = newRow.location_id;
    // waresCell.innerText = newRow.wares_capacity;
    // addressCell.innerText = newRow.address_line;
    // cityCell.innerText = newRow.city;
    // postalCell.innerText = newRow.postal_code;
    // sitePhoneCell.innerText = newRow.site_phone;

    // // Add the cells to the row
    // row.appendChild(deleteCell);
    // row.appendChild(idCell);
    // row.appendChild(waresCell);
    // row.appendChild(addressCell);
    // row.appendChild(cityCell);
    // row.appendChild(postalCell);
    // row.appendChild(sitePhoneCell);
    
    // // Add a row attribute so the deleteRow function can find a newly added row
    // row.setAttribute('data-value', newRow.location_id);

    // // Add the row to the table
    // currentTable.appendChild(row);

    // let selectMenu = document.getElementById("location-select");
    // let option = document.createElement("option");
    // option.text = newRow.address_line + ' ' +  newRow.city;
    // option.value = newRow.location_id;
    // selectMenu.add(option);
}