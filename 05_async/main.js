import fs from "fs/promises"
import writeGames from "./gamesByConsole.js";

let entities;

async function writeConsoles() {
    const dir = "games"
    //change cwd to 02_node_basics
    process.chdir('./05_async')
    fs.mkdtemp(dir)
        .catch((err) => console.log("problemen bij het maken van een temp folder games"))
        //.then(folder => {return folder})
        .then(folder => {
            //cahnge cwd folder to where the files have to written
            console.log(folder + " aanggemaakt@" + timeStamp() )
            //console.log(folder)
            process.chdir(folder)
            //for each folder write subentity to json file
            let array = []

            entities.consoles.forEach(consol => {
                let result = writeGames(consol, entities.games)
                .then((result ) => {
                    console.log(`bestand voor ${consol.consol} @${timeStamp()}`)
                    //console.log(consol.consol)
                    //results.push(nsol)
                    return consol.consol
                })
                //console.log(result)
                array.push(result)
            })

            Promise.all(array)
                .then((results) => {
                    console.log("Alle consoles wehgeschreven@" + timeStamp() +
                        " resultaten: " + results)
                })
        })

}

async function writeConsolesAsync() {
    try {
        const dir = "games"
        //change cwd to 02_node_basics
        process.chdir('./05_async')
        let folder = await fs.mkdtemp(dir)
        console.log(folder + " aanggemaakt@" + timeStamp())
        process.chdir(folder)
        entities.consoles.forEach(consol => {
            writeGames(consol, entities.games)
        })
        console.log("Alle consoles wehgeschreven@" + timeStamp() )
    } catch (err) { console.log("problemen bij het maken van een temp folder games")}
}


// Voeg aan app.js een main() functie
function main() {
    //read db.json
    fs.readFile('db.json')
        .then(dbData => {
            entities = JSON.parse(dbData)
            //roep dan writeHoofden () aan
            writeConsoles()
        }).catch(console.error)
}

function timeStamp() {
    const date = new Date()
    return date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds()
}


main()
