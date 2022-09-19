let currentObjectInfo = {};
let currentObjectComments = {};

function goProfile(){
  windows.location = "my-profile.html";
}

function showProductInfo(productInfo){
let htmlContent = "";
let htmlOfImages = "";


for(let i = 0; i < productInfo.images.length; i++){
  let imagen = productInfo.images[i];
  
  if(i == 0){
    htmlOfImages += `
  <div class="carousel-item active">
    <img src="${imagen}" class="d-block w-100" alt="img${i}">
  </div>`
  }else{
    htmlOfImages += `
    <div class="carousel-item">
      <img src="${imagen}" class="d-block w-100" alt="img${i}">
    </div>`
  }
}


htmlContent = `
<div class="row justify-content-center" role="alert" id="product-info-show">
<div id="photoCarousel" class="carousel slide carousel-fade col-9 my-5" data-bs-ride="carousel">
  <div class="carousel-inner">
    ${htmlOfImages}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon btn-secondary" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon btn-secondary" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div class="row justify-content-center">
  <h1 class="text-center">${productInfo.name}</h1>
  <p class="text-center">${productInfo.description}</p>
  <h3 class="text-center fw-bold my-3">${productInfo.currency} ${productInfo.cost}</h3>
  <h3 class="text-center fw-bold mt-3">${productInfo.soldCount}</h3>
  <h3 class="text-center fw-bold mb-3">Unidades Vendidas</h3>
  <p class="text-center">Categoría: ${productInfo.category}</p>
</div>
</div>`;

document.getElementById("produInfo").innerHTML = htmlContent;
}

function showProductComments(productComment){
    let htmlContent = "";
    
    for(let i = 0; i < productComment.length; i ++){
        let comment = productComment[i];
        let htmlStars = "";

        for(let j = 1; j <= 5; j ++){
            if(j <= comment.score){
                htmlStars += `<i class="fas fa-star"></i>`;
            }else{
                htmlStars += `<i class="far fa-star"></i>`;
            }
        }

        htmlContent += `
        <li class="list-group-item">
            <p class="m-0 text-center"><span class="fw-bold">${comment.user}</span> - <span class="text-muted">${comment.dateTime}</span> - ${htmlStars}</p>
            <p class="text-muted m-0 text-center">${comment.description}</p>
        </li>`;
    }
document.getElementById("listComments").innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded",()=>{

  logged();

    let id = localStorage.getItem("prodID");
    
    let urlProduct = PRODUCT_INFO_URL + id + EXT_TYPE;
    let urlComments = PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE;
    getJSONData(urlProduct)
    .then(function (resultObj) {
      if (resultObj.status === "ok") {
        currentObjectInfo = resultObj.data; 
        showProductInfo(currentObjectInfo);     
      }
    });
    getJSONData(urlComments)
    .then(function (resultObj) {
      if (resultObj.status === "ok") {
        currentObjectComments = resultObj.data;
        showProductComments(currentObjectComments);
      }
    });

    document.getElementById("volver").addEventListener("click",()=>{

      window.location = "products.html";

    })

    document.getElementById("submit").addEventListener("click",()=>{
      let opinion = document.getElementById("opinion").value;
      let puntaje = document.getElementById("puntaje").value;
      let usuario = sessionStorage.getItem("user");
      let comment = {};
      let f = new Date();
      let dia = f.getDate();
      let mes = f.getMonth();

      if(f.getDate() < 10){
        dia = "0" + f.getDate();
      }

      if(f.getMonth()< 10){
        mes = "0" + f.getMonth();
      }

      let fecha = f.getFullYear() + "-" + mes + "-" + dia +" " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
      
      comment = {
        product : currentObjectInfo.id,
        score : puntaje,
        description : opinion,
        user : usuario,
        dateTime : fecha
      };

      currentObjectComments.push(comment);
      showProductComments(currentObjectComments)
    })
/*Quiero ver que*/
})