let carrito;
let total = 0;

document.addEventListener("DOMContentLoaded", async () => {
  ocultarAlert();
  // carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = await carritoBS();
  console.log(carrito);
  let peugeot = "";
  console.log(carrito.length != 0);

  if (carrito.length != 0) {
    peugeot = carrito.find((item) => item.name.includes("Peugeot 208"));
  }
  // Agrega un evento de escucha al formulario de envío
  document.getElementById("submit_form").addEventListener("submit", (e) => {
    e.preventDefault();
    check_forma_de_pago();
    // Obtiene el formulario y sus elementos de entrada
    const formulario = document.getElementById("submit_form");
    const inputs = formulario.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", check_forma_de_pago);
    }
  });

  document
    .getElementById("proceder-pago")
    .addEventListener("click", mostrar_comprado);

  // Solo hago la llamada a la api si no encuentro el peugeot
  if (!peugeot) {
    let productos = await fetch(
      "https://jap-commerce-backend.vercel.app/user_cart/25801.json"
    );
    peugeot = await productos.json();
    let productoApi = cambiarPropiedades(peugeot.articles[0]);
    carrito.push(productoApi);
    actualizarCarrito();
  }
  mostrarProducto();
});

async function carritoBS() {
  const url = "https://jap-commerce-backend.vercel.app/cart";
  let user = JSON.parse(localStorage.getItem("user"));
  let token = user.token;

  const response = await fetch(url, {
    method: "GET", // Método GET, pero puedes ajustarlo según tus necesidades
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { carrito } = await response.json();

  console.log(carrito);
  return carrito;
}

function ocultarAlert() {
  const alert = document.getElementById("alert_size");
  alert.style.display = "none";
}

function mostrarAlert() {
  const alert = document.getElementById("alert_size");
  alert.style.display = "block";
}

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
// Función para mostrar los productos en el carrito en una tabla HTML
function mostrarProducto() {
  const table = document.getElementById("productos_del_carrito");
  let contenidoHtml = "";
  total = 0;
  // Recorre los productos en el carrito
  for (const producto of carrito) {
    const id = producto.id;
    const name = producto.name;
    const image = producto.images[0];
    const currency = producto.currency;
    let cost = producto.cost;
    const quantity = producto.quantity;

    if (currency == "UYU") {
      cost = cost / 40;
    }
    // Crea una fila en la tabla para cada producto
    contenidoHtml += `
    <tr>
      <td id="td_producto"><div class="img_container"><img src=${image} alt=""></div></td> 
      <td id="td_name"><p>${name}</p></td>
      <td id="td_costo"><p>USD ${cost}</p></td>
      <td id="td_cantidad"><i onclick="handleOneLess(${id})" class="fa-solid fa-circle-minus"></i><span>${quantity}</span><i onclick="handleOneMore(${id})" class="fa-solid fa-circle-plus"></i></td>
      <td id="td_subtotal"><p><strong><span id="subtotal${id}"> USD ${Math.round(
      cost * quantity
    )}</span></strong></p></td>
      <td id="td_acciones"><i onclick="handleDelete(${id})" class="fa-solid fa-trash"></i></td>
    </tr>`;
    // Actualiza el total del carrito
    total += cost * quantity;
  }
  table.innerHTML = contenidoHtml;
  showOrderDetails();
  handleShowDirections();
  document
    .getElementById("premium")
    .addEventListener("change", showOrderDetails);
  document
    .getElementById("express")
    .addEventListener("change", showOrderDetails);
  document
    .getElementById("standard")
    .addEventListener("change", showOrderDetails);
}
// Función para reducir la cantidad de un producto en el carrito
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
  mandarAlServidor();
};
// Función para aumentar la cantidad de un producto en el carrito
const handleOneMore = (id) => {
  const productoEncontrado = findProduct(id);

  if (productoEncontrado && productoEncontrado.quantity > 0) {
    productoEncontrado.quantity++;
  }
  actualizarCarrito();
  mostrarProducto();
  mandarAlServidor();
};
// Función para encontrar un producto en el carrito por su ID
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
//  mostrar la dirección de envío del usuario si está almacenada
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
};
// eliminar un producto del carrito
const handleDelete = (id) => {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = carrito.filter((item) => item.id != id);
  actualizarCarrito();
  mostrarProducto();
  mandarAlServidor();
};

async function mandarAlServidor() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  const user = JSON.parse(localStorage.getItem("user")); // Asegúrate de tener tu token o de obtenerlo de manera adecuada
  const token = user.token;

  // Crear un objeto Headers y agregar el encabezado de autorización
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  /*
  const local = "http://localhost:3000/users";
  const production = "https://japceibal.github.io/emercado-api/cart";
  */
  const response = await fetch("https://jap-commerce-backend.vercel.app/cart", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: myHeaders, // Utilizar los encabezados personalizados
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify(carrito), // body data type must match "Content-Type" header
  });
  const response_a = await response.json(); // parses JSON response into native JavaScript objects

  if (response.status == 201) {
    console.log(response_a);
  } else {
    alert("error al agregar el servidor"); // Si la respuesta no es 201 , muestra un mensaje de error.
  }
}

// Guardar la dirección de envío en el almacenamiento local
const handleSaveDirections = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const input_calle = document.getElementById("input_calle").value;
  const input_esquina = document.getElementById("input_esquina").value;
  const input_numero_calle =
    document.getElementById("input_numero_calle").value;
  const input_departamento = document.getElementById(
    "select_departamento"
  ).value;

  let address = {
    calle: input_calle,
    esquina: input_esquina,
    numero: input_numero_calle,
    departamento: input_departamento,
  };

  user.address = address;

  localStorage.setItem("user", JSON.stringify(user));
  alert("Direccion guardada!");
  showOrderDetails();
};
// Mostrar los detalles del pedido
const showOrderDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const email = document.getElementById("order_details_email");
  const order_details_info_calle = document.getElementById(
    "order_details_info_calle"
  );
  const order_details_total_price = document.getElementById(
    "order_details_total_price"
  );
  const order_details_total_price_mobile = document.getElementById(
    "order_details_total_price_mobile"
  );
  const order_details_delivery_price = document.getElementById(
    "order_details_delivery_price"
  );
  const order_details_sub_total_price = document.getElementById(
    "order_details_sub_total_price"
  );

  const premium = document.getElementById("premium").checked;
  const express = document.getElementById("express").checked;
  const standard = document.getElementById("standard").checked;

  let costo_envio = 0;
  let total_to_HTML = total;
  if (premium) {
    costo_envio = total * 0.15;
    total_to_HTML += total * 0.15;
  } else if (express) {
    costo_envio = total * 0.07;
    total_to_HTML += total * 0.07;
  } else if (standard) {
    costo_envio = total * 0.05;
    total_to_HTML += total * 0.05;
  }
  total_to_HTML = parseInt(total_to_HTML);

  const input_calle = document.getElementById("input_calle").value;
  const input_esquina = document.getElementById("input_esquina").value;
  const input_numero_calle =
    document.getElementById("input_numero_calle").value;
  const select_departamento = document.getElementById(
    "select_departamento"
  ).value;

  email.innerHTML = user.email;
  if (input_esquina != "" && input_calle != "") {
    order_details_info_calle.innerHTML =
      "Calle: " +
      input_calle +
      "<br/>" +
      "Esquina: " +
      input_esquina +
      "<br/>" +
      "Numero: " +
      input_numero_calle;
  }

  let delivery = "";
  switch (select_departamento) {
    case "Montevideo":
      delivery = "Montevideo es gratis";
      break;
    default:
      delivery = select_departamento + ": $300 de envio";
  }
  order_details_total_price.innerHTML = "USD " + total_to_HTML;
  order_details_total_price_mobile.innerHTML = "USD " + total_to_HTML;
  order_details_delivery_price.innerHTML = "USD " + Math.round(costo_envio);
  order_details_sub_total_price.innerHTML = "USD " + total;

  if (user.address != null) {
    const selectElement = document.getElementById("select_departamento");
    const optionToSelect = selectElement.querySelector(
      `option[value="${user.address.departamento}"]`
    );
    optionToSelect.selected = true;
  }
};

/* forma de pago */
function formaDePago() {
  const credito = document.getElementById("credit");
  const debito = document.getElementById("debit");

  //inputs
  const numTarjeta = document.getElementById("numTarjeta");
  const code = document.getElementById("code");
  const ven = document.getElementById("ven");
  const cuenta = document.getElementById("numCuenta");
  inputsCredito = [];
  inputsCredito.push(numTarjeta, code, ven);

  if (debito.checked) {
    for (input of inputsCredito) {
      input.disabled = true;
      input.required = false;
      cuenta.disabled = false;
      cuenta.required = true;
    }
  } else if (credito.checked) {
    cuenta.disabled = true;
    cuenta.required = false;
    for (input of inputsCredito) {
      input.disabled = false;
      input.required = true;
    }
  }
}

const check_forma_de_pago = () => {
  let result = false;
  //radios
  const credito = document.getElementById("credit");
  const debito = document.getElementById("debit");

  //inputs
  const numTarjeta = document.getElementById("numTarjeta");
  const code = document.getElementById("code");
  const ven = document.getElementById("ven");

  //transferencia
  const numCuenta = document.getElementById("numCuenta");

  if (!debito.checked && !credito.checked) {
    document.getElementById("hello_select_me").style.display = "block";
  } else {
    document.getElementById("hello_select_me").style.display = "none";
  }

  if (credito.checked) {
    if (numTarjeta.value == "" || code.value == "" || ven.value == "") {
      document.getElementById("hello_select_me").style.display = "block";
    } else {
      document.getElementById("hello_select_me").style.display = "none";
      result = true;
    }
  } else if (debito.checked) {
    if (numCuenta.value == "") {
      document.getElementById("hello_select_me").style.display = "block";
    } else {
      document.getElementById("hello_select_me").style.display = "none";
      result = true;
    }
  }
  return result;
};

const mostrar_comprado = () => {
  let alert = document.getElementById("alert_size");
  if (check_forma_de_pago()) {
    function ocultarAlerta() {
      alert.classList.add("fade-out");
      setTimeout(function () {
        alert.style.display = "none";
        alert.classList.remove("fade-out");
      }, 1000);
    }
    alert.style.display = "block";
    setTimeout(ocultarAlerta, 5000);

    setTimeout(() => {
      generatePDF(
        JSON.parse(localStorage.getItem("carrito")),
        JSON.parse(localStorage.getItem("user")),
        document.getElementById("order_details_delivery_price").innerHTML
      );
      // localStorage.setItem("carrito", JSON.stringify(""));
      location.reload();
    }, 300);
  }
};

// Bootstrap validaciones
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
