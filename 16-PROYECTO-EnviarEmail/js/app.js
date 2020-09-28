//Variables
const enviar = document.querySelector("#enviar");
const reset = document.querySelector("#resetBtn");
const emial = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

//
function eventListeners() {
  //Cuando la app arranca
  document.addEventListener("DOMContentLoaded", inicarApp);

  //Campos del formularios
  emial.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //Enviar Email
  enviar.addEventListener("click", enviarEmail);

  //Vaciar
  reset.addEventListener("click", limpiar);
}

//Inicia la app
function inicarApp() {
  enviar.disable = true;
  enviar.classList.add("cursor-not-allowed", "opacity-50");
}
//Valida el formulario
function validarFormulario(e) {
  console.log(e.target.value.length);
  if (e.target.value.length > 0) {
    //Elimina los errores
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    // e.target.style.borderColor = "red";
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("EL email no es valido");
    }
  }

  if (er.test(email.value) && asunto.value != "" && mensaje.value != "") {
    enviar.disable = false;
    enviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mb-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    // formulario.appendChild(mensajeError);
    formulario.insertBefore(mensajeError, document.querySelector(".mb-10"));
  }
}

function enviarEmail(e) {
  e.preventDefault();
  if (!enviar.disable) {
    const spiner = document.querySelector("#spinner");
    spiner.style.display = "flex";

    //despues de 3 segundo ocultar el spiner
    setTimeout(() => {
      spiner.style.display = "none";

      //Mensaje que dice que se envio correctamente
      const parrafo = document.createElement("p");
      parrafo.textContent = "El mensaje se Envio correctamente";
      parrafo.classList.add(
        "text-center",
        "my-10",
        "p-3",
        "bg-green-500",
        "text-white",
        "font-bold"
      );
      formulario.insertBefore(parrafo, spiner);

      setTimeout(() => {
        parrafo.remove();
        limpiar();
      }, 3000);
    }, 3000);
  }
}

function limpiar(e) {
  formulario.reset();
  inicarApp();
  email.classList.remove("border", "border-green-500");
  asunto.classList.remove("border", "border-green-500");
  mensaje.classList.remove("border", "border-green-500");
}
