import * as fs from 'fs'

fs.mkdirSync('mapje');
let buffer = fs.readFileSync('../../fortune.txt');
fs.writeFileSync('mapje/koppie.txt', buffer)