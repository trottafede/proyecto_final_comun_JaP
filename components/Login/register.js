function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("mail").value;
  const contraseña1 = document.getElementById("contraseña").value;
  const contraseña2 = document.getElementById("repeat-contraseña").value;
  const checkboxTerminos = document.getElementById("checkbox-de-terminos");

  
  let errores = [];
  if (nombre == "" && !errores.includes("Nombre no puede estar vacio!")) {
    errores.push("Nombre no puede estar vacio!");
  } else {
    errores = errores.filter((item) => item != "Nombre no puede estar vacio!");
  }
  if (nombre.length < 4 && !errores.includes("El largo del nombre no puede ser menor a 4")) {
    errores.push("El largo del nombre no puede ser menor a 4");
  } else {
    errores = errores.filter((item) => item != "El largo del nombre no puede ser menor a 4");
  }


  if (apellido == "" && !errores.includes("Apellido no puede estar vacio!")) {
    errores.push("Apellido no puede estar vacio!");
  } else {
    errores = errores.filter((item) => item != "Apellido no puede estar vacio!");
  }
  if (apellido.length < 4 && !errores.includes("El largo del apellido no puede ser menor a 4")) {
    errores.push("El largo del apellido no puede ser menor a 4");
  } else {
    errores = errores.filter((item) => item != "El largo del apellido no puede ser menor a 4");
  }

  if (email == "" && !errores.includes("Email no puede estar vacio!")) {
    errores.push("Email no puede estar vacio!");
  } else {
    errores = errores.filter((item) => item != "Email no puede estar vacio!");
  }
  if (email.length < 4 && !errores.includes("El largo del email no puede ser menor a 4")) {
    errores.push("El largo del email no puede ser menor a 4");
  } else {
    errores = errores.filter((item) => item != "El largo del email no puede ser menor a 4");
  }

  if (!validarEmail(email)) {
    errores.push("El email debe ser gmail, yahoo o hotmail");
  } else {
    errores = errores.filter((item) => item != "El email debe ser gmail, yahoo o hotmail");
  }


  if (contraseña1 == "" && !errores.includes("La contraseña no puede estar vacia!")) {
    errores.push("La contraseña no puede estar vacia!");
  } else {
    errores = errores.filter((item) => item != "La contraseña no puede estar vacia!");
  }
  if (contraseña1.length < 4 && !errores.includes("El largo de la contraseña no puede ser menor a 4")) {
    errores.push("El largo de la contraseña no puede ser menor a 4");
  } else {
    errores = errores.filter((item) => item != "El largo de la contraseña no puede ser menor a 4");
  }

  if (contraseña2 != contraseña1 && !errores.includes("Las credenciales no coinciden. Ingrésalas de nuevo.") ) {
    errores.push("Las credenciales no coinciden. Ingrésalas de nuevo.");
  } else {
    errores = errores.filter((item) => item != "Las credenciales no coinciden. Ingrésalas de nuevo.");
  }

  console.log(errores);

  //Poner todos los errores en la vista
  const li_nombre = document.getElementById("error_nombre");
  const error_apellido = document.getElementById("error_apellido");
  const error_email = document.getElementById("error_email");
  const error_contrasena = document.getElementById("error_contrasena");
  const error_contrasenas = document.getElementById("error_contrasenas");

  li_nombre.innerHTML = "";
  error_apellido.innerHTML = "";
  error_email.innerHTML = "";
  error_contrasena.innerHTML = "";
  error_contrasenas.innerHTML = "";

  for (const error of errores) {
    if (error.toLowerCase().includes("nombre")) {
      li_nombre.innerHTML += `<li>${error}</li>`
    }

    if (error.toLowerCase().includes("apellido")) {
      error_apellido.innerHTML += `<li>${error}</li>`
    }

    if (error.toLowerCase().includes("email")) {
      error_email.innerHTML += `<li>${error}</li>`
    }
    if (error.toLowerCase().includes("contraseña")) {
      error_contrasena.innerHTML += `<li>${error}</li>`
    }
    if (error.toLowerCase().includes("credenciales")) {
      error_contrasenas.innerHTML += `<li>${error}</li>`
    }
  }

  //   if (!checkboxTerminos.checked) {
  //     alert("Debes aceptar los términos y condiciones para continuar.");
  //     event.preventDefault();
  //     return false;
  //   }

  return errores.length == 0;
}

function validarEmail(email) {
  const regex = /\b(?:[a-zA-Z0-9._%+-]+@gmail\.com|[a-zA-Z0-9._%+-]+@yahoo\.com|[a-zA-Z0-9._%+-]+@hotmail\.com)\b/;
  return regex.test(email);
}

function registrado() {
  if (validarFormulario()) {
    let valor = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email: document.getElementById("mail").value,
      contraseña: document.getElementById("contraseña").value,
    };

    localStorage.setItem("user", JSON.stringify(valor));

    // this.submit();
    window.location.href = "../../index.html";
  };

  const formulario = document.getElementById("register-form");
  const inputs = formulario.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", validarFormulario);
  }

  //   if (validarFormulario()) {
  //     window.location.href = "login.html";
  //   }
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("register-form");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    registrado();
  });
});
