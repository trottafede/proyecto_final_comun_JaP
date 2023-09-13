let prodID = localStorage.getItem("prodID")
let catID = localStorage.getItem("catID")

// Construir la URL de la API
const apiUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const urlImagen = "../img/"

// Realizar la solicitud GET a la API

const objetoID = parseInt(prodID)
console.log(typeof prodID)

function showProductInfo(objeto) {
  const div = document.getElementById("prueba");
  let htmlContentToAppend = `
    
    <div class="product-info">
      <h2><span>${objeto.category}/</span>${objeto.name}</h2>
    </div>
    <section>
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
      <p>${objeto.description}</p>
      <h4>Descripcion</h4>
      <p>${objeto.description}</p>

    </div>
  `;
  div.innerHTML = htmlContentToAppend;
}



fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('No se pudo obtener el objeto');
    }
    return response.json();
  })
  .then((data) => {
    const objetoEncontrado = data.products.find((objeto) => objeto.id === objetoID);
    if (objetoEncontrado) {
      console.log('Objeto encontrado:', objetoEncontrado);
    } else {
      console.log('Objeto no encontrado con ID', objetoID);
    }
    showProductInfo(objetoEncontrado)
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

