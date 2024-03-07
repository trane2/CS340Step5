/*
    Citation for the following code:
    Date: 2/28/24
    Adapted from the amazing work that has gone into the starter app resource
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/

// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let selectedCustomer = document.getElementById("customer-select");
    let inputCustomerName = document.getElementById("input-customer_name-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputCustomerPhone = document.getElementById("input-customer_phone-update");
    let inputStoreCredit = document.getElementById("input-store_credit-update");
    let inputTotalPurchases = document.getElementById("input-total_purchases-update");

    // Get the values from the form fields
    let customerID = selectedCustomer.value;
    let customerNameValue = inputCustomerName.value;
    let emailValue = inputEmail.value;
    let customerPhoneValue = inputCustomerPhone.value;
    let storeCreditValue = inputStoreCredit.value;
    let totalPurchasesValue = inputTotalPurchases.value;
    
    // currently the database table for locations does not allow updating values to NULL
    // more data validation goes here

    if (isNaN(customerID)) {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customerID,
        customer_name: customerNameValue,
        email: emailValue,
        customer_phone: customerPhoneValue,
        store_credit: storeCreditValue,
        total_purchases: totalPurchasesValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    let updatedRow = parsedData[0]

    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching location ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of wares_capacity value
            let tdName = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign wares_capacity to our value we updated to
            tdName.innerHTML = updatedRow.customer_name; 
            
            
            // Get td of address value
            let tdEmail = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign address_line to our value we updated to
            tdEmail.innerHTML = updatedRow.email;

            // Get td of city value
            let tdPhone = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign city to our value we updated to
            tdPhone.innerHTML = updatedRow.customer_phone;

            // Get td of postal_code value
            let tdStoreCredit = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign postal_code to our value we updated to
            tdStoreCredit.innerHTML = updatedRow.store_credit; 

            // Get td of site_phone value
            let tdPurchases = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign site_phone to our value we updated to
            tdPurchases.innerHTML = updatedRow.total_purchases; 
       }
    }
}