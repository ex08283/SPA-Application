import {PI} from "./export_calc.js";
import {product, subtract as min} from "./export_calc.js";
//e default functie wordt toegekend als er geen {accolades} rond de variabele
// staan. De aanroep van sum zal dus de add functie in calc.js aanroepn
import sum from "./export_calc.js";
import * as reken from "./export_calc.js"

console.log("surface of a circel with radius 5 is" + product(PI, product(5,5)).toFixed(2))
console.log(min(1,PI).toFixed(2));
console.log(sum(10,1));
console.log(sum(1,100))
console.log(reken.subtract(4,5))