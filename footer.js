document.addEventListener("DOMContentLoaded", () => {
  const footer = ` 
<div class="container">
  <p class="float-end">
    <a href="#">Volver arriba</a>
  </p>
  <p>
    Este sitio forma parte de
    <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>
  </p>
</div>`;

  document.getElementsByTagName("footer")[0].innerHTML = footer;
});
