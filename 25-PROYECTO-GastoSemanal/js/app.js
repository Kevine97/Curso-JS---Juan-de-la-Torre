//Variables Y selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

//Eventos

evenlisteners();
function evenlisteners() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", agregarGatos);
}
//Clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").innerHTML = restante;
  }

  imprimirAlert(mensaje, tipo) {
    //Crear el div

    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
        
      divMensaje.classList.add("alert-danger");
      borrar() ;
    } else {
      divMensaje.classList.add("alert-success");
    }

    //Mensaje de Error
    divMensaje.textContent = mensaje;
    //Insertar en el html
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    //Quitarloo

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}
//Instanciar
const ui = new UI();
let presupuesto;
//Funcionesb
function preguntarPresupuesto() {
  const prepuestoUsuario = prompt("¿Cual es tu presupuesto?");

  if (
    prepuestoUsuario === "" ||
    prepuestoUsuario === null ||
    isNaN(prepuestoUsuario) ||
    prepuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(prepuestoUsuario);
  ui.insertarPresupuesto(presupuesto);
  //console.log(presupuesto);
}

//Añadir gatos

function agregarGatos(e) {
  e.preventDefault();

  //leer los datos del formulario
  const nombre = document.querySelector("#gasto").value;
  const cantidad = document.querySelector("#cantidad").value;

  //Validar
  if (nombre === "" || cantidad === "") {
    
    ui.imprimirAlert("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlert("Cantidad no valida", "error");
    return;
  }
}

function borrar() {
    const mensajeError = document.querySelectorAll(".alert-danger");
    if (mensajeError.length>0) {
      const error = document.querySelector(".alert-danger");
      error.remove();
    }
  }
  
