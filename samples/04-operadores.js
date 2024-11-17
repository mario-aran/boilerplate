/* Operadores */

/* 1. Aritméticos */
const suma = 1 + 1; // 2
const resta = 1 - 1; // 0
const multiplicacion = 2 * 2; // 4
const division = 4 / 2; // 2
const resto = 5 % 2; // 1

let incremento = 1;
incremento++; // 2 (valor devuelto 1)
++incremento; // 3

let decremento = 1;
decremento--; // 0 (valor devuelto 1)
--decremento; // -1

/* 2. Asignación*/
let assign = 1; // 1
assign += 1; // 2
assign -= 1; // 1
assign *= 2; // 2
assign /= 2; // 1
assign %= 1; // 0

/* 3. Comparación */
const equality = 1 == "1"; // true
const strictEquality = 1 === "1"; // false
const inequality = 1 != "1"; // false
const strictInequality = 1 !== "1"; // true
const greaterThan = 2 > 1; // true
const greaterThanOrEqual = 2 >= 2; // true
const lessThan = 1 < 2; // true
const lessThanOrEqual = 2 <= 2; // true

/* 4. Lógicos */
const and = true && false; // false
const or = true || false; // true
const not = !true; // false

/* 5. Tipado */
typeof "string"; // string
