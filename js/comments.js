const commentID = localStorage.getItem("prodID");
const user = localStorage.getItem("user");
const apiComments = "https://japceibal.github.io/emercado-api/products_comments/" + commentID + ".json";
let comentarios = {};

// Cargar comentarios desde localStorage si existen
const storedComments = localStorage.getItem("comments");
if (storedComments) {
    comentarios = JSON.parse(storedComments);
}

const comentBtn = document.getElementById("botonCmt");

document.addEventListener("DOMContentLoaded", async () => {
    comentBtn.addEventListener("click", function (event) {
        event.preventDefault();
        handleSendComment();
    })

    // Cargar comentarios desde la API solo si no existen en los comentarios locales
    if (!comentarios[commentID]) {
        const commentsDeArchivo = await fetch(apiComments);
        const commentsDeArchivoData = await commentsDeArchivo.json();
        comentarios[commentID] = commentsDeArchivoData;
    }

    const comentariosDelProducto = comentarios[commentID] || [];
    showAllComments(commentID);

    const fechaHora = new Date();
    const año = fechaHora.getFullYear();
    const mes = String(fechaHora.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaHora.getDate()).padStart(2, "0");
    const hora = String(fechaHora.getHours()).padStart(2, "0");
    const minutos = String(fechaHora.getMinutes()).padStart(2, "0");
    const segundos = String(fechaHora.getSeconds()).padStart(2, "0");
    const formatoFechaHora = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    const handleSendComment = () => {
        const enviarBtn = document.getElementById("btnComent").value;
        var jsonString = user;
        var objeto = JSON.parse(jsonString);

        if (enviarBtn !== '') {
            const comentarioLocal = {
                product: commentID,
                score: 5,
                description: enviarBtn,
                user: objeto.email,
                dateTime: formatoFechaHora
            };

            comentarios[commentID] = comentarios[commentID] || [];
            comentarios[commentID].push(comentarioLocal);

            refreshStorage(commentID);
            showAllComments(commentID);

            document.getElementById("btnComent").value = "";
        } else
            alert("Comentario vacío");
    };

    const refreshStorage = () => {
        localStorage.setItem("comments", JSON.stringify(comentarios));
    };

    function showAllComments(commentID) {
        const allComments = comentarios[commentID] || [];

        let boxComments = "";
        for (const comment of allComments) {
            boxComments += `
        <div>
            <h5>${comment.user}-${comment.dateTime}</h5>
            <p>${comment.description}</p>
        </div>
        `;
        }

        document.getElementById("comments").innerHTML = boxComments;
    }
});
