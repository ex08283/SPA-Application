import * as fs from 'fs'

function herroep(err, data) {
    if (err) {console.log(err)}
    else {console.log(data)}
}

function laser (file) {fs.readFile(file, 'utf8', herroep)}

laser('../../fortune.txt')
laser('../../badluck.txt')