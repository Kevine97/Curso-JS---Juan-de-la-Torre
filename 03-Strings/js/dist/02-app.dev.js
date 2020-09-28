"use strict";

var producto = "Monitor 20\""; //Metedo que permite contar las cantidad de caractares que tiene el String

console.log(producto.length); //Permite encontrar un texto especifico

console.log(producto.indexOf("Monitor 20\""));
console.log(producto.includes("Monitor 20\"")); //Permite eliminar espacios al inicio

console.log(producto.trimStart()); //Permite eliminar espacios al Final

console.log(producto.trimEnd()); //Permite eliminar el espacio en blanco al final y al incio

console.log(producto.trim());
console.log(producto.replace("\"", " Pulgadas"));