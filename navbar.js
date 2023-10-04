document.addEventListener("DOMContentLoaded", () => {
  let isUserActive = `
  <li class="nav-item">
    <a class="nav-link" href="components/Login/login.html">Usuario</a>
  </li>`;
  
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  const cerrarSesion = () => {
    localStorage.removeItem("user");
  };

  
  if (user) {
    isUserActive = `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${parsedUser.email}
      </a>
      <ul class="dropdown-menu">
        <li class="nav-item"><a class="dropdown-item" href="./my-profile.html"><i class="fa-solid fa-user"></i> Mi Perfil</a></li>
        <li class="nav-item"><a class="dropdown-item" href="./cart.html"><i class="fa-solid fa-cart-shopping"></i> Mi Carrito</a></li>
        <li class="nav-item"><a class="dropdown-item" href="/" id="cerrar" ><i class="fa-solid fa-circle-xmark"></i> Cerrar sesion</a></li>
      </ul>
      <div id="caja-check">
        <input type="checkbox" class="theme-checkbox">
      </div>
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
      <div id="usuarioBack">
      ${isUserActive}
      </div>
    </ul>
  </div>
</div>
 `;

  document.getElementsByTagName("nav")[0].innerHTML = navbar;
  document.getElementById("cerrar").addEventListener("click", cerrarSesion);
});

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('#caja-check .theme-checkbox');
  const body = document.body;

  // Verifica si hay un tema guardado en el local storage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.style.transition = 'background-color 0.3s, color 0.3s'; 
    body.style.backgroundColor = '#0f0f0f';
    body.style.color = '#ffffff';
    themeToggle.checked = true; // Marca el checkbox si el tema es oscuro
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.style.transition = 'background-color 0.3s, color 0.3s'; 
      body.style.backgroundColor = '#0f0f0f'; 
      body.style.color = '#ffffff'; 
      localStorage.setItem('theme', 'dark'); // Guarda el tema en el almacenamiento local
    } else {
      body.style.transition = 'background-color 0.3s, color 0.3s'; 
      body.style.backgroundColor = '#ffffff'; 
      body.style.color = 'black';
      localStorage.setItem('theme', 'light'); // Guarda el tema en el almacenamiento local
    }
  });
});



