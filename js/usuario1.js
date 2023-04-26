var usuarios = [];

function cargarUsuario() {
  const str_usuarios = localStorage.getItem("usuarios");
  usuarios = JSON.parse(str_usuarios); //recuperar los usuarios y convertirlos de string a JSON
  if (usuarios == null) {
    usuarios = [];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
  listarUsuarios();
}

function agregarUsuario() {
  const nombre = document.getElementById("usuarioNombre").value;
  const apellido = document.getElementById("usuarioApellido").value;
  const email = document.getElementById("usuarioEmail").value;
  const usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
  };
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  $("#modalAgregar").modal("hide");
  limpiarFormulario();
  listarUsuarios();
}

function editarUsuario() {
  const nombre = document.getElementById("usuarioNombreEditar").value;
  const apellido = document.getElementById("usuarioApellidoEditar").value;
  const email = document.getElementById("usuarioEmailEditar").value;
  const usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
  };
  const indice = usuarios.findIndex((elemento) => elemento.email === email);
  usuarios[indice] = usuario;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  $("#modalEditar").modal("hide");
  listarUsuarios();
}

function eliminarUsuarios(email) {
  const indice = usuarios.findIndex((elemento) => elemento.email === email);
  usuarios.splice(indice, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  listarUsuarios();
}

function listarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";
  usuarios.forEach((elemento) => {
    const item = document.createElement("li");
    item.innerHTML = elemento.nombre + " " + elemento.apellido + " " + elemento.email;
    let botonEditar = document.createElement("button");
    botonEditar.classList.add("btn", "btn-primary", "me-2");
    botonEditar.setAttribute("data-bs-toggle", "modal");
    botonEditar.setAttribute("data-bs-target", "#modalEditar");
    botonEditar.addEventListener("click", function () {
      obtenerUsuario(elemento.email);
    });
    botonEditar.innerHTML = "Editar";
    let botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger", "ms-2");
    botonEliminar.addEventListener("click", function () {
      eliminarUsuarios(elemento.email);
    });
    botonEliminar.innerHTML = "Eliminar";
    item.appendChild(botonEditar);
    item.appendChild(botonEliminar);
    lista.appendChild(item);
  });
}

function obtenerUsuario(email) {
  const usuario = usuarios.find((elemento) => elemento.email === email);
  $("#usuarioNombreEditar").val(usuario.nombre);
  $("#usuarioApellidoEditar").val(usuario.apellido);
  $("#usuarioEmailEditar").val(usuario.email);
  return usuario;
}

function limpiarFormulario() {
  document.getElementById("usuarioNombre").value = "";
  document.getElementById("usuarioApellido").value = "";
  document.getElementById("usuarioEmail").value = "";
}

// al cargar la página se carga la lista de usuarios desde localstorage
$(document).ready(function () {
  cargarUsuario();
});
