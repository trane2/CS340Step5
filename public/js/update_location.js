/*
Citation for the following code:
Date: 2/28/24
Adapted from the amazing work that has gone into the starter app resource
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-location-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let selectedLocation = document.getElementById("location-select");
    let inputWares = document.getElementById("update-wares");
    let inputAddress = document.getElementById("update-address");
    let inputCity = document.getElementById("update-city");
    let inputPostal = document.getElementById("update-postal");
    let inputSitePhone = document.getElementById("update-site-phone");

    // Get the values from the form fields
    let locationValue = selectedLocation.value;
    let waresValue = inputWares.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let postalValue = inputPostal.value;
    let sitePhoneValue = inputSitePhone.value;
    
    // currently the database table for locations does not allow updating values to NULL
    // more data validation goes here

    if (isNaN(locationValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        location_id: locationValue,
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

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, locationValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, locationID){
    let parsedData = JSON.parse(data);
    let updatedRow = parsedData[0]

    let table = document.getElementById("locations-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == locationID) {

            // Get the location of the row where we found the matching location ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of wares_capacity value
            let tdWares = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign wares_capacity to our value we updated to
            tdWares.innerHTML = updatedRow.wares_capacity; 
            
            
            // Get td of address value
            let tdAddress = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign address_line to our value we updated to
            tdAddress.innerHTML = updatedRow.address_line;

            // Get td of city value
            let tdCity = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign city to our value we updated to
            tdCity.innerHTML = updatedRow.city;

            // Get td of postal_code value
            let tdPostal = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign postal_code to our value we updated to
            tdPostal.innerHTML = updatedRow.postal_code; 

            // Get td of site_phone value
            let tdSitePhone = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign site_phone to our value we updated to
            tdSitePhone.innerHTML = updatedRow.site_phone; 
       }
    }
}