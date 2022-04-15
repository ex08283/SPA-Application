import * as fs from 'fs'
import * as path from 'path'

let filePath = process.argv[1];

function linesInFile(filePath) {
    fs.readFile( filePath + '.js', (err, data) =>
        {
            if (!err) {
            console.log(`I am ${data.toString().split('\n').length} long.`)
            } else {console.log(err)}
        }
    )
}

linesInFile(filePath)

