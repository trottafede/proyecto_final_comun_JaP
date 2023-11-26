function showRelatedProducts(relatedProducts) {
  const productos_relacionados = document.getElementById(
    "productos_relacionados"
  );
  console.log(relatedProducts);

  let htmlContentToAppend = "";
  for (const producto of relatedProducts) {
    htmlContentToAppend += `
    <div class="product-info">
      <div id="imgContainerProducto">
        <img onclick="setProdID(${producto.id})" src=${producto.image} alt="">
        <p>${producto.name}</p>
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
