document.addEventListener("DOMContentLoaded", () => {
  let isUserActive = `
  <li class="nav-item">
    <a class="nav-link" href="components/Login/login.html">Usuario</a>
  </li>`;

  const user = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  const cerrarSesion = () => {
    sessionStorage.removeItem("user");
  };

  if (user) {
    isUserActive = `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${parsedUser.email}
      </a>
      <ul class="dropdown-menu">
        <li class="nav-item"><a class="dropdown-item" id="cerrar" href="">Cerrar sesion</a></li>
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
      ${isUserActive}
    </ul>
  </div>
</div>
 `;

  document.getElementsByTagName("nav")[0].innerHTML = navbar;
  document.getElementById("cerrar").addEventListener("click", cerrarSesion);
});
