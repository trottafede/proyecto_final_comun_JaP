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
    <button id="cargarDatos" type="button" class="btn btn-outline-primary">Comprar</button>
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