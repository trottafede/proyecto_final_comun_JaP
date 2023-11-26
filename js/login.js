function alertError() {
  alert("La contraseña debe ser mayor a 6 caracteres");
}

function validarLogin() {
  const email = document.getElementById("usuario").value;
  const contraseña1 = document.getElementById("contraseña").value;

  let errores = [];

  // Validación para el campo de correo electrónico vacío.
  const email_empty = "Email no puede estar vacio!";
  if (email == "" && !errores.includes(email_empty)) {
    errores.push(email_empty);
  } else {
    errores = errores.filter((item) => item != email_empty);
  }
  // Validación para la longuitud  de correo electrónico.
  const email_length = "El largo del email no puede ser menor a 3";
  if (email.length < 3 && !errores.includes(email_length)) {
    errores.push(email_length);
  } else {
    errores = errores.filter((item) => item != email_length);
  }
  // Validación para el tipo de correo electrónico (gmail, yahoo, o hotmail).
  const email_type = "El email debe ser gmail, yahoo o hotmail";
  if (!validarEmail(email)) {
    errores.push(email_type);
  } else {
    errores = errores.filter((item) => item != email_type);
  }
  // Validación para el campo de contraseña vacío.
  const password_empty = "La contraseña no puede estar vacia!";
  if (contraseña1 == "" && !errores.includes(password_empty)) {
    errores.push(password_empty);
  } else {
    errores = errores.filter((item) => item != password_empty);
  }
  // Validación para la longitud de la contraseña.
  const password_length = "El largo de la contraseña no puede ser menor a 3";
  if (contraseña1.length < 3 && !errores.includes(password_length)) {
    errores.push(password_length);
  } else {
    errores = errores.filter((item) => item != password_length);
  }

  const error_email = document.getElementById("error_email");
  const error_contrasena = document.getElementById("error_contrasena");

  error_email.innerHTML = "";
  error_contrasena.innerHTML = "";

  // Se agregan los mensajes de error a los contenedores .
  for (const error of errores) {
    if (error.toLowerCase().includes("email")) {
      error_email.innerHTML += `<li>${error}</li>`;
    }
    if (error.toLowerCase().includes("contraseña")) {
      error_contrasena.innerHTML += `<li>${error}</li>`;
    }
  }
  return errores.length == 0;
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let spinner = document.getElementById("spinner_login");
      spinner.style.display = "inline-block";

      if (validarLogin()) {
        async function postData() {
          // Default options are marked with *
          const local = "http://localhost:3000/login";
          const production = "https://jap-commerce-backend.vercel.app/login";
          const response = await fetch(production, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
              email: document.getElementById("usuario").value,
              contrasena: document.getElementById("contraseña").value,
            }), // body data type must match "Content-Type" header
          });
          const { token, user } = await response.json(); // parses JSON response into native JavaScript objects
          if (user) {
            user.token = token;
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "./index.html";
          } else {
            alert("Login incorrecto!");
          }
          spinner.style.display = "none";
        }
        postData();
      } else {
        spinner.style.display = "none";
      }

      const formulario = document.getElementById("login-form");
      const inputs = formulario.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", validarLogin);
      }
    });
});

// Función para validar el formato del correo electrónico.
function validarEmail(email) {
  const regex =
    /\b(?:[a-zA-Z0-9._%+-]+@gmail\.com|[a-zA-Z0-9._%+-]+@yahoo\.com|[a-zA-Z0-9._%+-]+@hotmail\.com)\b/;
  return regex.test(email);
}
