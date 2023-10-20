document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("register-form");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    registrado();
  });
});

function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("mail").value;
  const contraseña1 = document.getElementById("contraseña").value;
  const contraseña2 = document.getElementById("repeat-contraseña").value;
  const checkboxTerminos = document.getElementById("checkbox-de-terminos");

  let errores = [];
  const name_empty = "Nombre no puede estar vacio!";
  if (nombre == "" && !errores.includes(name_empty)) {
    errores.push(name_empty);
  } else {
    errores = errores.filter((item) => item != name_empty);
  }

  const name_long = "El largo del nombre no puede ser menor a 3";
  if (nombre.length < 3 && !errores.includes(name_long)) {
    errores.push(name_long);
  } else {
    errores = errores.filter((item) => item != name_long);
  }

  const lastname_empty = "Apellido no puede estar vacio!";
  if (apellido == "" && !errores.includes(lastname_empty)) {
    errores.push(lastname_empty);
  } else {
    errores = errores.filter((item) => item != lastname_empty);
  }

  const lastname_length = "El largo del apellido no puede ser menor a 3";
  if (apellido.length < 3 && !errores.includes(lastname_length)) {
    errores.push(lastname_length);
  } else {
    errores = errores.filter((item) => item != lastname_length);
  }

  const email_empty = "Email no puede estar vacio!";
  if (email == "" && !errores.includes(email_empty)) {
    errores.push(email_empty);
  } else {
    errores = errores.filter((item) => item != email_empty);
  }

  const email_length = "El largo del email no puede ser menor a 3";
  if (email.length < 3 && !errores.includes(email_length)) {
    errores.push(email_length);
  } else {
    errores = errores.filter((item) => item != email_length);
  }

  const email_type = "El email debe ser gmail, yahoo o hotmail";
  if (!validarEmail(email)) {
    errores.push(email_type);
  } else {
    errores = errores.filter((item) => item != email_type);
  }

  const password_empty = "La contraseña no puede estar vacia!";
  if (contraseña1 == "" && !errores.includes(password_empty)) {
    errores.push(password_empty);
  } else {
    errores = errores.filter((item) => item != password_empty);
  }

  const password_length = "El largo de la contraseña no puede ser menor a 3";
  if (contraseña1.length < 3 && !errores.includes(password_length)) {
    errores.push(password_length);
  } else {
    errores = errores.filter((item) => item != password_length);
  }

  const password_match = "Las credenciales no coinciden. Ingrésalas de nuevo.";
  if (contraseña2 != contraseña1 && !errores.includes(password_match)) {
    errores.push(password_match);
  } else {
    errores = errores.filter((item) => item != password_match);
  }

  const checkbox_checked =
    "Debes aceptar los términos y condiciones para continuar.";
  if (!checkboxTerminos.checked && !errores.includes(checkbox_checked)) {
    errores.push(checkbox_checked);
  } else {
    errores = errores.filter((item) => item != checkbox_checked);
  }

  //Poner todos los errores en la vista
  const li_nombre = document.getElementById("error_nombre");
  const error_apellido = document.getElementById("error_apellido");
  const error_email = document.getElementById("error_email");
  const error_contrasena = document.getElementById("error_contrasena");
  const error_contrasenas = document.getElementById("error_contrasenas");
  const error_checkbox = document.getElementById("error_checkbox");

  li_nombre.innerHTML = "";
  error_apellido.innerHTML = "";
  error_email.innerHTML = "";
  error_contrasena.innerHTML = "";
  error_contrasenas.innerHTML = "";
  error_checkbox.innerHTML = "";

  for (const error of errores) {
    if (error.toLowerCase().includes("nombre")) {
      li_nombre.innerHTML += `<li>${error}</li>`;
    }

    if (error.toLowerCase().includes("apellido")) {
      error_apellido.innerHTML += `<li>${error}</li>`;
    }

    if (error.toLowerCase().includes("email")) {
      error_email.innerHTML += `<li>${error}</li>`;
    }
    if (error.toLowerCase().includes("contraseña")) {
      error_contrasena.innerHTML += `<li>${error}</li>`;
    }
    if (error.toLowerCase().includes("credenciales")) {
      error_contrasenas.innerHTML += `<li>${error}</li>`;
    }
    if (error.toLowerCase().includes("términos")) {
      error_checkbox.innerHTML += `<li>${error}</li>`;
    }
  }
  return errores.length == 0;
}

function validarEmail(email) {
  const regex =
    /\b(?:[a-zA-Z0-9._%+-]+@gmail\.com|[a-zA-Z0-9._%+-]+@yahoo\.com|[a-zA-Z0-9._%+-]+@hotmail\.com)\b/;
  return regex.test(email);
}

function registrado() {
  if (validarFormulario()) {
    let user = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email: document.getElementById("mail").value,
      contrasena: document.getElementById("contraseña").value,
    };

    //--------------------------------------------------------------

    // Example POST method implementation:
    async function postData() {
      // Default options are marked with *
      const response = await fetch("https://jap-commerce-backend.vercel.app/users", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });
      const response_a = await response.json(); // parses JSON response into native JavaScript objects

      if (response.status == 201) {
        localStorage.setItem("user", JSON.stringify(response_a));
        window.location.href = "../../index.html";
      } else {
        alert ("error al registrarte!!")
      }
    }

    postData();
    //--------------------------------------------------------------
    // localStorage.setItem("user", JSON.stringify(user));
    // window.location.href = "../../index.html";
  }

  const formulario = document.getElementById("register-form");
  const inputs = formulario.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", validarFormulario);
  }
}
