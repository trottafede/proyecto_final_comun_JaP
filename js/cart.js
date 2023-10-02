document.addEventListener("DOMContentLoaded", async () => {
    productos = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    prodJson = await productos.json();
    //console.log(prodJson)
    mostrarProducto(prodJson)
  });

  function mostrarProducto (producto) {
    
    const div = document.getElementById("producto-info");
    let contenidoHtml = `
    <div id="css-articulos">
    <img src="${producto.articles[0].image}">
    <p>${producto.articles[0].name}</p>
    <p>${producto.articles[0].currency} ${producto.articles[0].unitCost}</p>
    <input id="cantidad" type="number" value="1" min="1">
    <p class="subtotal"><div id="subtotal"></div></p>
    </div>
    <div class="paso-hr">
    <hr>
    </div>
    `;
    div.innerHTML = contenidoHtml
    let cantidadInput = document.getElementById('cantidad');
    cantidad.addEventListener('change', () => {
        let cantidad = cantidadInput.value
        let resultado = subtotal(producto.articles[0].unitCost, cantidad)
        let intento = `<p>${resultado}</p>`
        document.getElementById("subtotal").innerHTML = intento
    }  
  )}

function subtotal(costo, valor){
    let costoNumber = Number(costo)
    let resultado = costoNumber * valor
    return resultado
}