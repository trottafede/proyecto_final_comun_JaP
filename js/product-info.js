const prodID = localStorage.getItem("prodID");
const catID = localStorage.getItem("catID");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const apiUrl = "https://japceibal.github.io/emercado-api/products/" + prodID + ".json";

function showProductInfo(objeto) {
  const carrusel = document.getElementById("carrusel");
  const description = document.getElementById("description");
  let htmlContentToAppend = `
  <h1>${objeto.name}</h1>
  <section id="carrusel_nahuel">
    <img src="${objeto.images[0]}" onclick="openFulImg(this.src)">
    <img src="${objeto.images[1]}" onclick="openFulImg(this.src)">
    <img src="${objeto.images[2]}" onclick="openFulImg(this.src)">
    <img src="${objeto.images[3]}" onclick="openFulImg(this.src)">
  </section>

  <div id="carrusel_nacho" class="container">
    <div class="row">
      <div id="product_carousel" class="carousel slide" data-bs-touch="true" ">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"  aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"  aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"  aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img onclick="openFulImg(${objeto.images[0]})" src="${objeto.images[0]}" class="d-block w-100" alt="imagen1">
          </div>
          <div class="carousel-item">
            <img src="${objeto.images[1]}" class="d-block w-100" alt="${objeto.name}">
          </div>
          <div class="carousel-item">
            <img src="${objeto.images[2]}" class="d-block w-100" alt="${objeto.name}">
          </div>
          <div class="carousel-item">
            <img src="${objeto.images[3]}" class="d-block w-100" alt="${objeto.name}">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#product_carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon text-black" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#product_carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
  `;

  const descripton_to_html = `
  <div class="col-12 product_description">
    <h4>Descripción</h4>
    <p>${objeto.description}</p>
    <h4>Costo</h4>
    <p>${objeto.currency} ${objeto.cost}</p>
    <button class="cartBtn" id="cargarDatos">
    <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
    ADD TO CART
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
  </button>
  </div>`;
  carrusel.innerHTML = htmlContentToAppend;
  description.innerHTML = descripton_to_html;
  document.getElementById("cargarDatos").addEventListener("click", () => mandarCarrito(objeto));
}



fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('No se pudo obtener el objeto');
    }
    return response.json();
  })
  .then((data) => {
    const objetoID = parseInt(prodID)
    // Verificar si el objeto con el ID específico existe en data
    if (data.id === objetoID) {
      showProductInfo(data);
      showRelatedProducts(data.relatedProducts);
    } else {
      console.log('Objeto no encontrado con ID', objetoID);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const fulImgBox = document.getElementById("fulImgBox");
fulImg = document.getElementById("fulImg");

function closeImg() {
  fulImgBox.style.display = "none";
}

function openFulImg(imageUrl) {
  fulImgBox.style.display = "flex";
  fulImg.src = imageUrl;
}

let cantidad = 0;

function mandarCarrito(producto) {
  let productoEncontrado = carrito.find((item) => item.id === producto.id);
  if (productoEncontrado) {
    productoEncontrado.quantity++;
  } else {
    producto.quantity = 1; 
    carrito.push(producto);
  }
  alert("Producto agregado!");
  actualizarCarrito();
}

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


//funcion para los productos relacionados
function showRelatedProducts(relatedProducts) {
  const productos_relacionados = document.getElementById("productos_relacionados");
  
  let htmlContentToAppend = "";
  for (const objeto of relatedProducts) {
    htmlContentToAppend += `
    <div class="card mb-2">
      <div class="row g-0">
        <div class="col-md-4 imgRelacional">
          <img onclick="setProdID('${objeto.id}')" src="${objeto.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${objeto.name}</h5>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  productos_relacionados.innerHTML = htmlContentToAppend;
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}