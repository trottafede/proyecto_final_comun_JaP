document.addEventListener("DOMContentLoaded", () => {
  let isUserActive = `
  <li class="nav-item">
    <a class="nav-link" href="components/Login/login.html">Usuario</a>
  </li>`;

  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  if (user) {
    isUserActive = `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${parsedUser.email}
      </a>
      <ul class="dropdown-menu dark_mode">
        <li class="nav-item"><a class="dropdown-item" href="./my-profile.html"><i class="fa-solid fa-user"></i> Mi Perfil</a></li>
        <li class="nav-item"><a class="dropdown-item" href="./cart.html"><i class="fa-solid fa-cart-shopping"></i> Mi Carrito</a></li>
        <li class="nav-item"><a class="dropdown-item" href="/" id="cerrar" ><i class="fa-solid fa-circle-xmark"></i> Cerrar sesion</a></li>
        <li class="nav-item"><div class="center_dark_mode"><input id="toggle_dark_mode" type="checkbox" class="theme-checkbox"></div></li>
      </ul>
    </li>`;
  }
  
  const navbar = `<div class="container">
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    JaPCommerce
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav w-100 justify-content-between">
      <li class="nav-item">
        <a class="nav-link active" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="categories.html">Categorías</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <div id="usuarioBack">
      ${isUserActive}
      </div>
    </ul>
  </div>
</div>
 `;

  document.getElementsByTagName("nav")[0].innerHTML = navbar;
  document.getElementById("cerrar").addEventListener("click", cerrarSesion);
  document.getElementById("toggle_dark_mode").addEventListener("change", handleDarkMode);
  checkDarkMode();
});

const cerrarSesion = () => {
  localStorage.removeItem("user");
};

const handleDarkMode = () => {
  if (document.getElementById("toggle_dark_mode").checked) {
    localStorage.setItem("theme", "dark"); // Guarda el tema en el almacenamiento local
    const elementsWithDarkMode = document.querySelectorAll(".light_mode");
    // Itera a través de los elementos y quita la clase "dark_mode"
    elementsWithDarkMode.forEach((element) => {
      element.classList.remove("light_mode");
      element.classList.add("dark_mode");
    });
    
  } else {
    localStorage.setItem("theme", "light"); // Guarda el tema en el almacenamiento local
    const elementsWithDarkMode = document.querySelectorAll(".dark_mode");
    // Itera a través de los elementos y quita la clase "dark_mode"
    elementsWithDarkMode.forEach((element) => {
      element.classList.remove("dark_mode");
      element.classList.add("light_mode");    
    });
  }
};

const checkDarkMode = () => {
  // Verifica si hay un tema guardado en el local storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.getElementById("toggle_dark_mode").checked = true; // Marca el checkbox si el tema es oscuro
  } else {
    document.getElementById("toggle_dark_mode").checked = false; // Marca el checkbox si el tema es oscuro
  }
  handleDarkMode()
};
// en desktop quedo divino, en mobile ni lo mires jaja