//Constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

//Reliza la contizacion con los datos

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  let base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;

    default:
      break;
  }

  //Leer el año
  const diferenca = new Date().getFullYear() - this.year;
  //Cada año la diferencia es manor y el costo va a reducirce el
  cantidad -= (diferenca * 3 * cantidad) / 100;

  if ((this.tipo = "basico")) {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  return cantidad;
};

function UI() {}

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 10;

  const selectYear = document.querySelector("#year");

  for (let index = max; index >= min; index--) {
    let opcion = document.createElement("option");
    opcion.value = index;
    opcion.textContent = index;
    selectYear.appendChild(opcion);
  }
};

//Muestr alertas en pantalla
UI.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");
  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;
  //Insertar en el HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  //Limpiara el mensaje

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {
  //Crear resultado
  const div = document.createElement("div");
  div.classList.add("mt-10");

  div.innerHTML = `
    <p class="header" > Tu Resumen </p>
    <p class="font-bold">Marca: <span class="font-normal"> ${seguro.marca}</span></p> 
    <p class="font-bold">Año: <span class="font-normal"> ${seguro.year}</span></p> 
    <p class="font-bold">Seguro: <span class="font-normal"> ${seguro.tipo}</span></p> 
    <p class="font-bold">Total: <span class="font-normal"> $${total}</span></p> 
  `;
  const resultadoDiv = document.querySelector("#resultado");

  //Mostrar el Spiner
  const spiner = document.querySelector("#cargando");
  spiner.style.display = "block";

  setTimeout(() => {
    spiner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);
};
//Instanciar UI
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  //LLena el select con los años
  ui.llenarOpciones();
});

evenlisteners();

function evenlisteners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();
  //Leer la marca seleccionada
  const marca = document.querySelector("#marca").value;
  //Leer el año seleccionado
  const year = document.querySelector("#year").value;
  //Leer tipo de cobertura
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    borrar();
    return;
  }

  ui.mostrarMensaje("Calculando...", "exito");
  
  //Ocultar las cotizaciones previas
  const resultado = document.querySelector("#resultado div");
  if (resultado != null) {
    resultado.remove();
  }
  //Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();
  ui.mostrarResultado(total, seguro);
}

function borrar() {
  const mensajeError = document.querySelectorAll(".error");
  if (mensajeError.length>1) {
    const error = document.querySelector("div.error");
    error.remove();
  }
}
