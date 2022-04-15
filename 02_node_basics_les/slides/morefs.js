import * as fs from 'fs'
import * as path from 'path'

console.log(process.cwd())

process.chdir('mapje')
fs.readdir('.', ((err, files) => console.log(files)))

process.chdir('..')
console.log(process.cwd())

fs.unlink(path.join('mapje', 'koppie.txt'),
    err => fs.rmdir('mapje',
        err => {
        if (err) {console.log(err)}
    }
    )
)