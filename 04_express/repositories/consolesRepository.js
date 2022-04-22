import {entities} from "./store.js";

export function findById(id) {
//=== werkt hier niet omdat je
//    een String met een int vergelijkt
    let item = entities.consoles.find(a => a.id === parseInt(id))
    return item
}

export function findBySearch(term){
    let items = entities.consoles.filter(a => a.consol.toLowerCase().includes(term.toLowerCase()))
    return items
}


export function findAllConsoles(){
    return entities.consoles.map(p => ({id: p.id, consol: p.consol})
    )
}
//console.log(findById(2))

