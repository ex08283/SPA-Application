import {entities} from "./store.js";

export function findById(id) {
    return entities.consoles.find(a => a.id === id)
}

