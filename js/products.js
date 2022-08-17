const CATEGORYPRODUCTS =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showProductsList(productArray) {
  let htmlContentToAppend = "";

  document.getElementById("catproduct").innerHTML += " " + productArray.products.catName;

  for (let i = 0; i < productArray.products.length; i++) {
    let product = productArray.products[i];

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
    `;
    document.getElementById("product-list-container").innerHTML +=
      htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(CATEGORYPRODUCTS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      showProductsList(resultObj.data);
    }
  });
});
