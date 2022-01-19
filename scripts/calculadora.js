'use strict'

var args = process.argv.slice(2);

var n1 = parseFloat(args[0]);
var n2 = parseFloat(args[1]);

console.log(`
    Suma: ${n1 + n2}
    Resta: ${n1 - n2}
    Multiplicación: ${n1 * n2}
    División: ${n1 / n2}
`);