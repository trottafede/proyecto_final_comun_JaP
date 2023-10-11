let carrito;

document.addEventListener("DOMContentLoaded", async () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let peugeot = carrito.find((item) => item.name.includes("Peugeot 208"));

  // Solo hago la llamada a la api si no encuentro el peugeot
  if ( !peugeot ) {
    let productos = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    peugeot = await productos.json();
    let productoApi = cambiarPropiedades(peugeot.articles[0]);
    carrito.push(productoApi);
    actualizarCarrito();
  }
  mostrarProducto();
});

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProducto() {
  const div = document.getElementById("productos_del_carrito");
  let contenidoHtml = "";

  for (const producto of carrito) {
    contenidoHtml = `
    <tr>
      <td><img height="100" width="100" src=${producto.image || producto.images[0]} alt=""></td> 
      <td id="td_name">${producto.name}</td>
      <td >${producto.currency} ${producto.cost}</td>
      <td id="td_cantidad"><input class="cantidad" type="number" value="${producto.quantity}" min="1"></td>
      <td><strong><span id="subtotal${producto.id}"></span></strong></td>
    </tr>`;
    
    div.innerHTML += contenidoHtml;
    let cantidadInput = document.querySelectorAll(".cantidad");

    cantidadInput.forEach((input, index) => {
      let producto = carrito[index];
      let subtotales = document.getElementById(`subtotal${producto.id}`);
      subtotales.innerHTML = producto.currency + " " + (producto.cost * producto.quantity);
      input.addEventListener("change", () => {
        let cantidad = input.value;
        let resultado = subtotal(producto.cost, cantidad);
        let intento = `${producto.currency} ${resultado}`;
        subtotales.innerHTML = intento;
      });
    });
  }
}

function subtotal(costo, valor) {
  console.log(costo);
  let costoNumber = Number(costo);
  let resultado = costoNumber * valor;
  return resultado;
}

function cambiarPropiedades(autoApi) {
  let auto = {
    id: autoApi.id,
    name: autoApi.name,
    quantity: 1,
    currency: autoApi.currency,
    cost: autoApi.unitCost,
    image: autoApi.image,
  };
  return auto;
}
