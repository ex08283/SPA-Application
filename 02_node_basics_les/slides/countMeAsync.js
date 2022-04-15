/** Created by Jan de Rijke */

import fs from 'fs'
let file = process.argv[1];
if (!file.endsWith(".js")) file+=".js"

fs.readFile(file,"utf8",
    (err,data) => console.log(err
        ? `error ${err} reading ${file}`
        : data.split("\n").length));

/*
 let result ="thing";

fs.readFile(file,"utf8",
	(err,data) => result = data.split("\n").length);
// this does not work: console.log runs before readfile ends (async!!!)
console.log(`result = ${result}`);
*/