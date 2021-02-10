const notificacionBTN = document.querySelector("#notificar");

notificacionBTN.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    console.log("EL resultado es: ", result);
  });
});

const VerNotificacion = document.querySelector("#verNotificacion");
VerNotificacion.addEventListener("click", () => {
  if ((Notification.permission = "granted")) {
    const notificacion = new Notification("Agroclimatica", {
      icon: "img/ccj.png",
      body: "Webnibar de agriclimatica en ecuador",
    });
    notificacion.onclick = () => {
      window.open("https://web.agroclimatica.com/");
    };
  }
});

//Geolocalizacion
document.addEventListener("DOMContentLoaded", () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(getPosition, error, options);
});

const options = {
  enablehightAccuracy: true,
  timeout: 5000,
  maximunAge: 0,
};

const getPosition = (position) => {
  console.log(position.coords.latitude + "  " +  position.coords.longitude);
};

const error = (error) => {
  console.log(error);
};
