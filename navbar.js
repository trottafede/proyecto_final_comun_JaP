document.addEventListener("DOMContentLoaded", () => {
  let isUserActive = `
  <li class="nav-item">
    <a class="nav-link" href="./login.html">Usuario</a>
  </li>`;

  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  if (user) {
    //Si hay un ususario activo agrega el mail al navbar
    isUserActive = `
    <li  class="nav-item dropdown d-md-block d-lg-block d-none">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${parsedUser.email}
      </a>
      <ul id="options_drop" class="dropdown-menu dark_mode">
        <li class="nav-item"><a class="dropdown-item" href="./my-profile.html"><i class="fa-solid fa-user"></i> Mi Perfil</a></li>
        <li class="nav-item"><a class="dropdown-item" href="./cart.html"><i class="fa-solid fa-cart-shopping"></i> Mi Carrito</a></li>
        <li class="nav-item"><hr></li>
        <li class="nav-item"><a class="dropdown-item" href="./nosotros.html"><i class="fa-solid fa-users"></i> Nosotros</a></li>
        <li class="nav-item"><a class="dropdown-item" href="./login.html" id="cerrar" ><i class="fa-solid fa-circle-xmark"></i> Cerrar sesion</a></li>
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
        <a class="nav-link active" href="./index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./categories.html">Categorías</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./sell.html">Vender</a>
      </li>
     
      <li class="nav-item d-md-none d-lg-none d-xl-none">
        <hr>
      </li>

      <li class="nav-item d-md-none d-lg-none d-xl-none"><a class="nav-link" href="./cart.html"><i class="fa-solid fa-cart-shopping"></i> Mi Carrito</a></li>
      <li class="nav-item d-md-none d-lg-none d-xl-none"><a class="nav-link" href="./my-profile.html"><i class="fa-solid fa-user"></i> Mi perfil</a></li>

      <li class="nav-item">
        <label class="switch">
        <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
        <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
        <input id="toggle_dark_mode" type="checkbox" class="input">
        <span class="slider"></span>
      </label>
      </li>

      <li class="nav-item d-md-none d-lg-none d-xl-none">
        <hr>
      </li>
      
      <li class="nav-item d-md-none d-lg-none d-xl-none"><a class="nav-link" href="./login.html" id="cerrar-mobile" ><i class="fa-solid fa-circle-xmark"></i> Cerrar sesion</a></li>
        ${isUserActive}
      </div>
    </ul>
  </div>
</div>`;
  document.getElementsByTagName("nav")[0].innerHTML = navbar;
  document.getElementById("cerrar").addEventListener("click", cerrarSesion);
  document.getElementById("cerrar-mobile").addEventListener("click", cerrarSesion);
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
//no borrrar --> // en desktop quedo divino, en mobile ni lo mires jaja