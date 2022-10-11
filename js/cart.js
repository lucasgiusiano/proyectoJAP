let cartOfUser = {};

function subTotalCalculator(id,cost,currency){
    let idInput = "input" + id;
    let actualCountValue = document.getElementById(idInput).value;

    document.getElementById("subtotal" + id).innerHTML = currency + (actualCountValue * cost);
}


function showCartInfo(cart){
    let htmlContent = ""

    if(localStorage.getItem("articles") != undefined){
        let articlesToAdd = JSON.parse(localStorage.getItem("articles"));
        let artToAdd = cartOfUser.articles[0];
        articlesToAdd.push(artToAdd);
        cartOfUser.articles = articlesToAdd;
    }

    for(let i = 0; i < cart.articles.length; i++){
        let article = cart.articles[i];
        let subtotal = article.count * article.unitCost;
        
        htmlContent += `          
        <tr>
            <th scope="row" class="col-2 align-middle"><img class="w-50" src="${article.image}" alt="img${i}"></th>
            <td class="align-middle">${article.name}</td>
            <td class="align-middle">${article.currency} ${article.unitCost}</td>
            <td class="align-middle col-1"><input class="text-center form-control form-control-sm" onchange="subTotalCalculator(${article.id},${article.unitCost},'${article.currency}')"  type="number" value="${article.count}" min="1" id="input${article.id}"></td>
            <td class="align-middle" id="subtotal${article.id}">${article.currency} ${subtotal}</td>
        </tr>`;
    }

    document.getElementById("tabla").innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", ()=>{
    let url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
    getJSONData(url)
    .then(function (resultObj) {
        if (resultObj.status === "ok") {
          cartOfUser = resultObj.data; 
          showCartInfo(cartOfUser);
        }
      });

    logged();

    document.getElementById("verPerfil").addEventListener("click", function() {
        window.location = "my-profile.html"
    });
  
    document.getElementById("verCarrito").addEventListener("click", function() {
        window.location = "cart.html"
    });
    
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        window.location = "login.html";
        sessionStorage.removeItem("user");
    });



})