


document.addEventListener("DOMContentLoaded", function(){

    logged();
    
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
    document.getElementById("verCarrito").addEventListener("click", function() {
        window.location = "cart.html"
    });
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        window.location = "login.html"
        sessionStorage.removeItem("user");
    });
 

});