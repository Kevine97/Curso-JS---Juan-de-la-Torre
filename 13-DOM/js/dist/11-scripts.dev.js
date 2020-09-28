"use strict";

var btn = document.querySelector(".btn-flotante");
var footer = document.querySelector(".footer");
btn.addEventListener("click", mostrarFooter);

function mostrarFooter() {
  if (footer.classList.contains("activo")) {
    footer.classList.remove("activo");
    this.classList.remove("activo");
    this.textContent = "Idioma y Moneda";
  } else {
    footer.classList.add("activo");
    this.classList.add("activo");
    this.textContent = "X CERRAR";
  }
}