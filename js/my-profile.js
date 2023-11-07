document.addEventListener("DOMContentLoaded", () => {
  //cargo el email en el input - punto 1
  // si hago click en el email, se borra su contenido
  loadEmail();

  //cargo todos los datos del usuario en los correspondientes inputs - punto 3
  loadUser();

  //listener para que cuando el user seleccione una imagen, la misma
  //se visualize en el src del image
  loadImage();

  // listener del boton guardar xD
  const save_btn = document.getElementById("btn-guardar");
  save_btn.addEventListener("click", saveChanges);
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
  const usuarioMail = JSON.parse(localStorage.getItem("user")).email;
  var email_input = document.getElementById("email");

  email_input.value = usuarioMail;

  // email_input.addEventListener("click", function () {
  //   if (email_input.value === usuarioMail) {
  //     email_input.value = "";
  //   }
  // });
};

const loadImage = () => {
  const fileInput = document.getElementById("formFile");
  const imagePreview = document.getElementById("image-preview");
  fileInput.addEventListener("change", function () {
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSrc = e.target.result;

        // //guardo mi imagen en el local storage
        // const user = JSON.parse(localStorage.getItem("user"));
        // user.avatar = imageSrc;
        // localStorage.setItem("user", JSON.stringify(user));

        // Muestro mi imagen en el html
        imagePreview.src = imageSrc;
      };

      reader.readAsDataURL(selectedFile);
    }
  });

  // checkeo si tengo imagen en el objeto usuario, si la tengo
  // la cargo
  const storedImage = JSON.parse(localStorage.getItem("user")).avatar;
  if (storedImage) {
    imagePreview.src = storedImage;
  }
};

const deleteBtn = document.getElementById("delete-img");
deleteBtn.addEventListener("click", () => {
  //se "intercambian" las imagenes
  const imagePreview = document.getElementById("image-preview");
  imagePreview.src = "./img/profile.jpg";
  const user = JSON.parse(localStorage.getItem("user"));
  user.avatar = "./img/profile.jpg";
  //guardo mi usuario
  localStorage.setItem("user", JSON.stringify(user));
});

const saveChanges = () => {
  //Agarro mi usuario del local storage
  const user = JSON.parse(localStorage.getItem("user"));

  //modifico mi usuario
  let first_name = document.getElementById("first_name").value;
  let second_name = document.getElementById("second_name").value;
  let first_lastname = document.getElementById("first_lastname").value;
  let second_lastname = document.getElementById("second_lastname").value;
  let phone_number = document.getElementById("phone_number").value;
  const imagePreview = document.getElementById("image-preview").src;

  //guardo mi imagen en el local storage
  user.nombre = first_name;
  user.second_name = second_name;
  user.first_lastname = first_lastname;
  user.second_lastname = second_lastname;
  user.phone = phone_number;
  user.avatar = imagePreview;

  //guardo mi usuario
  localStorage.setItem("user", JSON.stringify(user));

  //guardar en la base de datos esta info??? XD
};
