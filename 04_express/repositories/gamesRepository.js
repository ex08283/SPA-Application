import {entities} from "./store.js";

export function findBy(gameTest){
    return entities.games.filter(gameTest)
}

export function getAllGames(){
    return entities.games
}
//console.log(findBy(game => game.consoleId === 1))

export function getGameById(id){
    return entities.games.find(g => g.id === parseInt(id))
}