function alertError() {
  alert("La contraseña debe ser mayor a 6 caracteres");
}

function validarLogin() {
  const contraseña = document.getElementById("contraseña").value.trim();
  return true;
}

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validarLogin()) {
      async function postData() {
        // Default options are marked with *
        const response = await fetch("https://jap-commerce-backend.vercel.app/login", {
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
          body: JSON.stringify({
            email: document.getElementById("usuario").value,
            contrasena: document.getElementById("contraseña").value,
          }), // body data type must match "Content-Type" header
        });
        const { user } = await response.json(); // parses JSON response into native JavaScript objects
        console.log(user);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "../../index.html";
        } else {
          alert("Login incorrecto!")
        }
      }
      postData();

      // let valor = {
      //   email: document.getElementById("usuario").value.trim(),
      //   contraseña: document.getElementById("contraseña").value,
      // };

      // localStorage.setItem("user", JSON.stringify(valor));
      // window.location.href = "../../index.html";
    }
  });
