function login() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("contra").value;

  if (email === "" || email === "Correo Electrónico" && pass === "" || pass === "Contraseña") {
    alert("Debe ingresar un correo y una contraseña válidos");
    document.getElementById("email").classList.remove("border-dark");
    document.getElementById("email").classList.add("border-danger");
    document.getElementById("contra").classList.remove("border-dark");
    document.getElementById("contra").classList.add("border-danger");
  } else if (email === "" || email === "Correo Electrónico") {
    alert("Debe ingresar un correo válido");
    document.getElementById("email").classList.remove("border-dark");
    document.getElementById("email").classList.add("border-danger");
  } else if (pass === "" || pass === "Contraseña") {
    alert("Debe ingresar una contraseña válida");
    document.getElementById("contra").classList.remove("border-dark");
    document.getElementById("contra").classList.add("border-danger");
  } else {
    sessionStorage.setItem("user",email);
    location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Por favor inicie sesion para navegar por la pagina.'
  })

  document.getElementById("email").addEventListener("click", () => {
    document.getElementById("email").value = "";
  });
  document.getElementById("contra").addEventListener("click", () => {
    document.getElementById("contra").value = "";
  });

  document.getElementById("iniciar").addEventListener("click", () => {
    login();
  });
});
