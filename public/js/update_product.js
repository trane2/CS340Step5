let updateProductForm = document.getElementById('update-product-form-ajax');

updateProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let selectedProduct = document.getElementById("product-select");
    let inputPrice = document.getElementById("input-price-update");
    let inputLabel = document.getElementById("input-label-update");
    let inputDesigner = document.getElementById("input-designer-update");

    let productID = selectedProduct.value;
    let priceValue = inputPrice.value;
    let labelValue = inputLabel.value;
    let designerValue = inputDesigner.value;

    if (isNaN(productID)) {
        return;
    }

    let data = {
        product_id: productID,
        price: priceValue,
        label: labelValue,
        designer: designerValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, productID);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, product_id){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("products-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == product_id) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let data = parsedData[0]

            let tdPrice = updateRowIndex.getElementsByTagName("td")[2];
            tdPrice.innerHTML = data.price; 

            let tdLabel = updateRowIndex.getElementsByTagName("td")[3];
            tdLabel.innerHTML = data.label; 

            let tdDesigner = updateRowIndex.getElementsByTagName("td")[4];
            tdDesigner.innerHTML = data.designer; 
        }
    }
}