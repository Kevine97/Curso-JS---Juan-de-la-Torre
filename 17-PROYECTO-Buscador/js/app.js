//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//Conetenedor para los resultados
const resultado = document.querySelector("#resultado");

//año maximo
const max = new Date().getFullYear();
const min = max - 10; //Año minimo

//Generar un objeto de busqueda
const datosBusquedas = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};
//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAuto(autos); //Muestra los auto al cargara

  //Llena los años
  llenarSelect();
});

//Evenlistener para los select de busqueda
marca.addEventListener("change", (e) => {
  datosBusquedas.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  datosBusquedas.year = e.target.value;
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusquedas.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusquedas.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusquedas.puertas = e.target.value;
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datosBusquedas.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusquedas.color = e.target.value;
  filtrarAuto();
});

//Muestra los autos del objeto
function mostrarAuto(autos) {
  limpiarHTML(); //Elimina el HMTL previo
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autosHtml = document.createElement("p");
    autosHtml.textContent = `
        Marca: ${marca} - Modelo: ${modelo} - Año: ${year} - Puertas: ${puertas} - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        
    `;

    resultado.appendChild(autosHtml);
    resultado.style.display = "none";
  });
}

//Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Llena el formulario de año

function llenarSelect() {
  for (let index = max; index >= min; index--) {
    const opcion = document.createElement("option");
    opcion.value = index;
    opcion.textContent = index;
    year.appendChild(opcion);
  }
}
//Funcion que filtr en vace a la busqueda
function filtrarAuto() {
  const resultado1 = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  if (resultado1.length) {
    mostrarAuto(resultado1);
    resultado.style.display = "block";
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados";
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  if (datosBusquedas.marca) {
    return auto.marca === datosBusquedas.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusquedas.year) {
    return auto.year === parseInt(datosBusquedas.year);
  }
  return auto;
}

function filtrarMinimo(auto) {
  if (datosBusquedas.minimo) {
    return auto.precio >= parseInt(datosBusquedas.minimo);
  }
  return auto;
}
function filtrarMaximo(auto) {
  if (datosBusquedas.maximo) {
    return auto.precio <= parseInt(datosBusquedas.maximo);
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusquedas.puertas) {
    return auto.puertas === parseInt(datosBusquedas.puertas);
  }
  return auto;
}
function filtrarTransmision(auto) {
  if (datosBusquedas.transmision) {
    return auto.transmision === datosBusquedas.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusquedas.color) {
    return auto.color === datosBusquedas.color;
  }
  return auto;
}
