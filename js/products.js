const CATEGORYPRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let currentProductsArray = [];

fetch(CATEGORYPRODUCTS)

.then(response => response.json())
.then (data => showProductsList(data))
.catch(error => console.log(error))

function showProductsList(data){
let htmlContentToAppend = "";

document.getElementById("catproduct").innerHTML += " " + data.catName;

for(let i = 0; i < data.products.length; i++){
    let product = data.products[i];

    htmlContentToAppend = `
    <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                    <small class="text-muted">${product.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${product.description}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("product-list-container").innerHTML += htmlContentToAppend;
}
}

document.addEventListener('DOMContentLoaded', ()=>{
    showProductsList();
});