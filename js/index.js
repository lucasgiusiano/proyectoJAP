
function logged(){
    let usuario = sessionStorage.getItem("user");
    if (usuario != undefined){
          document.getElementById("verPerfil").innerHTML = usuario;
    }else{
        window.location = "login.html"
    }
}

document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("verPerfil").addEventListener("click", function() {
        window.location = "my-profile.html"
    });

    logged();


});