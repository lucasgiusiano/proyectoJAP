let thisUser = JSON.parse(sessionStorage.getItem("user"))

function chargeInfoOfUser(){
    document.getElementById("nombre").value = thisUser.name;
    document.getElementById("sNombre").value = thisUser.secName;
    document.getElementById("apellido").value = thisUser.surname;   
    document.getElementById("sApellido").value = thisUser.secSurname;
    document.getElementById("email").value = thisUser.email;
    document.getElementById("contacto").value = thisUser.phoneNum;
    if(thisUser.image != ""){
        document.getElementById("imagenPerfil").src = thisUser.image;
    }
    

 }

 function saveChanges(){
    thisUser.name = document.getElementById("nombre").value;
    thisUser.secName = document.getElementById("sNombre").value;
    thisUser.surname = document.getElementById("apellido").value;
    thisUser.secSurname = document.getElementById("sApellido").value;
    thisUser.email = document.getElementById("email").value;
    thisUser.phoneNum = document.getElementById("contacto").value;
    catchAndSaveImage();

    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(thisUser));
 }

function catchAndSaveImage(){
    let fileInput = document.getElementById("imagen").files[0];
    let reader = new FileReader();
    
    reader.addEventListener("load",()=>{
        document.getElementById("imagenPerfil").src = reader.result;
        thisUser.image = reader.result;
    })
    reader.readAsDataURL(fileInput);
}

document.addEventListener("DOMContentLoaded",()=>{
    showUserOptions();
    chargeInfoOfUser();

    document.getElementById("formPerfil").addEventListener("submit", ()=>{
        if(!document.getElementById("formPerfil").checkValidity()){
            event.stopPropagation();
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'No se ha podido guardar los cambios',
                timer: '1000'
              });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Cambios guardados',
                timer: '1000'
              });
              saveChanges();
        }
        
        document.getElementById("formPerfil").classList.add("was-validated");
    });

    document.getElementById("imagen").addEventListener("input",()=>{
        catchAndSaveImage();
    });
});