
import * as fs from 'fs'
import * as path from 'path'

fs.readFileSync(process.argv[1] + '.js').toString().split('\n')

export default function linesInFile(file) {
    if (!file.endsWith(".js")) file += ".js"
    return fs.readFileSync(file).toString().split("\n").length
}