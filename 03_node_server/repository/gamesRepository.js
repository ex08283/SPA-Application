import {entities} from "./store.js";

export function findBy(gameTest){
    return entities.games.filter(gameTest)
}

//console.log(findBy(game => game.consoleId === 1))

