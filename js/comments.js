// Obtener el ID del producto y el usuario desde el almacenamiento local
const commentID = localStorage.getItem("prodID");
const user = localStorage.getItem("user");
const userParse = JSON.parse(user);
const apiComments =
  "https://jap-commerce-backend.vercel.app/products_comments/" +
  commentID +
  ".json";

// Inicializar un objeto para almacenar los comentarios
let comentarios = {};

// Verificar si hay datos guardados con el localStorage
const storedComments = localStorage.getItem("comments");
if (storedComments) {
  comentarios = JSON.parse(storedComments);
}

const comentBtn = document.getElementById("botonCmt");
// Inicializar una variable para almacenar la calificación seleccionada por el usuario
let selectedRating = 0;

document.addEventListener("DOMContentLoaded", async () => {
  getRating();

  comentBtn.addEventListener("click", function (event) {
    event.preventDefault();
    handleSendComment();
    showProductInfo();
  });

  // Cargar datos de la API solo una vez para que no se repitan
  if (!comentarios[commentID]) {
    const commentsDeArchivo = await fetch(apiComments);
    const commentsDeArchivoData = await commentsDeArchivo.json();
    comentarios[commentID] = commentsDeArchivoData;
    refreshStorage();
  }

  const comentariosDelProducto = comentarios[commentID] || [];
  showAllComments(commentID);
  // Obtener la fecha y hora actual para registrar en el comentario
  const fechaHora = new Date();
  const año = fechaHora.getFullYear();
  const mes = String(fechaHora.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaHora.getDate()).padStart(2, "0");
  const hora = String(fechaHora.getHours()).padStart(2, "0");
  const minutos = String(fechaHora.getMinutes()).padStart(2, "0");
  const segundos = String(fechaHora.getSeconds()).padStart(2, "0");
  const formatoFechaHora = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

  // Manejar el envío de un comentario
  const handleSendComment = () => {
    const enviarBtn = document.getElementsByName("comentarios")[0].value; // const enviarBtn = document.getElementById("btnComent").value;

    var jsonString = user;
    var objeto = JSON.parse(jsonString);

    if (enviarBtn !== "") {
      const comentarioLocal = {
        product: commentID,
        score: selectedRating, //puntuacion del producto
        description: enviarBtn,
        user: userParse.nombre + userParse.apellido,
        dateTime: formatoFechaHora,
      };

      comentarios[commentID] = comentarios[commentID] || [];
      comentarios[commentID].unshift(comentarioLocal);

      // Actualizar el almacenamiento local con los comentarios actualizados
      refreshStorage(commentID);

      // Mostrar todos los comentarios, incluido el nuevo
      showAllComments(commentID);

      // Limpiar el campo de entrada de comentarios
      document.getElementById("btnComent").value = "";
    } else alert("Comentario vacío");
  };

  // Función para mostrar todos los comentarios en la página
  function showAllComments(commentID) {
    const allComments = comentarios[commentID] || [];
    let boxComments = "";

    for (const [index, comment] of allComments.entries()) {
      const uniqueID = `comment-${index}`; // Genera un identificador único
      boxComments += `
      <div id="comentarios">
        <strong>${comment.user}</strong> ${comment.dateTime}
        <p style="margin:0">${estrellas(comment.score)}</p>
        <div id="${uniqueID}">
            <p>${comment.description}</p>
        </div>
      </div>
      `;

      /*
       */
    }

    document.getElementById("comments").innerHTML = boxComments; // Actualiza el contenido HTML para mostrar todos los comentarios
  }
});

// Capturar la calificación seleccionada por el usuario
const getRating = () => {
  const ratingInputs = document.querySelectorAll('input[type="radio"]');
  ratingInputs.forEach((input) => {
    input.addEventListener("change", function () {
      selectedRating = this.value; // Actualiza la calificación seleccionada cuando cambia el botón de radio
    });
  });
};

function estrellas(cantidad) {
  let scoreTotal = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= cantidad) {
      scoreTotal += '<i class="fa fa-star checked"></i>'; //Genera estrellas rellenas segun la cantidad de estrellas seleccionadas
    } else {
      scoreTotal += '<i class="fa fa-star"></i>'; // Genera estrellas vacias para las no seleccionadas
    }
  }
  return scoreTotal;
}

// Actualiza el localStorage con la lista de comentarios
const refreshStorage = () => {
  localStorage.setItem("comments", JSON.stringify(comentarios));
};
