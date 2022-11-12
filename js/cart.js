let cartOfUser = {};

//Busca y devuelve un articulo dentro del array de articulos del objeto cartOfUser a partir de una id especifica proporcionada
function searcher(id){
    let searchedArticle = cartOfUser.articles.findIndex(article => article.id == id);

    return searchedArticle;
}

function deleteArticle(id){
    cartOfUser.articles = cartOfUser.articles.filter(article => article.id != id);
    localStorage.removeItem("articles");
    localStorage.setItem("articles",JSON.stringify(cartOfUser.articles))
    showCartInfo();
}

function subTotalCalculator(id,cost,currency){
    let idInput = "input" + id;
    let actualCountValue = document.getElementById(idInput).value;
    cartOfUser.articles[searcher(id)].count = actualCountValue;

    document.getElementById("subtotal" + id).innerHTML = currency + (actualCountValue * cost);
    totalPriceCalculator();
}

function totalPriceCalculator(){
    let subTotalPriceOfProducts = 0;

    for(let i = 0; i < cartOfUser.articles.length; i++){
        let actualArticle = cartOfUser.articles[i];

        if(actualArticle.currency == "UYU"){
            subTotalPriceOfProducts = subTotalPriceOfProducts + (actualArticle.unitCost * actualArticle.count) / 40;

        }else{
            subTotalPriceOfProducts = subTotalPriceOfProducts + (actualArticle.unitCost * actualArticle.count);
        }
    }

    document.getElementById("precioSubtotal").innerHTML = Math.round(subTotalPriceOfProducts);
    shippingPriceCalculator(subTotalPriceOfProducts);
}

function shippingPriceCalculator(subTotalPriceOfProducts){
    let radios = document.getElementsByName("envio");
    let percentOfShip = 0;
    let shippingPrice;

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked == true){
            percentOfShip = radios[i].value;
        }
    }

    shippingPrice = Math.round(subTotalPriceOfProducts * percentOfShip)
    if(percentOfShip != 0){
        document.getElementById("precioEnvio").innerHTML = shippingPrice;
    }
    shopResumePrice(subTotalPriceOfProducts, shippingPrice)
}

function shopResumePrice(totalPrice,shipPrice){
    document.getElementById("precioTotal").innerHTML= Math.round(totalPrice + shipPrice);
}

function checkForArticlesInBBDD(){
    if(localStorage.getItem("articles") != undefined){
        let articlesToAdd = JSON.parse(localStorage.getItem("articles"));
        let artToAdd = cartOfUser.articles[0];
        articlesToAdd.push(artToAdd);
        cartOfUser.articles = articlesToAdd;
    }
}

function showCartInfo(){
    let cart = cartOfUser;
    let htmlContent = ""

    for(let i = 0; i < cart.articles.length; i++){
        let article = cart.articles[i];
        let subtotal = article.count * article.unitCost;
        
        htmlContent += `          
        <tr>
            <td scope="row" class="col-2 align-middle"><img class="col-12 col-sm-10 col-lg-6" src="${article.image}" alt="img${i}"></td>
            <td class="align-middle">${article.name}</td>
            <td class="align-middle">${article.currency} ${article.unitCost}</td>
            <td class="align-middle col-1"><input class="text-center form-control form-control-sm" name="count" type="number" value="${article.count}" min="1" id="input${article.id}"></td>
            <td class="align-middle subtotal" id="subtotal${article.id}">${article.currency} ${subtotal}</td>
            <td class="align-middle"><button class="btn btn-danger borrar" id="${article.id}"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    }
 
    document.getElementById("tabla").innerHTML = htmlContent;

    totalPriceCalculator();
    eventForInputs();
    eventForDeletes();
}

function eventForInputs(){
    let inputs = document.getElementsByName("count");
    
    for(let i = 0; i < inputs.length; i++){
        let idArticle = searcher(inputs[i].id.substring(5));
        let article = cartOfUser.articles[idArticle];
        inputs[i].addEventListener("input",()=>{
            subTotalCalculator(article.id,article.unitCost,article.currency);
        })
    }
}

function eventForDeletes(){
    let deleteButtons = document.getElementsByClassName("borrar");

    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click",()=>{
            deleteArticle(deleteButtons[i].id);
        })
    }
}

function validateInpunts(){
    let inputsForValidate = document.getElementsByName("count")

    for(let i = 0; i < inputsForValidate.length; i++){
        if(inputsForValidate[i].value == 0){
            console.log(inputsForValidate[i].value);
            inputsForValidate[i].classList.add("is-invalid");
            inputsForValidate[i].classList.remove("is-valid");
        }else{
            inputsForValidate[i].classList.remove("is-invalid");
            inputsForValidate[i].classList.add("is-valid");
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    let url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
    getJSONData(url)
    .then(function (resultObj) {
        if (resultObj.status === "ok") {
          cartOfUser = resultObj.data; 
          checkForArticlesInBBDD();
          showCartInfo();
        }
      });

    showUserOptions();

    document.getElementById("radio15").addEventListener("click",()=>{
        totalPriceCalculator();
    });
    document.getElementById("radio7").addEventListener("click",()=>{
        totalPriceCalculator();
    });
    document.getElementById("radio5").addEventListener("click",()=>{
        totalPriceCalculator();
    });

    document.getElementById("tarjeta").addEventListener("click", ()=>{
        document.getElementById("numCuen").disabled = true;
        document.getElementById("numTarj").disabled = false;
        document.getElementById("codSeg").disabled = false;
        document.getElementById("venci").disabled = false;
        
    });

    document.getElementById("transf").addEventListener("click", ()=>{
        document.getElementById("numCuen").disabled = false;
        document.getElementById("numTarj").disabled = true;
        document.getElementById("codSeg").disabled = true;
        document.getElementById("venci").disabled = true;
    });
    
    document.getElementById("cerrarMetodos").addEventListener("click", ()=>{
        let payMethods = document.getElementsByName("formaPago");

        if(payMethods[0].checked){
            document.getElementById("formaSeleccionada").classList.remove("text-danger")
            document.getElementById("formaSeleccionada").classList.remove("text-muted")
            document.getElementById("formaSeleccionada").innerHTML = "Tarjeta de Crédito";
        }else if(payMethods[1].checked){
            document.getElementById("formaSeleccionada").classList.remove("text-danger")
            document.getElementById("formaSeleccionada").classList.remove("text-muted")
            document.getElementById("formaSeleccionada").innerHTML = "Transferencia Bancaria";
        }else{
            document.getElementById("formaSeleccionada").classList.remove("text-success")
            document.getElementById("formaSeleccionada").classList.add("text-danger")
            document.getElementById("formaSeleccionada").classList.remove("text-muted")
        }
    });

    document.getElementById("calle").addEventListener("keyup",()=>{
        if(document.getElementById("calle").value != ""){
            document.getElementById("calle").classList.remove("is-invalid");
            document.getElementById("calle").classList.add("is-valid");
        }
    });

    document.getElementById("numeroCalle").addEventListener("keyup",()=>{
        if(document.getElementById("numeroCalle").value != ""){
            document.getElementById("numeroCalle").classList.remove("is-invalid");
            document.getElementById("numeroCalle").classList.add("is-valid");
        }
    });

    document.getElementById("esquinaCalle").addEventListener("keyup",()=>{
        if(document.getElementById("esquinaCalle").value != ""){
            document.getElementById("esquinaCalle").classList.remove("is-invalid");
            document.getElementById("esquinaCalle").classList.add("is-valid");
        }
    });

    document.getElementById("finalizarComp").addEventListener("click", ()=>{

        if(document.getElementById("formEnvio").checkValidity() == true && document.getElementById("formTipoEnvio").checkValidity() == true && (document.getElementById("tarjeta").checked == true || document.getElementById("transf").checked == true)){
            document.getElementById("formEnvio").classList.add("was-validated")
            document.getElementById("formTipoEnvio").classList.add("was-validated")

            document.getElementById("formaSeleccionada").classList.add("text-success")
            document.getElementById("formaSeleccionada").classList.remove("text-danger")
            document.getElementById("formaSeleccionada").classList.remove("text-muted")

            Swal.fire({
                icon: 'success',
                title: '¡Has comprado con éxito! ',
              });
        }else{

        validateInpunts();

        if(document.getElementById("calle").value == ""){
            document.getElementById("calle").classList.add("is-invalid");
        }

        if(document.getElementById("numeroCalle").value == ""){
            document.getElementById("numeroCalle").classList.add("is-invalid");
        }

        if(document.getElementById("esquinaCalle").value == ""){
            document.getElementById("esquinaCalle").classList.add("is-invalid");
        }

        if(document.getElementById("radio15").checked == false && document.getElementById("radio7").checked == false && document.getElementById("radio5").checked == false){
            document.getElementById("radio15").classList.add("is-invalid");
            document.getElementById("radio7").classList.add("is-invalid");
            document.getElementById("radio5").classList.add("is-invalid");
        }
        if(document.getElementById("tarjeta").checked == false && document.getElementById("transf").checked == false){
            document.getElementById("formaSeleccionada").classList.remove("text-muted")
            document.getElementById("formaSeleccionada").classList.add("text-danger")
        }else{
            document.getElementById("formaSeleccionada").classList.add("text-muted")
            document.getElementById("formaSeleccionada").classList.remove("text-danger")
        }
        Swal.fire({
            icon: 'error',
            title: 'Compra fallida',
            text: 'Complete los campos marcados en rojo',
          });
    }
    });

    document.getElementById("radio15").addEventListener("click",()=>{
        document.getElementById("radio15").classList.remove("is-invalid");
        document.getElementById("radio15").classList.add("is-valid");

        document.getElementById("radio7").classList.remove("is-invalid");
        document.getElementById("radio7").classList.remove("is-valid");

        document.getElementById("radio5").classList.remove("is-invalid");
        document.getElementById("radio5").classList.remove("is-valid"); 
    });

    document.getElementById("radio7").addEventListener("click",()=>{
        document.getElementById("radio15").classList.remove("is-invalid");
        document.getElementById("radio15").classList.remove("is-valid");

        document.getElementById("radio7").classList.remove("is-invalid");
        document.getElementById("radio7").classList.add("is-valid");

        document.getElementById("radio5").classList.remove("is-invalid");
        document.getElementById("radio5").classList.remove("is-valid");
            
    });

    document.getElementById("radio5").addEventListener("click",()=>{
        document.getElementById("radio15").classList.remove("is-invalid");
        document.getElementById("radio15").classList.remove("is-valid");

        document.getElementById("radio7").classList.remove("is-invalid");
        document.getElementById("radio7").classList.remove("is-valid");

        document.getElementById("radio5").classList.remove("is-invalid");
        document.getElementById("radio5").classList.add("is-valid");
            
    });
})