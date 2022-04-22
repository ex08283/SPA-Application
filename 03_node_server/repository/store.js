import fs from "fs"

const file = '../db.json'
export let entities = fs.readFileSync(file).toString()




