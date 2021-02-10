import * as UI from "./interfaz.js";

class API {
  constructor(artista, cancion) {
    this.artista = artista;
    this.cancion = cancion;
  }

  consultarAPI() {
    const URL = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

    fetch(URL)
      .then((response) => response.json())
      .then((response) => {


        console.log(response.lyrics);

        if (response.lyrics) {
          const { lyrics } = response;
          UI.divResultado.textContent = lyrics;
          UI.headingResultado.textContent = `Letra de la canción: ${this.cancion}`;
        } else {
          UI.divMensaje.textContent = "La canción no existe";
          UI.divMensaje.classList.add("error");
          setTimeout(() => {
            UI.divMensaje.textContent = "";
            UI.divMensaje.classList.remove("error");
          }, 3000);
        }
      });
  }
}

export default API;
