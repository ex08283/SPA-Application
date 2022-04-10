import *  as fs from "fs"
import writeGames from "./gamesByConsole.js";

let entities;

function writeConsoles() {
    const dir = "games"
    //change cwd to 02_node_basics
    process.chdir('./02_node_basics')
    fs.mkdtemp(dir,
        (err, folder) => {
        if (err) console.log("problemen bij het maken van een temp folder games")
        else {
            //cahnge cwd folder to where the files have to written
            process.chdir(folder)
            //for each folder write subentity to json file
            entities.consoles.forEach(consol => writeGames(consol, entities.games))
        }
        }
    )
}

function main() {
    //read db.json
    fs.readFile('db.json',(err, dbData) =>
        {
            if (err) {console.log(err)}
            else {
                entities = JSON.parse(dbData)
                //console.log(entities[0])
                writeConsoles()
            }
        }
    )
}

main()
