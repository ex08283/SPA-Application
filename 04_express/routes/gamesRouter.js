import express from "express";
import {findBy, getGameById} from "../repositories/gamesRepository.js";
import * as url from "url";
import {addSelf} from "./consolesRouter.js";
import {getAllGames} from "../repositories/gamesRepository.js";

export const router = express.Router({mergeParams:true})

router.get('/:id', GameByID);
router.get('/', getGames);

function getGames(req, res) {
    //if the req url has consoleID param geef
    // 2 belangrijkste attributen van de subentiteiten
    // die bij de hoofdentiteit horen in HAL _embedded formaat
    // en anders geef alle subentiteiten
    let games = (req.params.consoleId)?
        findBy(g => g.consoleId === parseInt(req.params.consoleId))
        : getAllGames()
    //console.log(req.games)
    games.forEach( g => changeFormat(games, req))
    console.log(games)
    res.json(games)
}

//Geef subentiteit op basis van identificerend attribuut.
// Geef alle attributen.
function GameByID(req, res) {
    let game = getGameById(req.params.id)
    if (typeof game === "undefined") {
        res.status(404).send("game not found by id")
    } else {
        let consoleId = game.consoleId;
        delete game.consoleId;
        game = addSelf(
            game,
            url.format({
                    protocol: req.protocol,
                    host: req.get("host"),
                    pathname: "/api/games/" + consoleId
                })
        )
        res.json(game)
    }
}

function changeFormat(obj, req) {
    obj = obj.map(g => ({
        id:g.id,
        consoleId:g.consoleId,
        name:g.Name,
        multiplayerOnline:g.multiplayerOnline
    }))
    //add self
    obj.map( g => addSelf(g, url.format({
            protocol: req.protocol,
            host: req.get("host"),
            pathname: "/api/games/" + g.id
        })
    ))
    return obj
}

