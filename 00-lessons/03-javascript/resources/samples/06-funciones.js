/* Funciones */

/* 1. function */
function syntax() {}
const returnedSyntax = syntax();

function log() {
  console.log("regular function");
}
const returnedLog = log();

function returnUndefined() {
  return;
}
const returnedUndefined = returnUndefined();

console.log(returnedSyntax, returnedLog, returnedUndefined);

function returnSum(num1, num2) {
  return num1 + num2;
}

function logSum(num1, num2) {
  console.log(num1 + num2);
}

const arrowFunction = () => "arrow function";
