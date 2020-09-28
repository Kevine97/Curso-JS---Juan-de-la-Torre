//Variable
const carrito = document.querySelector("#carrito");
const listaCurso = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarritos = [];

Registrar();
function Registrar() {
  //Cuando agregas un curso presionando el boton
  listaCurso.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar carito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarritos = [];
    limpiarHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo por el data-id
    articulosCarritos = articulosCarritos.filter(
      (curso) => curso.id !== cursoId
    );
    console.log(articulosCarritos);
    carritoHTML();
  }
}

//Leee el contenido HTML al que le demos click y extrae la informacion del curso
function leerDatosCursos(curso) {
  //Crear un objeto con el contenido actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si el elemento ya exite en el carrito
  const existe = articulosCarritos.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarritos.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna los objetos actualizos
      } else {
        return curso; //Retorna los objetos que no son duplicados
      }
    });
    articulosCarritos = [...cursos];
  } else {
    //Agregar elementos al arreglo del carrito
    articulosCarritos = [...articulosCarritos, infoCurso];
  }

  //articulosCarritos.push(infoCurso);
  console.log(articulosCarritos);
  carritoHTML();
}

//muestra carrito de compras en el HTML
function carritoHTML() {
  //Limpia el HTML
  limpiarHTML();
  articulosCarritos.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${imagen}" width="100"/>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
    `;
    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del  tbody
function limpiarHTML() {
  //Forma lenta
  //contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
