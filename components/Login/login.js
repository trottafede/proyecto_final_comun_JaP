function alertError() {
  alert("La contraseña debe ser mayor a 6 caracteres");
}

function validarLogin() {
  const contraseña = document.getElementById("contraseña").value.trim();

  if (contraseña.length < 6) {
    alertError();
    return false;
  }
  return true;
}

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validarLogin()) {
      let valor = {
        email: document.getElementById("usuario").value.trim(),
        contraseña: document.getElementById("contraseña").value,
      };

      sessionStorage.setItem("user", JSON.stringify(valor));

      this.submit();
      window.location.href = "../../index.html";
    }
  });
