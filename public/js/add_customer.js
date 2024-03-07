/*
    Citation for the following code:
    Date: 2/28/24
    Adapted from the amazing work that has gone into the starter app resource
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerName = document.getElementById("input-customer_name");
    let inputEmail = document.getElementById("input-customer_email");
    let inputCustomerPhone = document.getElementById("input-customer_phone");
    let inputStoreCredit = document.getElementById("input-store_credit");
    let inputTotalPurchases = document.getElementById("input-total_purchases");

    // Get the values from the form fields
    let customerNameValue = inputCustomerName.value;
    let emailValue = inputEmail.value;
    let customerPhoneValue = inputCustomerPhone.value;
    let storeCreditValue = inputStoreCredit.value;
    let totalPurchasesValue = inputTotalPurchases.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_name: customerNameValue,
        email: emailValue,
        customer_phone: customerPhoneValue,
        store_credit: storeCreditValue,
        total_purchases: totalPurchasesValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputEmail.value = '';
            inputCustomerPhone.value = '' ;
            inputStoreCredit.value = '';
            inputTotalPurchases.value = '';
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
    let currentTable = document.getElementById("customers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let deleteCell = document.createElement("TD");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let creditCell = document.createElement("TD");
    let purchasesCell = document.createElement("TD");

    // Fill the cells with correct data
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteLocation(newRow.customer_id);
    };
    deleteCell.appendChild(deleteButton);

    idCell.innerText = newRow.customer_id;
    nameCell.innerText = newRow.customer_name;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.customer_phone;
    creditCell.innerText = newRow.store_credit;
    purchasesCell.innerText = newRow.total_purchases;

    // Add the cells to the row
    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(creditCell);
    row.appendChild(purchasesCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customer_id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("customer-select");
    let option = document.createElement("option");
    option.text = newRow.email
    option.value = newRow.customer_id;
    selectMenu.add(option);
}