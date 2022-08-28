
function setNameOfCategory(cate){
  document.getElementById("catproduct").innerHTML += " " + cate.catName;
}

function showProductsList(productArray) {
  let htmlContentToAppend = "";

  for (let i = 0; i < productArray.length; i++) {
    let product = productArray[i];

    htmlContentToAppend += `
    <div onclick="setCatID(${product.id})" class="element list-group-item list-group-item-action cursor-active">
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
    
  }

  document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", () => {
  let url = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
  let currentProductsArray = [];
  getJSONData(url)
  .then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data
      showProductsList(currentProductsArray.products);
      setNameOfCategory(currentProductsArray);
    }
  });

document.getElementById("rangeFilterCountProducts").addEventListener("click",()=>{
  let min = document.getElementById("rangeFilterCountMinPrice").value;
  let max = document.getElementById("rangeFilterCountMaxPrice").value;

  if(max == ""){
    max = 9999999999;
  }
  
  let filtredArray = currentProductsArray.products.filter(produ => produ.cost >= min && produ.cost <= max);

  showProductsList(filtredArray);

  });

  document.getElementById("clearRangeFilterProducts").addEventListener("click",()=>{
    document.getElementById("rangeFilterCountMinPrice").value = "";
    document.getElementById("rangeFilterCountMaxPrice").value = "";

    showProductsList(currentProductsArray.products);
  });

  document.getElementById("sortAsc").addEventListener("click", ()=>{

    let sortedArray = currentProductsArray.products;

    sortedArray.sort((pr1,pr2)=>{
        return pr1.cost - pr2.cost;    
    });

    showProductsList(sortedArray)

  });

  document.getElementById("sortDesc").addEventListener("click", ()=>{

    let sortedArray = currentProductsArray.products;

    sortedArray.sort((pr1,pr2)=>{
      return pr2.cost - pr1.cost;
    });

    showProductsList(sortedArray)

  });

  document.getElementById("sortByCount").addEventListener("click", ()=>{

    let sortedArray = currentProductsArray.products;

    sortedArray.sort((pr1,pr2)=>{
      return pr2.soldCount - pr1.soldCount;
    });

    showProductsList(sortedArray)

  });

  document.getElementById("searcher").addEventListener("keyup",()=>{
    let search = document.getElementById("searcher").value;
    
    let searchedArray = currentProductsArray.products.filter( pr => {
      return pr.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || pr.description.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
    
    showProductsList(searchedArray);
  });
  
});

