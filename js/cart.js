let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", async () => {
    productos = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    prodJson = await productos.json();
    carrito.push(prodJson.articles[0])
    mostrarProducto();
  });

function mostrarProducto() {
  const div = document.getElementById("producto-info");
  let contenidoHtml = "";
  console.log(carrito);
  //aca muestro los productos de mi carrito
  for (const producto of carrito) {
    console.log(producto);
    contenidoHtml = `
       <div id="css-articulos">
         <img src="${producto.image || producto.images[0]}">
         <p>${producto.name}</p>
         <p>${producto.currency} ${producto.unitCost || producto.cost}</p>
         <input id="cantidad" type="number" value="1" min="1">
         <p class="subtotal"><span id="subtotal${producto.id}"></span></p>
       </div>
       <div class="paso-hr">
         <hr>
       </div>
       <div id="colocar-producto">
       </div>
     `;
    div.innerHTML += contenidoHtml;
    
    let cantidadInput = document.getElementById('cantidad');
     document.getElementById(`subtotal${producto.id}`).innerHTML = producto.currency+" " + producto.unitCost || producto.cost;
     cantidadInput.addEventListener('change', () => {
       let cantidad = cantidadInput.value;
       let cost = producto.unitCost || producto.cost;

       let resultado = subtotal(cost, cantidad);
       console.log(resultado);
       let intento = `<p>${producto.currency} ${resultado}</p>`;
       document.getElementById("subtotal").innerHTML = intento;
     })
  }
 }

function subtotal(costo, valor){
    let costoNumber = Number(costo)
    let resultado = costoNumber * valor
    return resultado
}



// Se calcula el valor total de los productos, habria que tirarlo adentro de alguna funcion para q se actualice
let valorTotal = 0;
for(const articulo in carrito){
    valorTotal += (articulo.precio * articulo.cantidad);
}
document.getElementById("total").innerHTML = valorTotal;


