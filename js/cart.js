let carrito;

document.addEventListener("DOMContentLoaded", async () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let peugeot = carrito.find((item) => item.name.includes("Peugeot 208"));

  // Solo hago la llamada a la api si no encuentro el peugeot
  if (!peugeot) {
    let productos = await fetch(
      "https://japceibal.github.io/emercado-api/user_cart/25801.json"
    );
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
  const table = document.getElementById("productos_del_carrito");
  let contenidoHtml = "";

  for (const producto of carrito) {
    const id = producto.id;
    const name = producto.name;
    const image = producto.images[0];
    const currency = producto.currency;
    const cost = producto.cost;
    const quantity = producto.quantity;
    contenidoHtml += `
    <tr>
      <td id="td_producto"><div class="img_container"><img src=${image} alt=""></div></td> 
      <td id="td_name"><p>${name}</p></td>
      <td id="td_costo"><p>${currency} ${cost}</p></td>
      <td id="td_cantidad"><i onclick="handleOneLess(${id})" class="fa-solid fa-circle-minus"></i><span>${quantity}</span><i onclick="handleOneMore(${id})" class="fa-solid fa-circle-plus"></i></td>
      <td id="td_subtotal"><p><strong><span id="subtotal${id}"> $${cost * quantity }</span></strong></p></td>
    </tr>`;
    // <td id="td_cantidad"><input class="form-control cantidad dark_mode" type="number" value="${producto.quantity}" min="1"></td>

    // let cantidadInput = document.querySelectorAll(".cantidad");

    // cantidadInput.forEach((input, index) => {
    //   let producto = carrito[index];
    //   let subtotales = document.getElementById(`subtotal${producto.id}`);
    //   subtotales.innerHTML = producto.currency + " " + (producto.cost * producto.quantity);
    //   input.addEventListener("change", () => {
    //     let cantidad = input.value;
    //     let resultado = subtotal(producto.cost, cantidad);
    //     let intento = `${producto.currency} ${resultado}`;
    //     subtotales.innerHTML = intento;

    //     const mostrarTotal = () =>{
    //       let total = 0
    //       for (const producto of carrito){
    //         total += subtotal(producto.cost, cantidad)
    //       }
    //       return total
    //     }
    //     document.getElementById("total_resumen_compra").innerHTML = `<p>${mostrarTotal()}</p>`
    //   });
    // });
  }
  table.innerHTML = contenidoHtml;
}

const handleOneLess = (id) => {
  const productoEncontrado = findProduct(id);

  if (productoEncontrado && productoEncontrado.quantity > 0) {
    productoEncontrado.quantity--;
  } 
  if (productoEncontrado && productoEncontrado.quantity <= 0) {
    const response = confirm("Quieres borrar este producto?");
    if (response) {
      carrito = carrito.filter((item) => item.id != id);
    } else {
      productoEncontrado.quantity = 1;
    }
  }
  actualizarCarrito();
  mostrarProducto();
};

const handleOneMore = (id) => {
  const productoEncontrado = findProduct(id);

  if (productoEncontrado && productoEncontrado.quantity > 0) {
    productoEncontrado.quantity++;
  }
  actualizarCarrito();
  mostrarProducto();
};


const findProduct = (id) => {
  const productoEncontrado = carrito.find((item) => item.id === id);
  return productoEncontrado;
};

// function subtotal(costo, valor) {
//   let costoNumber = Number(costo);
//   let resultado = costoNumber * valor;
//   return resultado;
// }

function cambiarPropiedades(autoApi) {
  let auto = {
    id: autoApi.id,
    name: autoApi.name,
    quantity: 1,
    currency: autoApi.currency,
    cost: autoApi.unitCost,
    images: [autoApi.image],
  };
  return auto;
}
