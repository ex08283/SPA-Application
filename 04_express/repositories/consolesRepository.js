import {entities} from "./store.js";

let nextId = 16;

export function findById(id) {
//=== werkt hier niet omdat je
//    een String met een int vergelijkt
    return entities.consoles.find(c => c.id === parseInt(id))
}

export function findBySearch(term){
    return entities.consoles.filter(c => c.consol.toLowerCase().includes(term.toLowerCase()))
}

export function findConsolesByTwoParam(){
    return entities.consoles.map(c => ({id: c.id, consol: c.consol, Generation: c.Generation}))
}

export function getAllConsoles(){
    return entities.consoles;
}

export function addConsole(consol) {
    consol.id = nextId
    entities.consoles.push(consol)
    //if (req.body.id >= nextKey) nextKey = req.body.id + 1
    nextId++;
    return (nextId - 1);

}

export function addConsoleByPut(consol, id) {
    const idx = entities.consoles.findIndex(p => p.id === parseInt(id));
    consol.id = Number(consol.id)
    let status

    //we are assuming that req.body contains attribute id
    if (idx >= 0){ //console bestaat
        entities.consoles[idx] = consol
        status = 200
    } else { //console bestaat niet
        entities.consoles.push(consol)
        status = 204
        if (consol.id >= nextId) nextId = consol.id + 1
    }
    return status
}




