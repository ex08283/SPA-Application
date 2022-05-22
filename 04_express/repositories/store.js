import fs from "fs"

const file = 'db.json'
export let entities;

fs.readFile(file, (err, data) => {
    if (err) {
        console.log(`json file ${file} not found... aborting`);
        process.exit()
    }
    entities =JSON.parse(data)
})





