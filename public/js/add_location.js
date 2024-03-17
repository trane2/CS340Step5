/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addLocationForm = document.getElementById('add-location-form-ajax');

// Submit function to add location
addLocationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let inputWares = document.getElementById("input-wares");
    let inputAddress = document.getElementById("input-address");
    let inputCity = document.getElementById("input-city");
    let inputPostal = document.getElementById("input-postal");
    let inputSitePhone = document.getElementById("input-site-phone");

    // Get the values from  form fields
    let waresValue = inputWares.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let postalValue = inputPostal.value;
    let sitePhoneValue = inputSitePhone.value;

    // Put our data in a javascript object
    let data = {
        wares: waresValue,
        address: addressValue,
        city: cityValue,
        postal: postalValue,
        sitePhone: sitePhoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table and clear fields
            addRowToTable(xhttp.response);
            inputWares.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputPostal.value = '';
            inputSitePhone.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Add location entry if successful addition
addRowToTable = (data) => {
    let currentTable = document.getElementById("locations-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create cells
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let idCell = document.createElement("TD");
    let waresCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let postalCell = document.createElement("TD");
    let sitePhoneCell = document.createElement("TD");

    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteLocation(newRow.location_id);
    };
    deleteCell.appendChild(deleteButton);

    // Fill cells with data
    idCell.innerText = newRow.location_id;
    waresCell.innerText = newRow.wares_capacity;
    addressCell.innerText = newRow.address_line;
    cityCell.innerText = newRow.city;
    postalCell.innerText = newRow.postal_code;
    sitePhoneCell.innerText = newRow.site_phone;

    // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(waresCell);
    row.appendChild(addressCell);
    row.appendChild(cityCell);
    row.appendChild(postalCell);
    row.appendChild(sitePhoneCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.location_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Add option to dropdown menu
    let selectMenu = document.getElementById("location-select");
    let option = document.createElement("option");
    option.text = newRow.address_line + ' ' +  newRow.city;
    option.value = newRow.location_id;
    selectMenu.add(option);
}