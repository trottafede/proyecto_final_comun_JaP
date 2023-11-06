
/*
function changePfp() {
  const newPfp = document.getElementById("formFile").value;
  console.log(newPfp);
  localStorage.setItem("profile", newPfp);
}



<!-- Boton para editar pfp -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Editar foto de perfil
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
            <label for="formFile" class="form-label" id="pfp">Elegir nueva foto de perfil</label>
            <input class="form-control" type="file" id="formFile">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



*/

document.addEventListener("DOMContentLoaded", () => {
  loadEmail();
  loadUser();
  loadPfp();
});

const loadUser = () => {
  // Crear o agarrar local storage para el user asi cargo los datos inicialmente
  let user = JSON.parse(localStorage.getItem("user")) || undefined;

  // si existe usuario guardado lo muestro en pantalla
  if (user) {

    //agarro todos los inputs para modificar los valores
    let first_name = document.getElementById("first_name");
    let second_name = document.getElementById("second_name");
    let first_lastname = document.getElementById("first_lastname");
    let second_lastname = document.getElementById("second_lastname");
    let phone_number = document.getElementById("phone_number");


    // modifico los valores de los inputs
    first_name.value = user.nombre;
    second_name.value = user.second_name || "";
    first_lastname.value = user.apellido;
    second_lastname.value = user.second_lastname || "";
    phone_number.value = user.phone || "";
  }
};

const loadEmail = () => {
  var usuarioMail = JSON.parse(localStorage.getItem("user"));
  email = usuarioMail.email;
  var input = document.getElementById("email");

  input.value = email;

  input.addEventListener("click", function () {
    if (input.value === email) {
      input.value = "";
    }
  });
};

const fileInput = document.getElementById("formFile");
const imagePreview = document.getElementById("image-preview");
fileInput.addEventListener("change", function () {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageSrc = e.target.result;
      localStorage.setItem("imageData", imageSrc);
      imagePreview.src = imageSrc;
    };
    
    reader.readAsDataURL(selectedFile);
  }
});

const storedImage = localStorage.getItem("imageData");
if (storedImage) {
  imagePreview.src = storedImage;
}

/*
function loadPfp(){
    const pfp = localStorage.getItem("profile");
    if (pfp){
        
    }
}
*/