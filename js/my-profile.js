let myDropzone;

document.addEventListener("DOMContentLoaded", () => {
   //Configuraciones para el elemento que sube archivos
   let dzoptions = {
    url: "/",
    autoQueue: false,
  };
  myDropzone = new Dropzone("div#file-upload", dzoptions);
  
  //cargo el email en el input - punto 1
  // si hago click en el email, se borra su contenido
  loadEmail();

  //cargo todos los datos del usuario en los correspondientes inputs - punto 3
  loadUser();

  //listener para que cuando el user seleccione una imagen, la misma
  //se visualize en el src del image
  loadImage();

  //Listener para el boton borrar
  const deleteBtn = document.getElementById("delete-img");
  deleteBtn.addEventListener("click", handleDelete);

  // listener del boton guardar xD
  const save_btn = document.getElementById("btn-guardar");
  save_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      saveChanges();
      alert("Guardado");
    }
    const formulario = document.getElementById("register-form");
    const inputs = formulario.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", validarFormulario);
    }
  });
  
});

const handleDelete = () => {
  //se "intercambian" las imagenes
  const imagePreview = document.getElementById("image-preview");
  imagePreview.src = "./img/profile.jpg";
  const user = JSON.parse(localStorage.getItem("user"));
  user.avatar = "./img/profile.jpg";
};

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
};

const loadImage = () => {
  const imagePreview = document.getElementById("image-preview");

  // checkeo si tengo imagen en el objeto usuario, si la tengo
  // la cargo
  const storedImage = JSON.parse(localStorage.getItem("user")).avatar;
  if (storedImage) {
    imagePreview.src = storedImage;
  }
};


const saveChanges = () => {
  //Agarro mi usuario del local storage
  const user = JSON.parse(localStorage.getItem("user"));

  //modifico mi usuario
  let first_name = document.getElementById("first_name").value;
  let second_name = document.getElementById("second_name").value;
  let first_lastname = document.getElementById("first_lastname").value;
  let second_lastname = document.getElementById("second_lastname").value;
  let phone_number = document.getElementById("phone_number").value;

  let imagePreview = user.avatar;
  if (myDropzone.files.length > 0) {
    imagePreview = myDropzone.files[0].dataURL;
  }
  // const imagePreview2 = document.getElementById("image-preview").src;

  //guardo mi imagen en el local storage
  user.nombre = first_name;
  user.second_name = second_name;
  user.first_lastname = first_lastname;
  user.second_lastname = second_lastname;
  user.phone = phone_number;
  user.avatar = imagePreview;

  //guardo mi usuario
  localStorage.setItem("user", JSON.stringify(user));
  loadImage();
  //guardar en la base de datos esta info??? XD
};

const validarFormulario = () => {
  const nombre = document.getElementById("first_name").value;
  const apellido = document.getElementById("first_lastname").value;
  const email = document.getElementById("email").value;

  let errores = [];
  const name_empty = "Nombre no puede estar vacio!";
  if (nombre == "" && !errores.includes(name_empty)) {
    errores.push(name_empty);
  } else {
    errores = errores.filter((item) => item != name_empty);
  }

  const name_long = "El largo del nombre no puede ser menor a 3";
  if (nombre.length < 3 && !errores.includes(name_long)) {
    errores.push(name_long);
  } else {
    errores = errores.filter((item) => item != name_long);
  }

  const lastname_empty = "Apellido no puede estar vacio!";
  if (apellido == "" && !errores.includes(lastname_empty)) {
    errores.push(lastname_empty);
  } else {
    errores = errores.filter((item) => item != lastname_empty);
  }

  const lastname_length = "El largo del apellido no puede ser menor a 3";
  if (apellido.length < 3 && !errores.includes(lastname_length)) {
    errores.push(lastname_length);
  } else {
    errores = errores.filter((item) => item != lastname_length);
  }

  const email_empty = "Email no puede estar vacio!";
  if (email == "" && !errores.includes(email_empty)) {
    errores.push(email_empty);
  } else {
    errores = errores.filter((item) => item != email_empty);
  }

  const email_length = "El largo del email no puede ser menor a 3";
  if (email.length < 3 && !errores.includes(email_length)) {
    errores.push(email_length);
  } else {
    errores = errores.filter((item) => item != email_length);
  }

  const email_type = "El email debe ser gmail, yahoo o hotmail";
  if (!validarEmail(email)) {
    errores.push(email_type);
  } else {
    errores = errores.filter((item) => item != email_type);
  }

  //Poner todos los errores en la vista
  const li_nombre = document.getElementById("error_nombre");
  const error_apellido = document.getElementById("error_apellido");
  const error_email = document.getElementById("error_email");

  li_nombre.innerHTML = "";
  error_apellido.innerHTML = "";
  error_email.innerHTML = "";

  //checkear los errrores
  for (const error of errores) {
    if (error.toLowerCase().includes("nombre")) {
      li_nombre.innerHTML += `<li>${error}</li>`;
    }

    if (error.toLowerCase().includes("apellido")) {
      error_apellido.innerHTML += `<li>${error}</li>`;
    }

    if (error.toLowerCase().includes("email")) {
      error_email.innerHTML += `<li>${error}</li>`;
    }
  }
  return errores.length == 0;
};

function validarEmail(email) {
  const regex =
    /\b(?:[a-zA-Z0-9._%+-]+@gmail\.com|[a-zA-Z0-9._%+-]+@yahoo\.com|[a-zA-Z0-9._%+-]+@hotmail\.com)\b/;
  return regex.test(email);
}
