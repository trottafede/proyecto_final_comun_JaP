let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", async () => {
    productos = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    prodJson = await productos.json();
    let productoApi = cambiarPropiedades(prodJson.articles[0]) 
    carrito.push(productoApi)
    mostrarProducto();
  });


function mostrarProducto() {
  const div = document.getElementById("producto-info");
  let contenidoHtml = "";
  console.log(carrito);
  //aca muestro los productos de mi carrito
  for (const producto of carrito) {
    
    contenidoHtml = `
       <div id="css-articulos">
         <img src="${producto.image || producto.images[0]}">
         <p>${producto.name}</p>
         <p>${producto.currency} ${producto.cost}</p>
         <input class="cantidad" type="number" value="1" min="1">
         <p class="subtotal"><span id="subtotal${producto.id}"></span></p>
       </div>
       <div class="paso-hr">
         <hr>
       </div>
       
     `;
    div.innerHTML += contenidoHtml;
    
    let cantidadInput = document.querySelectorAll(".cantidad");
    console.log(cantidadInput)

    
    cantidadInput.forEach((input, index) =>{
      const producto = carrito[index]
      let subtotales = document.getElementById(`subtotal${producto.id}`);
      subtotales.innerHTML =  producto.currency + " " + producto.cost;
      input.addEventListener('change', () => {
        let cantidad = input.value;
        let resultado = subtotal(producto.cost, cantidad);
       
       let intento = `${producto.currency} ${resultado}`;
       subtotales.textContent = intento;
    })
     })
  }
 }

function subtotal(costo, valor){
    console.log(costo)
    let costoNumber = Number(costo)
    let resultado = costoNumber * valor
    return resultado
}

function cambiarPropiedades(autoApi){
  let auto = {
    "id": autoApi.id,
    "name": autoApi.name,
    "currency": autoApi.currency,
    "cost": autoApi.unitCost,
    "image": autoApi.image,
  }
  return auto
}



// Se calcula el valor total de los productos, habria que tirarlo adentro de alguna funcion para q se actualice
/* let valorTotal = 0;
for(const articulo in carrito){
    valorTotal += (articulo.precio * articulo.cantidad);
}
document.getElementById("total").innerHTML = valorTotal;
 */

