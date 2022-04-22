import {findById} from "../repository/consolesRepository.js";
import {findBy} from "../repository/gamesRepository.js";

export function getConsolesAndGames(consoleID) {
    let consoleEntity = findById(consoleID)
    if (consoleEntity) {
        consoleEntity.subs = findBy(game => game.consoleId === consoleID)
    }
    return consoleEntity
}

//console.log(getConsolesAndGames(1))