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

  nuevoGatos(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
   
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (total, gastos) => total + gastos.cantidad,
      0
    );

    this.restante = this.presupuesto - gastado;
    console.log(this.restante);
  }

  eliminarGato(id) {
    this.gastos = this.gastos.filter(gasto => gasto.id !== id);
    console.log(this.gastos);
    this.calcularRestante();
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
      borrar();
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
  mostrarGatos(gastos) {
    this.limparHTML();

    //Iteramos los gatos
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      //Crear un LI
      const nuevoGato = document.createElement("li");
      nuevoGato.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGato.dataset.id = id;

      //Agregar un HTML del gasto
      nuevoGato.innerHTML = `
      ${nombre} <span class="badge badge-primary badge-pill">$${cantidad}</span>
      `;
      //Boton para borrar el gasto
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      btnBorrar.innerHTML = "Borrar";
      btnBorrar.onclick = () => {
        eliminarGato(id);
      };
      nuevoGato.appendChild(btnBorrar);
      //Agregar al HTML
      gastoListado.appendChild(nuevoGato);
    });
  }
  limparHTML() {
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(restante) {
    document.querySelector("#restante").textContent = restante;
  }

  comprobarPresupuesto(presupuestoOBJ) {
    const { presupuesto, restante } = presupuestoOBJ;
    const restanteDiv = document.querySelector("div.restante");
    //Comprobar 25%

    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-warning");
      restanteDiv.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-danger");
      restanteDiv.classList.add("alert-warning");
    } else {
      restanteDiv.classList.remove("alert-danger", "alert-warning");
      restanteDiv.classList.add("alert-success");
    }

    if (restante <= 0) {
      ui.imprimirAlert("El presupuesto se ha agotado", "error");
      formulario.querySelector('button[type="submit"]').disabled = true;
    }else if (restante>=0){
      formulario.querySelector('button[type="submit"]').disabled = false;
    }

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
  const cantidad = Number(document.querySelector("#cantidad").value);

  //Validar
  if (nombre === "" || cantidad === "") {
    ui.imprimirAlert("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlert("Cantidad no valida", "error");
    return;
  }

  //Generar Un obejto de tipo gasto

  const gasto = { nombre, cantidad, id: Date.now() };
  presupuesto.nuevoGatos(gasto);
  ui.imprimirAlert("Gasto agregado correctamente ");
  const { gastos, restante } = presupuesto;
  ui.mostrarGatos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
  formulario.reset();
}

function borrar() {
 /* const mensajeError = document.querySelectorAll(".alert-danger");
  const mensajeSuccess = document.querySelectorAll(".alert-success");
  if (mensajeError.length > 0) {
    const error = document.querySelector(".alert-danger");
    error.remove();
  }*/
}

function eliminarGato(id) {
  presupuesto.eliminarGato(id);
 const { gastos, restante } = presupuesto;
  ui.mostrarGatos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
}
