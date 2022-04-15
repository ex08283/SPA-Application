import * as fs from "fs";
import * as path from "path";
const dir = "mapje2";
fs.mkdir(dir,
    err => fs.readFile('sample.txt',
        (err, buffer) => fs.writeFile(
            path.join(dir, 'koppie.txt'),
            buffer,
            err => {
                if (err) {
                    console.log(err);
                } // end if error writing file
            } // end writeFile callback
        ) // close writeFile call, close readFile callback
    ) //close readFile call
);// close mkdir call