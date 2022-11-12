let thisUser = JSON.parse(sessionStorage.getItem("user"))

//Carga los datos que ya hayan sido guardados anteriormente en los inputs correspondientes para que el ususario pueda ver que informacion ha proporcionado o le falta por proporcionar
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

 //Captura los datos ingresados en los inputs, los asigna a cada espacio en el objeto thisUser y actualiza el objeto guardado en el sessionStorage
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

 //Captura la imagen que el usuario haya insertado en el input correspondiente y la transforma en formato 64 para ahorrar espacio al guardarlo
 //Luego la guarda en el atributo correspondiente que contiene el objeto en la variable thisUser
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

    document.getElementById("formPerfil").addEventListener("submit", (event)=>{
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