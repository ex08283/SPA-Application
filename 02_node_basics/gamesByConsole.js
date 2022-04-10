import fs from "fs";
import path from "path";

// write sub-entity to json file
export default function writeGames(consol, games) {
    //find all main entity with one or more sub-entities
    games.filter( game => game.consoleId === consol.id).forEach(a => {

            const filename = consol.console + '.json';
            let data = JSON.stringify(a, null, 2);

            //if the file already exists -> add to pre-existing file if one exists
            if (fs.existsSync(path.join(process.cwd(),filename))) {
                //console.log("exists")
                fs.readFile(filename, (err, dataExistingGame) =>
                    {
                        if (err) {console.log(err)}
                        else {
                            let additionalData = "[\n" + JSON.stringify(JSON.parse(dataExistingGame)[0],null, 2) + ",\n"+ data + "\n]"
                            fs.writeFile(filename, additionalData,err =>
                                {
                                    if (err) console.log(`error writing file ${filename}`)
                                }
                            )
                        }
                    }
                )
            } else { // if does not already exist write to new file
                //console.log(filename +  "\n" + data);
                fs.writeFile(filename, `[\n${data}]`,err =>
                    {
                        if (err) console.log(`error writing file ${filename}`)
                    }
                )
            }
        }
    );
}