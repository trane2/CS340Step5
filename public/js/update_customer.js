/*
    Citation for the following module:
    // Date: 3/16/2024
    // Adapted from the amazing work that has gone into the starter app resource
    // Contributors include George Kochera, Dr. Michael Curry and Prof. Danielle M. Safonte
    // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Submit function to upate customer
updateCustomerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    let selectedCustomer = document.getElementById("customer-select");
    let inputCustomerName = document.getElementById("input-customer_name-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputCustomerPhone = document.getElementById("input-customer_phone-update");
    let inputStoreCredit = document.getElementById("input-store_credit-update");
    let inputTotalPurchases = document.getElementById("input-total_purchases-update");

    // Get values from form fields
    let customerID = selectedCustomer.value;
    let customerNameValue = inputCustomerName.value;
    let emailValue = inputEmail.value;
    let customerPhoneValue = inputCustomerPhone.value;
    let storeCreditValue = inputStoreCredit.value;
    let totalPurchasesValue = inputTotalPurchases.value;
    
    // Data validation
    if (isNaN(customerID)) {
        return;
    }

    // Put our data in a javascript object
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

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update row
            updateCustomerRow(xhttp.response, customerID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
})



// Update customer row if successful
function updateCustomerRow(data, customer_id){
    // Get data and table
    let parsedData = JSON.parse(data);
    let data = parsedData[0];
    let table = document.getElementById("customers-table");
    
    // Iterate until row found
    // Update each td to data entries
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == customer_id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tdName = updateRowIndex.getElementsByTagName("td")[2];
            tdName.innerHTML = data.customer_name; 

            let tdEmail = updateRowIndex.getElementsByTagName("td")[3];
            tdEmail.innerHTML = data.email;

            let tdPhone = updateRowIndex.getElementsByTagName("td")[4];
            tdPhone.innerHTML = data.customer_phone;

            let tdStoreCredit = updateRowIndex.getElementsByTagName("td")[5];
            tdStoreCredit.innerHTML = data.store_credit; 

            let tdPurchases = updateRowIndex.getElementsByTagName("td")[6];
            tdPurchases.innerHTML = data.total_purchases; 
       }
    }
}