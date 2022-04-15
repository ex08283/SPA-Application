
import * as fs from 'fs'
import * as path from 'path'

console.log(`I am ${fs.readFileSync(process.argv[1] + '.js').toString().split('\n').length} long.`)


