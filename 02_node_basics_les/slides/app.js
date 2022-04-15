import * as fs from "fs";
import * as path from "path";

console.log(process.cwd())

process.chdir('mapje')
fs.readdir('.', (err, files) => console.log(files));
process.chdir('..');
fs.unlink(path.join('mapje','koppie.txt'), err => {if (err) console.log(err + 'line 10' )})
fs.rmdir('mapje', err => {if (err) console.log(err)})
