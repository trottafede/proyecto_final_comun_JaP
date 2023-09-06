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
      <h2>${objeto.name} ${objeto.category}</h2>
      <p>${objeto.description}</p>
    </div>
    <section>
        <img src="${objeto.images[0]}">
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
    console.log(data.id);
    const objetoID = parseInt(prodID)
    // Verificar si el objeto con el ID específico existe en data
    if (data.id === objetoID) {
      console.log('Objeto encontrado:', data);
      showProductInfo(data);
    } else {
      console.log('Objeto no encontrado con ID', objetoID);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

