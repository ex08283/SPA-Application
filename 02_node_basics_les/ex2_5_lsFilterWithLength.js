import * as fs from 'fs'
import linesInFile from "./ex2_5_countMeSync.js";
import * as path from "path";

const dir = process.argv[2]
let suffix = process.argv[3]
if (!suffix.startsWith(".")) suffix = "."+suffix
console.log(process.argv)

console.log(`${"Nam".padEnd(40)}  lines`)

fs.readdir(dir,
    (err, files1) => {
    //console.log(files1)
        if (err){console.log(err)
        } else {
            files1.filter( a => a.endsWith(suffix)).forEach(a=> {
                const pahtName = path.join(dir,a)
                // console.log(pahtName)
                console.log(`${pahtName.padEnd(40)} ${linesInFile(pahtName)}`)
            }
            )
        }
    }
)