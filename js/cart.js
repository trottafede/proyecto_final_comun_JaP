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
    <input type="number" name="contador" value="1">
    <p class="subtotal">Hola uwu</p>
    </div>
    <div class="paso-hr">
    <hr>
    </div>
    `;
    div.innerHTML = contenidoHtml
    console.log(producto.name)
  }