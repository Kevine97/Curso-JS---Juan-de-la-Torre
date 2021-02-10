const cargarAPI = document.querySelector("#cargarAPI");

document.addEventListener("DOMContentLoaded", obtenerDatos);

function obtenerDatos() {
  const url = "https://picsum.photos/v2/list?page=1";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((results) => mostrarHTML(results));
}

function mostrarHTML(datos) {
  const contenido = document.querySelector(".contenido-principal");

  let html = "";

  datos.forEach((element) => {
    const { author, download_url, url } = element;
    html += `
        <article class="entrada">
         <img src="${download_url}" alt="texto entrada" width="400" height="300">
         <div class="contenido">
         <spam style: "padding:0">API: <a href="https://picsum.photos/v2/list?page=1" target="_blanck">unsplash<a/></spam>
         <br>
         <spam>Autor</spam>
         <p> ${author} </p>
         <a href="${url}" class="boton" target="_blanck"> Ver imagen </a>
         </div>
         </article>
         `;
  });
  contenido.innerHTML = html;
  /*const principal = document.querySelector("#principal");
  principal.insertBefore()*/
}
