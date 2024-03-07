let addProductForm = document.getElementById('add-product-form-ajax');

addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputPrice = document.getElementById("input-price");
    let inputLabel = document.getElementById("input-label");
    let inputDesigner = document.getElementById("input-designer");

    let priceValue = inputPrice.value;
    let labelValue = inputLabel.value;
    let designerValue = inputDesigner.value;

    let data = {
        price: priceValue,
        label: labelValue,
        designer: designerValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);
            inputPrice.value = '';
            inputLabel.value = '';
            inputDesigner.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function addRowToTable(data) {
    let currentTable = document.getElementById("products-table");

    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let labelCell = document.createElement("TD");
    let designerCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    idCell.innerText = newRow.product_id;
    priceCell.innerText = newRow.price;
    labelCell.innerText = newRow.label;
    designerCell.innerText = newRow.designer;
    
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProduct(newRow.product_id);
    };
    deleteCell.appendChild(deleteButton);

    row.appendChild(deleteCell);
    row.appendChild(idCell);
    row.appendChild(priceCell);
    row.appendChild(labelCell);
    row.appendChild(designerCell);

    row.setAttribute('data-value', newRow.product_id);
    
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("product-select");
    let option = document.createElement("option");
    option.text = newRow.label;
    option.value = newRow.product_id;
    selectMenu.add(option);
}