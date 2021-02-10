const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const terminoBusqueda = document.querySelector("#termino");
const paginacionDiv = document.querySelector("#paginacion");
const registroPagina = 40;
let paginaActual = 1;
let totalPagina;
let iterador;
window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  if (terminoBusqueda.value === "") {
    mostrarAlerta("Agrega un termino de busqueda");
    return;
  }

  //Si pasa la validacion buscamos las imagenes
  buscarImagenes();
}

//Generador que va a registrar la cantidad de elementos de acuerdo a las paginas

function* crearPaginador(total) {
  for (let index = 1; index <= total; index++) {
    yield index;
  }
}

function mostrarAlerta(mensaje) {
  const alerta = document.createElement("p");
  const validar = document.querySelector(".validar");

  if (!validar) {
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "validar"
    );

    alerta.innerHTML = ` <Strong class="bold"> ¡Advertencia!  </Strong>
      <span class="block sm:inline">${mensaje}</span>
      `;

    formulario.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes() {
  const key = "20026725-bf4af1fcd702ef3ca8dd9c04c";
  const termino = document.querySelector("#termino").value;
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPagina}&page=${paginaActual}`;

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      totalPagina = CalcularPagina(res.totalHits);
      console.log(totalPagina);
      mostrarImagenes(res.hits);
    });
}

function mostrarImagenes(res) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  if (res.length === 0) {
    while (paginacionDiv.firstChild) {
      paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
    mostrarAlerta("No se encontro la imagen solicitada");
    return;
  }

  res.forEach((imagen) => {
    const {
      previewURL,
      likes,
      views,
      largeImageURL,
      downloads,
      comments,
    } = imagen;

    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w1/4 p-3 mb-4">
     <div class="bg-white">
     <img class="w-full" src="${largeImageURL}">
     <div class="p-4">
     <p>${likes} <span class="ml-2"><i class="fas fa-thumbs-up"></i></span></p>
     <p>${comments} <span class="ml-2"><i class="fas fa-comment"></i></span></p>
     <p >${views} <span class="ml-2"><i class="fas fa-eye"></i></span></p>
     <p>${downloads} <span class="ml-2"><i class="fas fa-download"></i></span></p>

     <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-4 p-1" 
     
     href="${largeImageURL}" target="_blank" rel="nooponer noreferrer">     Ver imagen </a>
     </div>
     </div>
      </div>
      `;
  });
  while (paginacionDiv.firstChild) {
    paginacionDiv.removeChild(paginacionDiv.firstChild);
  }
  imprimirPaginador();
}

function CalcularPagina(total) {
  return parseInt(Math.ceil(total / registroPagina));
}

function imprimirPaginador() {
  iterador = crearPaginador(totalPagina);

  while (true) {
    const { value, done } = iterador.next();

    if (done) return;

    const boton = document.createElement("a");
    boton.href = "#";
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add(
      "siguiente",
      "bg-yellow-400",
      "px-4",
      "py-1",
      "mr-2",
      "font-bold",
      "mb-4",
      "rounded"
    );

    boton.onclick = () => {
      paginaActual = value;
      buscarImagenes();
    };
    paginacionDiv.appendChild(boton);
  }
}
