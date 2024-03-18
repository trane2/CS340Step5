/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updatePersonForm = document.getElementById('update-location-form-ajax');

// Submit function to location customer
updatePersonForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let selectedLocation = document.getElementById("location-select");
    let inputWares = document.getElementById("update-wares");
    let inputAddress = document.getElementById("update-address");
    let inputCity = document.getElementById("update-city");
    let inputPostal = document.getElementById("update-postal");
    let inputSitePhone = document.getElementById("update-site-phone");

    // Get values from form fields
    let locationID = selectedLocation.value;
    let waresValue = inputWares.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let postalValue = inputPostal.value;
    let sitePhoneValue = inputSitePhone.value;
    
    // Data validation
    if (isNaN(locationID)) {
        return;
    }

    // Put our data in a javascript object
    let data = {
        location_id: locationID,
        wares_capacity: waresValue,
        address_line: addressValue,
        city: cityValue,
        postal_code: postalValue,
        site_phone: sitePhoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update row
            updateLocationRow(xhttp.response, locationID);
        
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send request
    xhttp.send(JSON.stringify(data));
})



// Update location row if successful
function updateLocationRow(rows, locationID){
    // Get data and table
    let parsedData = JSON.parse(rows);
    let data = parsedData[0]
    let table = document.getElementById("locations-table");

    // Iterate until row found
    // Update each td to data entries
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == locationID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdWares = updateRowIndex.getElementsByTagName("td")[2];
            tdWares.innerHTML = data.wares_capacity; 
            
            let tdAddress = updateRowIndex.getElementsByTagName("td")[3];
            tdAddress.innerHTML = data.address_line;

            let tdCity = updateRowIndex.getElementsByTagName("td")[4];
            tdCity.innerHTML = data.city;

            let tdPostal = updateRowIndex.getElementsByTagName("td")[5]
            tdPostal.innerHTML = data.postal_code; 

            let tdSitePhone = updateRowIndex.getElementsByTagName("td")[6];
            tdSitePhone.innerHTML = data.site_phone; 
       }
    }
}