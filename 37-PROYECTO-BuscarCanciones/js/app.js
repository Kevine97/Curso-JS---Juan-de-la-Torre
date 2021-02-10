import * as UI from "./interfaz.js";
import API from "./api.js";

UI.formularioBuscar.addEventListener("submit", BuscarCancion);

function BuscarCancion(e) {
  e.preventDefault();

  //Obtener datos del formulario

  const artist = document.querySelector("#artista").value;
  const cancion = document.querySelector("#cancion").value;

  if (artist === "" || cancion === "") {
    UI.divMensaje.textContent = "Error. Todos los campos son obligatorios";
    UI.divMensaje.classList.add("error");

    setTimeout(() => {
      UI.divMensaje.textContent = "";
      UI.divMensaje.classList.remove("error");
    }, 3000);

    return;
  }
  const busqueda = new API(artist, cancion);
  busqueda.consultarAPI();
}
