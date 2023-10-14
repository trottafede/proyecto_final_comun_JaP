let carrito;
let total = 0;
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
  total = 0;
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
      <td id="td_subtotal"><p><strong><span id="subtotal${id}"> USD ${cost * quantity}</span></strong></p></td>
    </tr>`;
    total += cost * quantity;
  }
  table.innerHTML = contenidoHtml;
  showOrderDetails();
  handleShowDirections();
  document.getElementById("premium").addEventListener("change", showOrderDetails);
  document.getElementById("express").addEventListener("change", showOrderDetails);
  document.getElementById("standard").addEventListener("change", showOrderDetails);
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

const handleShowDirections = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.address) {
    const input_calle = document.getElementById("input_calle");
    const input_esquina = document.getElementById("input_esquina");
    const input_numero_calle = document.getElementById("input_numero_calle");

    input_calle.value = user.address.calle;
    input_esquina.value = user.address.esquina;
    input_numero_calle.value = user.address.numero;
    showOrderDetails();
  }
}

const handleSaveDirections = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const input_calle = document.getElementById("input_calle").value;
  const input_esquina = document.getElementById("input_esquina").value;
  const input_numero_calle = document.getElementById("input_numero_calle").value;
  const input_departamento = document.getElementById("select_departamento").value;

  let address = {
    calle: input_calle,
    esquina: input_esquina,
    numero: input_numero_calle,
    departamento: input_departamento
  }

  user.address = address;

  localStorage.setItem("user", JSON.stringify(user));
  showOrderDetails();
}

const showOrderDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const email = document.getElementById("order_details_email");
  const order_details_info_calle = document.getElementById("order_details_info_calle");
  const order_details_delivery_info = document.getElementById("order_details_delivery_info");
  const order_details_total_price = document.getElementById("order_details_total_price");
  const order_details_total_price_mobile = document.getElementById("order_details_total_price_mobile");

  const premium = document.getElementById("premium").checked;
  const express = document.getElementById("express").checked;
  const standard = document.getElementById("standard").checked;

  let total_to_HTML = total;
  if (premium) {
    total_to_HTML += total * 0.15;
  } else if (express) {
    total_to_HTML += total * 0.07; 
  } else if (standard) {
    total_to_HTML += total * 0.05; 
  }
  total_to_HTML = parseInt(total_to_HTML);
  // total_to_HTML = total_to_HTML.toLocaleString('es-ES');

  const input_calle = document.getElementById("input_calle").value;
  const input_esquina = document.getElementById("input_esquina").value;
  const input_numero_calle = document.getElementById("input_numero_calle").value;
  const select_departamento = document.getElementById("select_departamento").value;

  email.innerHTML = user.email;
  if (input_esquina != "" && input_calle != "") {
    order_details_info_calle.innerHTML ="Calle: "+  input_calle + "<br/>" + "Esquina: " + input_esquina + "<br/>" + "Numero: " + input_numero_calle;
  }

  let delivery = "";
  switch (select_departamento) {
    case "Montevideo":
        delivery = "Montevideo es gratis"
      break;
    default:
      delivery = select_departamento + ": $300 de envio";
  }
  order_details_delivery_info.innerHTML = delivery;
  order_details_total_price.innerHTML = "USD " + total_to_HTML;
  order_details_total_price_mobile.innerHTML = "USD " + total_to_HTML;

  const selectElement = document.getElementById('select_departamento');
  const optionToSelect = selectElement.querySelector(`option[value="${user.address.departamento}"]`);
  optionToSelect.selected = true;
};
