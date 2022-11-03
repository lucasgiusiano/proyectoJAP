const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

function logged(){
  let usuario = JSON.parse(sessionStorage.getItem("user"));
  let htmlContentSession = "";
  
  if (usuario != undefined){
    htmlContentSession = `
    <a class="btn btn-secondary nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" id="nombreUsuario">${usuario.email}</a>
    <ul class="dropdown-menu">
      <li><a role="button" class="dropdown-item" id="verCarrito" href="cart.html">Mi carrito</a></li>
      <li><a role="button" class="dropdown-item" id="verPerfil" href="my-profile.html">Mi perfil</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a role="button" class="dropdown-item" id="cerrarSesion" onclick="unlogUser()" href="login.html">Cerrar Sesión</a></li>
    </ul>`;

    document.getElementById("perfil").innerHTML = htmlContentSession;
  }else{
      window.location = "login.html"
  }
}

function unlogUser(){
  sessionStorage.removeItem("user");
}

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}