document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "./components/Login/login.html";
  }
});

// const primerNombre = document.querySelector("input[name='primerNombre']").value;
// const primerApellido = document.querySelector("input[name='primerApellido']").value;
// const email = document.querySelector("input[name='email']").value;
// const telefono = document.querySelector("input[name='telefono']").value;

// if (primerNombre && primerApellido && email && telefono && /^\d{1,15}$/.test(telefono) && /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/.test(email)) {
//   guardarDatos();
// } else {
//   alert("Por favor, complete todos los campos obligatorios y asegúrese de que el correo electrónico y el número de teléfono sean válidos.");
// }

// function guardarDatos() {
//   const datos = {
//     primerNombre: document.querySelector("input[name='primerNombre']").value,
//     primerApellido: document.querySelector("input[name='primerApellido']").value,
//     email: document.querySelector("input[name='email']").value,
//     telefono: document.querySelector("input[name='telefono']").value,
//   };

//   localStorage.setItem("datos", JSON.stringify(datos));
// }