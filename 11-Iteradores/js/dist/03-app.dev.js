"use strict";

//Fizz Buzz - Numero
// 3 6 9 12 ... Fizz
// 5 10 15 20 ... Buzz
//15 30 45 ... FizzBuzz
for (var index = 1; index <= 100; index++) {
  if (index % 15 === 0) {
    console.log("".concat(index, " Fizz Buzz"));
  } else if (index % 3 === 0) {
    console.log("".concat(index, " Fizz"));
  } else if (index % 5 === 0) {
    console.log("".concat(index, " Buzz"));
  }
}