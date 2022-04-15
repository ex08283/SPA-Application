import * as fs from 'fs'


function laser (file) {
    function herroep(err, data) {
        if (err) {console.log(`Porbleem bij lezen van ${file}`)}
        else {console.log(data)}
    }

    fs.readFile(file, 'utf8', herroep)}

laser('../../fortune.txt')
laser('../../badluck.txt')


//or

// import * as fs from 'fs'
//
//
// function laser (file) { fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {console.log(`Porbleem bij lezen van ${file}`)}
//     else {console.log(data)}
// });
// }
//
//
// laser('../../fortune.txt')
// laser('../../badluck.txt')