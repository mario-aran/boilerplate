/* Control de Flujo */

/* 1. Condicionales */
/* if */
if (true) {
  console.log("if true");
}

/* else */
if (false) {
} else {
  console.log("if false");
}

/* else if */
if (false) {
} else if (true) {
  console.log("else if true");
} else {
}

/* ternary operator*/
const ternary = true ? "ternary true" : "ternary false";

/* switch case */
switch ("string") {
  case "string":
    console.log("switch case string");
    break;
  case 1:
    console.log("switch case number");
    break;
  default:
    console.log("switch default");
    break;
}

/* 2. Bucles */
/* for */
for (let i = 0; i < 3; i++) {
  console.log("for", i);
}

/* while */
let iWhile = 0;
while (iWhile < 3) {
  console.log("while", iWhile);
  iWhile++;
}

/* do while */
let iDoWhile = 0;
do {
  console.log("do while", iDoWhile);
  iDoWhile++;
} while (iDoWhile < 3);

/* 3. Interrupciones */
/* break */
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break;
  }
  console.log("break", i);
}

/* continue */
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log("continue", i);
}
