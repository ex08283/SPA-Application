import express, * as bodyParser from "express";
import url from "url";
import {
    addConsole,
    addConsoleByPut,
    findById,
    findBySearch,
    findConsolesByTwoParam,
    getAllConsoles
} from "../repositories/consolesRepository.js";
import {router as gamesRouter} from "./gamesRouter.js";
//import {findBy} from "../repositories/gamesRepository.js";



export const router = express.Router();
// router.param("consoleId", (req, res, next, consoleId) =>
//     {
//         req.games = findBy(g => g.consoleId === parseInt(req.params.consoleId))
//         next()
//     }
// )
router.use('/games', gamesRouter)
router.use('/consoles/:consoleId/games', gamesRouter)
router.use(express.json())
router.use(bodyParser.json())

router.get("/consoles", getConsoles)
router.get('/consoles/:id', getConsoleById)
router.delete('/consoles/:id', deleteConsoleById)
//add new console
router.post('/consoles/', addToConsoles)
//adapt existing console
router.put('/consoles/:id', changeConsole)



function changeConsole(req, res) {
    console.log(req.body)
    res.status = addConsoleByPut(req.body, req.params.id)
    res.end()
}

function addToConsoles(req, res) {
    const consol = req.body;
    console.log(consol)
    let locID = addConsole(consol)
    res.status(201)
        .location(`${req.originalUrl}/${locID}`).send()
}


function deleteConsoleById(req, res) {
    let consoles = getAllConsoles();
    const idx = consoles.findIndex(c => c.id === parseInt(req.params.id))
    console.log("sdsd")

    if (idx >= 0) {
        consoles.splice(idx,1)
        //res.sendStatus(204);
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

function getConsoleById(req, res) {
    let  found = findById(req.params.id)
    if (typeof found === "undefined") {
        res.status(404).send('no consoles found')
    } else {
        res.json(found)
    }
}


function getConsoles(req, res) {
    //console.log(req.query.search)
    if (req.query.search){
        const foundSearch= findBySearch(req.query.search)
        if (foundSearch.length < 1) {
            console.log('no consoles found')
            res.status(404).send('no consoles found')
        } else {
            //console.log("search")
            foundSearch.map(p => addSelf(p, url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: "/api/consoles/" + p.id
            })))
            res.json(foundSearch)
        }
    } else {
        const foundItems = findConsolesByTwoParam();
        //console.log(foundItems)

        if (foundItems.length < 1) {
            console.log('no consoles found')
            res.status(404).send('no consoles found')
        } else {
            foundItems.map(p => addSelf(p, url.format({
                protocol: req.protocol,
                host: req.get("host"),
                pathname: "/api/consoles/" + p.id
            })))
            res.json(foundItems)
        }

    }

}

export function addSelf(object, href) {
    //console.log(object)
    object._links = {
        "self": href
    }
    return object
}

