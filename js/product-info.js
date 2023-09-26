const prodID = localStorage.getItem("prodID")
const catID = localStorage.getItem("catID")
// Construir la URL de la API
const apiUrl = "https://japceibal.github.io/emercado-api/products/"+prodID+".json";
const urlImagen = "../img/"
console.log(apiUrl)

// Realizar la solicitud GET a la API

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
    console.log(data.id);
    const objetoID = parseInt(prodID)
    // Verificar si el objeto con el ID específico existe en data
    if (data.id === objetoID) {
      console.log('Objeto encontrado:', data);
      showProductInfo(data);
      showRelatedProducts(data.relatedProducts);
    } else {
      console.log('Objeto no encontrado con ID', objetoID);
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

