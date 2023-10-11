const prodID = localStorage.getItem("prodID");
const catID = localStorage.getItem("catID");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const apiUrl =
  "https://japceibal.github.io/emercado-api/products/" + prodID + ".json";
const urlImagen = "../img/";

//adaptar el carrusel cuando pidan el tema de ventas para la cantidad que el usuario ingrese
function showProductInfo(objeto) {
  const div = document.getElementById("prueba");
  let htmlContentToAppend = `
    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="true">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${objeto.images[0]}" class="d-block w-100" alt="imagen1">
      </div>
      <div class="carousel-item">
        <img src="${objeto.images[1]}" class="d-block w-100" alt="imagen2">
      </div>
      <div class="carousel-item">
        <img src="${objeto.images[2]}" class="d-block w-100" alt="imagen3">
      </div>
      <div class="carousel-item">
        <img src="${objeto.images[3]}" class="d-block w-100" alt="imagen4">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `;
  div.innerHTML = htmlContentToAppend;
  document
    .getElementById("cargarDatos")
    .addEventListener("click", () => mandarCarrito(objeto));
}

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo obtener el objeto");
    }
    return response.json();
  })
  .then((data) => {
    const objetoID = parseInt(prodID);
    // Verificar si el objeto con el ID específico existe en data
    if (data.id === objetoID) {
      showProductInfo(data);
      showRelatedProducts(data.relatedProducts);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const fulImgBox = document.getElementById("fulImgBox");
fulImg = document.getElementById("fulImg");

function closeImg() {
  fulImgBox.style.display = "none";
}

function openFulImg(reference) {
  fulImgBox.style.display = "flex";
  fulImg.src = reference;
}

let cantidad = 0;

function mandarCarrito(producto) {
  console.log(producto);
  let productoEncontrado = carrito.find((item) => item.id == producto.id);

  if (productoEncontrado) {
    productoEncontrado.quantity++;
  } else {
    producto.quantity = 1;
    carrito.push(producto);
  }
  alert("Producto agregado! (Cambiame por una alerta mas linda, sorete!!!!)")
  actualizarCarrito();
}

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

