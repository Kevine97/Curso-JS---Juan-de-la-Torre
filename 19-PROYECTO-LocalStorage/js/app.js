//Variables
const formulario = document.querySelector("#formulario");
const listTweets = document.querySelector("#lista-tweets");
let tweets = [];
//Evenlistener
eventListener();
function eventListener() {
  //Cuando el usuario agrega un nuevo Tweet
  formulario.addEventListener("submit", agergarTweet);

  //Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    crearHTML();
  });
}

//Funciones
function agergarTweet(e) {
  e.preventDefault();

  //Donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  //Validacion
  if (tweet === "") {
    const error = document.querySelector("p.error");
    //Que solo muestre una vez el error
    if (!error) {
      mostrarError("Un mensaje no puede ir vacio");
    }
    return; //Permite que no se ejecuten mas codigoo
  }

  const tweetOBJ = {
    id: Date.now(),
    nombre: tweet,
  };

  //Añadir al arreglo de Tweet
  tweets = [...tweets, tweetOBJ];

  //Una vez agregado
  crearHTML();

  //Reiniciar el Formulario
  formulario.reset();
}

//Mostrar mensaje de error

function mostrarError(error) {
  const mensaje = document.createElement("p");
  mensaje.textContent = error;
  mensaje.classList.add("error");

  //Insertarlo en el contenido
  const contenido = document.querySelector("#formulario");
  contenido.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

//Muestra un listado de los Tweet
function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((t) => {
      //Creando un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      //Añadir la funcion de Eliminar
      btnEliminar.onclick = () => {
        borraTweet(t.id);
      };
      //Crear el HTML
      const li = document.createElement("li");
      //Añadir texto
      li.innerHTML = t.nombre;
      //Añadiendo el Boton
      li.appendChild(btnEliminar);
      listTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agrega los Tweet al local Storage

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Limpiar HTML
function limpiarHTML() {
  while (listTweets.firstChild) {
    listTweets.removeChild(listTweets.firstChild);
  }
}

//Funcion que borra el tweet del local Storage

function borraTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id != id);
  crearHTML();
}
