//Variables
const mascotaInput = document.querySelector("#mascota");
const valorAnmal = document.querySelector("#animal");
const propetarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

//Formulario
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let Editando;

//AGREGAMOS LAS CLASES

class Citas {
  // ---> PASO IV
  constructor() {
    //---> PASO 7
    this.citas = [];
  }

  agregrarCita(cita) {
    this.citas = [...this.citas, cita];
    console.log(this.citas);
  }

  EliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }

  EditarCita(citas) {
    this.citas = this.citas.map((cita) =>
      cita.id === citas.id ? citas : cita
    );
  }
}

class UI {
  // ---->  PASO V
  imprimirAlerta(mensaje, tipo) {
    //----> PASO 11
    const boton = document.querySelector("#boton");
    //Creamos el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add(
      "text-center",
      "alert",
      "d-block",
      "titulo",
      "col-12"
    );

    // ----> PASO 12
    //Determinamos el tipo de error que es...
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
      boton.disabled = true;
    } else {
      divMensaje.classList.add("alert-success");
    }

    // ----> PASO 13
    //Agregamos el mensaje
    divMensaje.textContent = mensaje;

    //-----> PASO 14
    //Agregamos al DOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    // -----> PASO 15
    //Quitar la alerta

    setTimeout(() => {
      divMensaje.remove();
      boton.disabled = false;
    }, 3000);
  }
  // ----> PASO 17
  //Mandamos a imprimir las citas que insertamoos
  imprimirCitas({ citas }) {
    this.limpiarHTML();
    // ----> PASO 18
    //Recorremos el objeto de cita
    citas.forEach((cita) => {
      const {
        mascota,
        animal,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
        id,
      } = cita;

      // ----> PASO 19
      //Creamos el div
      const divCitas = document.createElement("div");
      divCitas.classList.add("cita", "p-3");
      divCitas.dataset.id = id;

      // ----> PASO 20
      //Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const animalParrafo = document.createElement("p");
      animalParrafo.innerHTML = `
            <span class="font-weight-bolder"> Tipo de Animal: </span>${animal}
      `;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span>${propietario}
      `;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Telefono: </span>${telefono}
      `;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Fecha: </span>${fecha}
      `;

      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Hora: </span>${hora}
      `;

      const sintomaParrafo = document.createElement("p");
      sintomaParrafo.innerHTML = `
            <span class="font-weight-bolder"> Sintomas: </span>${sintomas}
      `;

      //Creamos el boton eliminar
      const BtnEliminar = document.createElement("button");
      BtnEliminar.classList.add("btn", "btn-danger", "mr-2");
      BtnEliminar.innerHTML = `Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

      //Creamos el boton Editar
      const BtnEditar = document.createElement("button");
      BtnEditar.classList.add("btn", "btn-info");
      BtnEditar.innerHTML = `Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;

      BtnEliminar.onclick = () => ElimnarCitas(id);
      BtnEditar.onclick = () => CargarEdicion(cita);
      // ----> PASO 21
      //Agregamos  los elementos al div citas
      divCitas.appendChild(mascotaParrafo);
      divCitas.appendChild(animalParrafo);
      divCitas.appendChild(propietarioParrafo);
      divCitas.appendChild(telefonoParrafo);
      divCitas.appendChild(fechaParrafo);
      divCitas.appendChild(horaParrafo);
      divCitas.appendChild(sintomaParrafo);
      divCitas.appendChild(BtnEliminar);
      divCitas.appendChild(BtnEditar);
      // ----> PASO 22
      //Agregamos las citas al HTML
      contenedorCitas.appendChild(divCitas);
    });
  }

  // ---> PASO 23
  //Limpiamos el HTML
  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

// ----> PASO 6
//Instanceamos las clases de forma global
const administrarCitas = new Citas();
const ui = new UI();

//Obtenemos informacion de los inputs
EvenListeners();

function EvenListeners() {
  //--->    PASO I
  mascotaInput.addEventListener("input", datosCitas);
  //valorAnmal.addEventListener("input", datosCitas);
  propetarioInput.addEventListener("input", datosCitas);
  telefonoInput.addEventListener("input", datosCitas);
  fechaInput.addEventListener("input", datosCitas);
  horaInput.addEventListener("input", datosCitas);
  sintomasInput.addEventListener("input", datosCitas);
  formulario.addEventListener("submit", nuevaCita);
  valorAnmal.addEventListener("change", (e) => {
    citaOBJ.animal = e.target.value;
  });
}

//Creamos un Objeto para guardar las variables con informacion de la cita
const citaOBJ = {
  // -----> PASO II
  mascota: "",
  animal: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//Agrega gato al objeto de la cita
function datosCitas(e) {
  // ---> PASO III
  citaOBJ[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  //PASO ----> 8
  e.preventDefault();
  //PASO ---> 9
  //Extraer la Informacion del objeto
  const {
    mascota,
    animal,
    propietario,
    telefono,
    fecha,
    hora,
    sintomas,
  } = citaOBJ;

  //PASO ----> 10
  //Validar
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === "" ||
    animal === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (Editando) {
    ui.imprimirAlerta("La cita se edito correctamente");
    administrarCitas.EditarCita({ ...citaOBJ });
    formulario.querySelector('button[type="submit"]').textContent =
      "Crear Cita";
    Editando = false;
  } else {
    // ---> PASO 16
    //Generar un id unico
    citaOBJ.id = Date.now();
    //Creamos una nueva cita
    administrarCitas.agregrarCita({ ...citaOBJ });
    ui.imprimirAlerta("La cita se agrego correctamente");
  }

  //Reiniciamos el objeto para la validacion
  reiniciarOBJ();
  //Reiniciamos el formulario
  formulario.reset();
  //imprimimos la cita
  ui.imprimirCitas(administrarCitas);
}

function reiniciarOBJ() {
  citaOBJ.mascota = "";
  citaOBJ.animal = "";
  citaOBJ.propietario = "";
  citaOBJ.telefono = "";
  citaOBJ.fecha = "";
  citaOBJ.hora = "";
  citaOBJ.sintomas = "";
}

function ElimnarCitas(id) {
  //ELiminar cita
  administrarCitas.EliminarCita(id);
  ui.imprimirAlerta("La cita se elimino correctamente");
  ui.imprimirCitas(administrarCitas);
}

function CargarEdicion(cita) {
  const {
    mascota,
    animal,
    propietario,
    telefono,
    fecha,
    hora,
    sintomas,
    id,
  } = cita;

  //Llenar los imput
  mascotaInput.value = mascota;
  valorAnmal.value = animal;
  propetarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //Llenar el objeto

  citaOBJ.mascota = mascota;
  citaOBJ.animal = animal;
  citaOBJ.propietario = propietario;
  citaOBJ.telefono = telefono;
  citaOBJ.fecha = fecha;
  citaOBJ.hora = hora;
  citaOBJ.sintomas = sintomas;
  citaOBJ.id = id;

  //Cambiar el texto del boton
  formulario.querySelector('button[type="submit"]').textContent =
    "Guarda Cambios";

  Editando = true;
}
