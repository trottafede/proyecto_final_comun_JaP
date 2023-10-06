const prodID = localStorage.getItem("prodID")
const catID = localStorage.getItem("catID")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Construir la URL de la API
const apiUrl = "https://japceibal.github.io/emercado-api/products/"+prodID+".json";
const urlImagen = "../img/"
// Realizar la solicitud GET a la API

function showProductInfo(objeto) {
  const div = document.getElementById("prueba");
  let htmlContentToAppend = `
    <div class="product-info">
      <h2><a href="../products.html">${objeto.category}</a> ${objeto.name}</h2>
    </div>
    <section id="border-carrusel">
        <img src="${objeto.images[0]}" onclick="openFulImg(this.src)">
        <img src="${objeto.images[1]}" onclick="openFulImg(this.src)">
        <img src="${objeto.images[2]}" onclick="openFulImg(this.src)">
        <img src="${objeto.images[3]}" onclick="openFulImg(this.src)">
    </section>
    <div class="info">
      <h4>Descripcion</h4>
      <p>${objeto.description}</p>
      <h4>Costo</h4>
      <p>${objeto.currency}-${objeto.cost}</p>
      <button id="cargarDatos" type="button" class="btn btn-success mb-3">Comprar</button>
    </div>
  `;
  div.innerHTML = htmlContentToAppend;
  document.getElementById("cargarDatos").addEventListener("click", () => mandarCarrito(objeto))
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
    } 
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const fulImgBox = document.getElementById("fulImgBox")
fulImg = document.getElementById("fulImg")

function closeImg(){
  fulImgBox.style.display="none";
}

function openFulImg(reference){
  fulImgBox.style.display ="flex"
  fulImg.src = reference
}

let cantidad = 0;

function mandarCarrito(producto) {
  if (carrito.includes(producto)){
    alert("El producto ya esta en el carrito")
  }
  else{
   carrito.unshift(producto);
    actualizarCarrito(); 
  }
}

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}


/*

[
  {
    name: "Suzuki Celerio",
    image : "https/image",
    quantity: 1,
    currency : 1200
  },
   {
    name: "Suzuki Celerio",
    image : "https/image",
    quantity: 1,
    currency : 1200
  }
]

*/

// crear local storage para carrito en product info. -- fede

// al hacer click en el boton comprar añadirlo al local storage cantidad 1 por defecto, minimo 1. -- cami

// en la pagina carrito, mostrar todos los items del carrito y el de la api. -- nahuel

// sumarle el precio total -- hernan

// Franco navbar

// document.addEventListener("DOMContentLoaded", function () {
//   const buttonComprar = document.getElementById("cargarDatos");
//   const datosDiv = document.getElementById("colocar-producto");

//   button.addEventListener("click", function () {
//       $.get("https://japceibal.github.io/emercado-api/products/"+prodID+".json", function (data) {
//           datosDiv.innerHTML = `<p>Los datos de la API son: ${data}</p>`;
//       });
//   });
// });
