import * as fs from "fs"

//const fs = require('fs') //remove type module in package.json

function lezer (file) {
    let txt = fs.readFileSync(file,"utf8");
    console.log(txt);
}
lezer('../../fortune.txt')