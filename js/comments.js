const commentID = localStorage.getItem("prodID");
const user = localStorage.getItem("user");
const apiComments = "https://japceibal.github.io/emercado-api/products_comments/" + commentID + ".json";
let comentarios = {};

// Verificar si hay datos guardados con el localStorage
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

    // Cargar datos de la API solo una vez para que no se repitan
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
        const estrellasValor = document.getElementById("estrellas").value;
        
        var jsonString = user;
        var objeto = JSON.parse(jsonString);

        if (enviarBtn !== '') {
            const comentarioLocal = {
                product: commentID,
                score: estrellasValor, //puntuacion del producto
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
    
        for (const [index, comment] of allComments.entries()) {
            const uniqueID = `comment-${index}`; // Genera un identificador único
    
            boxComments += `
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item ">
                        <h2 class="accordion-header ">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${uniqueID}" aria-expanded="true" aria-controls="${uniqueID}">
                                ${comment.user}  ${comment.dateTime}
                            </button>
                        </h2>
                        <div id="${uniqueID}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">${estrellas(comment.score)} ${comment.description}</div>
                        </div>
                    </div>
                </div>
            `;
        }
    
        document.getElementById("comments").innerHTML = boxComments;
    }
});

    function estrellas(cantidad) {
        let scoreTotal = '';

        for (let i = 1; i <= 5; i++) {
            if(i<=cantidad){
                scoreTotal += '<span class="fa fa-star checked"></span>';
            }
            else{ 
                scoreTotal += '<span class="fa fa-star"></span>';        
            }
        
    }
        return scoreTotal;
    }



