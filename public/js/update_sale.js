let updateSaleForm = document.getElementById('update-sale-form-ajax');

updateSaleForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let selectedSale = document.getElementById("sale-select");
    let inputLocation = document.getElementById("input-location-update");
    let inputEmployee = document.getElementById("input-employee-update");
    let inputCustomer = document.getElementById("input-customer-update");
    let inputSaleDate = document.getElementById("input-sale_date-update");

    let saleID = selectedSale.value
    let locationID = inputLocation.value;
    let employeeID = inputEmployee.value;
    let customerID = inputCustomer.value;
    let saleDateValue = inputSaleDate.value;

    if (isNaN(saleID)) {
        return;
    }

    let data = {
        sale_id: saleID,
        lid: locationID,
        eid: employeeID,
        cid: customerID,
        sale_date: saleDateValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, saleID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, sale_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("sales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == sale_id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let data = parsedData[0]

            console.log(data);

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