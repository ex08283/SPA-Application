import fs from "fs";
import path from "path";

// write sub-entity to json file
export default function writeGames(consol, games) {
    //find all main entity with one or more sub-entities
    const filename = consol.consol + '.json';
    let data = games.filter( game => game.consoleId === consol.id)
    data = JSON.stringify(data, null, 2)

    fs.writeFile(filename, data,err =>
        {
            if (err) console.log(`error writing file ${filename}`)
        }
    )
}