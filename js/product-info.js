let currentObjectInfo = {};
let currentObjectComments = {};


function showProductInfo(productInfo){
let htmlContent = "";

htmlContent = `
<div class="row justify-content-center" role="alert" id="product-info-show">
<div id="photoCarousel" class="carousel slide carousel-fade col-9 my-5" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/prod${productInfo.id}_1.jpg" class="d-block w-100" alt="img1">
    </div>
    <div class="carousel-item">
      <img src="img/prod${productInfo.id}_2.jpg" class="d-block w-100" alt="img2">
    </div>
    <div class="carousel-item">
      <img src="img/prod${productInfo.id}_3.jpg" class="d-block w-100" alt="img3">
    </div>
    <div class="carousel-item">
      <img src="img/prod${productInfo.id}_4.jpg" class="d-block w-100" alt="img4">
    </div>
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
        console.log(currentObjectInfo);
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

    document.getElementById("submit").addEventListener("click",()=>{
      let opinion = document.getElementById("opinion").value;
      let puntaje = document.getElementById("puntaje").value;
      let f = new Date();
      let fecha = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()
      let user = sessionStorage.getItem("user");

      let htmlContent = "";
      let htmlStars = "";

      for(let j = 1; j <= 5; j ++){
          if(j <= puntaje){
              htmlStars += `<i class="fas fa-star"></i>`;
          }else{
              htmlStars += `<i class="far fa-star"></i>`;
          }
      }

      htmlContent = `
      <li class="list-group-item">
        <p class="m-0 text-center"><span class="fw-bold">${user}</span> - <span class="text-muted">${fecha}</span> - ${htmlStars}</p>
        <p class="text-muted m-0 text-center">${opinion}</p>
      </li>`;

      document.getElementById("listComments").innerHTML += htmlContent;
    })
})