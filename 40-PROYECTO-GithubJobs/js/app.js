const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const busqueda = document.querySelector("#busqueda");

window.onload = () => {
  formulario.addEventListener("submit", validarBuscar);
};

function validarBuscar(e) {
  e.preventDefault();
  if (busqueda.value === "") {
    mostrarMensaje("No puede quedar el campo vacio");
    return;
  }

  //Consultar API
  consultarAPI(busqueda.value);
}

function mostrarMensaje(mensaje) {
  const alerta = document.createElement("div");
  const mensajePrevio = document.querySelector(".mensaje");
  if (!mensajePrevio) {
    alerta.classList.add(
      "bg-gray-100",
      "p-3",
      "text-center",
      "mt-3",
      "mensaje"
    );
    alerta.textContent = mensaje;
    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function consultarAPI(busqueda) {
  const githubURL = `https://jobs.github.com/positions.json?search=${busqueda}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    githubURL
  )}`;
  axios
    .get(url)
    .then((response) => mostrarVacante(JSON.parse(response.data.contents)));
}

function mostrarVacante(vacantes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  if (vacantes.length > 0) {
    resultado.classList.add("grid");

    vacantes.forEach((element) => {
      const { company, title, type, url } = element;
      resultado.innerHTML += `
    
      <div class="shadow bg-white p-6 rounded">
      <h2 class="text-2xl font-light mb-4">${title}</h2>
      <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
      <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
      <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}" target="_blank" rel="nooponer noreferrer">Ver Vacante</a>
  </div>

      `;
    });
  } else {
    const noResultado = document.createElement("p");
    noResultado.classList.add(
      "text-center",
      "mt-10",
      "text-gray-600",
      "w-full"
    );
    resultado.classList.remove("grid");
    noResultado.textContent =
      "No hay vacantes, intente con otro termino de busqueda.";
    resultado.appendChild(noResultado);
  }
}
