const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //Validar

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || ciudad === "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }

  //Consultar API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".alerta");
  const alert = document.createElement("div");
  if (!alerta) {
    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-wd",
      "mx-auto",
      "mt-6",
      "text-center",
      "alerta"
    );

    alert.innerHTML = `
    
      <strong class="font-bold">Error</strong>
      <span class="block">${mensaje}</span>
    `;

    container.appendChild(alert);

    //Eliminar alerta

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const apiKEY = "8a0012897ad6b7ca9e7fdc4a07e3052d";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKEY}`;

 

  fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      console.clear();
      console.log(response);
      if (response.cod == "404") {
        mostrarError("Ciudad incorrecta");
        return;
      }
      spiner();
      //Imprime la respuesta en el HTML
      mostrarCLima(response);
    });
}

function mostrarCLima(response) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = response;

  setTimeout(() => {
    limpiarHTML();
    const centigrados = parseInt(temp - 273.15);
    const Max = parseInt(temp_max - 273.15);
    const Min = parseInt(temp_min - 273.15);
  
    const nombreCiudad = document.createElement("p");
    nombreCiudad.innerHTML = `Clima en <strong>${name} </strong>`;
    nombreCiudad.classList.add("font-bold", "text-2xl");
  
    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");
  
    const Maxima = document.createElement("p");
    Maxima.innerHTML = `Max: ${Max} &#8451; `;
    Maxima.classList.add("text-xl");
  
    const Minima = document.createElement("p");
    Minima.innerHTML = `Min: ${Min} &#8451;`;
    Minima.classList.add("text-xl");
  
    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(Maxima);
    resultadoDiv.appendChild(Minima);
    resultado.appendChild(resultadoDiv);
  }, 2000);

}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spiner() {
  limpiarHTML();
  const spiner = document.createElement("div");
  spiner.classList.add("sk-cube-grid");
  spiner.innerHTML = `
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
`;

  resultado.appendChild(spiner);
}
