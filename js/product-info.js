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
      <h2>${objeto.name}</h2>
      <p>${objeto.description}</p>
    </div>
    <section>
        <img src="${urlImagen}prod${objeto.id}_1.jpg">
        <img src="${urlImagen}prod${objeto.id}_2.jpg">
        <img src="${urlImagen}prod${objeto.id}_3.jpg">
        <img src="${urlImagen}prod${objeto.id}_4.jpg">
    </section>
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


