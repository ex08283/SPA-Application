import * as fs from 'fs'

const dir = process.argv[2]
let suffix = process.argv[3]
if (!suffix.startsWith(".")) suffix = "."+suffix

fs.readdir(dir, (err, files1) => {
    console.log(files1)
    if (err){console.log(err)
    } else {files1.filter( a => a.endsWith(suffix)).forEach(a=>console.log(a))}
}
)


// let dirs =  ['accumulator.js',
//     'countMeAsync.js',
//     'countMeSync',
//     'lsfilter.js']
//
// for (let dir of dirs) {
//     fs.writeFile(('./dej_code/' + dir),'', (err) =>  { if (err) console.log('err')})
// }