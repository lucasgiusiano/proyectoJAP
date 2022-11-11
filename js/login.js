//Chequea que los datos ingresados por el ususario sean correctos y en caso de que lo sean realiza el log 
function loginCheck() {
  let newUser = {name: "",secName:"", surname: "",secSurname:"",email:"",phoneNum: 0,password:"",image:""}
  let email = document.getElementById("email").value;
  let pass = document.getElementById("contra").value;
  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


  if (email === "" || email === "Correo Electrónico" && pass === "" || pass === "Contraseña") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe ingresar un correo y una contraseña válidos'
    });
    document.getElementById("email").classList.remove("border-dark");
    document.getElementById("email").classList.add("border-danger");
    document.getElementById("contra").classList.remove("border-dark");
    document.getElementById("contra").classList.add("border-danger");
  } else if (email === "" || email === "Correo Electrónico" || !emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe ingresar un correo válido'
    });
    document.getElementById("email").classList.remove("border-dark");
    document.getElementById("email").classList.add("border-danger");
  } else if (pass === "" || pass === "Contraseña") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe ingresar una contraseña válido'
    });
    document.getElementById("contra").classList.remove("border-dark");
    document.getElementById("contra").classList.add("border-danger");
  } else {
    newUser.email = email;
    newUser.password = pass;
    sessionStorage.setItem("user",JSON.stringify(newUser));
    location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Por favor inicie sesion para continuar navegando por la pagina.'
  });

  document.getElementById("email").addEventListener("click", () => {
    document.getElementById("email").value = "";
  });

  document.getElementById("contra").addEventListener("click", () => {
    document.getElementById("contra").value = "";
  });

  document.getElementById("contra").addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
      loginCheck();
    }
    
  });

  document.getElementById("iniciar").addEventListener("click", () => {
    loginCheck();
  });
});
