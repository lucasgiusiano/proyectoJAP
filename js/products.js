let currentProductsArray = [];

function setNameOfCategory(){
  document.getElementById("catproduct").innerHTML += " " + currentProductsArray.catName;
}

function setProdID(id){
  localStorage.setItem("prodID",id);
  window.location = "product-info.html"
}

//Recorre el array que le es pasado como por productArray y genera un tarjeta predeterminada para mostrarlo, luego agrega este codigo generado al html.
function showProductsList(productArray) { 
  let htmlContentToAppend = "";

  for (let i = 0; i < productArray.length; i++) {
    let product = productArray[i];

    htmlContentToAppend += `
    <div onclick="setProdID(${product.id})" class="element list-group-item list-group-item-action cursor-active">
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

//Filtra los productos dependiendo de los valores ingresados en los inputs rangeFilterCountMinPrice y rangeFilterCountMaxPrice
function filterByCount(){
  let min = document.getElementById("rangeFilterCountMinPrice").value;
  let max = document.getElementById("rangeFilterCountMaxPrice").value;

  if(max == ""){
    max = 9999999999;
  }
  
  let filtredArray = currentProductsArray.products.filter(produ => produ.cost >= min && produ.cost <= max);

  showProductsList(filtredArray);
}

//Ordena los productos de forma ascendente segun su precio
function sortProductsAsc(){
  let sortedArray = currentProductsArray.products.slice();

  sortedArray.sort((pr1,pr2)=>{
      return pr1.cost - pr2.cost;    
  });

  showProductsList(sortedArray);
}

//Ordena los productos de forma descendente segun su precio
function sortProductsDesc(){
  let sortedArray = currentProductsArray.products.slice();

  sortedArray.sort((pr1,pr2)=>{
    return pr2.cost - pr1.cost;
  });

  showProductsList(sortedArray)
}

//Ordena los productos de forma ascendente segun la cantidad de productos vendidos
function sortBySoldAmount(){
  let sortedArray = currentProductsArray.products.slice();

  sortedArray.sort((pr1,pr2)=>{
    return pr2.soldCount - pr1.soldCount;
  });

  showProductsList(sortedArray)
}

function filterBySearch(){
  let search = document.getElementById("searcher").value;
    
  let searchedArray = currentProductsArray.products.filter( pr => {
    return pr.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || pr.description.toLowerCase().indexOf(search.toLowerCase()) > -1;
  })
  
  showProductsList(searchedArray);
}

document.addEventListener("DOMContentLoaded", () => {
  //Toma de localStorage el id de la categoria seleccionada por el usuario y lo concantena con la URL de los productos y la extensión .json
  let CategorieID = localStorage.getItem("catID");
  let url = PRODUCTS_URL + CategorieID + EXT_TYPE;

  //Realiza el fetch al servidor, el objeto devuelto lo guarda en el array currentProductsArray y llama a las funciones que muestran los productos y 
  //el nombre de la categoria seleccionada
  getJSONData(url)
  .then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data
      showProductsList(currentProductsArray.products);
      setNameOfCategory();
    }
  });

  //Muestra el menu desplegable con la información del carrito y pergil del usuario
  showUserOptions();

document.getElementById("rangeFilterCountProducts").addEventListener("click",()=>{
  filterByCount();
  });

//Al hacer click en el botón "limpiar" se limpian los valores de los inputs y se llama nuevamente a la función que muestra los 
//productos ahora con el array de productos original para que se muestren todos
  document.getElementById("clearRangeFilterProducts").addEventListener("click",()=>{
    document.getElementById("rangeFilterCountMinPrice").value = "";
    document.getElementById("rangeFilterCountMaxPrice").value = "";

    showProductsList(currentProductsArray.products);
  });

  document.getElementById("sortAsc").addEventListener("click", ()=>{
    sortProductsAsc();
  });

  document.getElementById("sortDesc").addEventListener("click", ()=>{
    sortProductsDesc();
  });

  document.getElementById("sortByCount").addEventListener("click", ()=>{
    sortBySoldAmount();
  });

  document.getElementById("searcher").addEventListener("keyup",()=>{
    filterBySearch();
  });
  
});

