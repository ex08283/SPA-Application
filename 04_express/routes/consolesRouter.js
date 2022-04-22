import express from "express";
import url from "url";
import {findById} from "../repositories/consolesRepository.js";
import {findBySearch} from "../repositories/consolesRepository.js";
import {findAllConsoles} from "../repositories/consolesRepository.js";

export const router = express.Router();
router.use(express.json())

router.get("/", getConsoles)
router.get('/', getBySearch)
router.get('/:id', getConsoleById)


function getConsoleById(req, res) {
    let  found = findById(req.params.id)
    if (typeof found === "undefined") {
        res.status(404).send('item is undefined')
    } else {
        res.json(found)
    }
}


    //     ◦ GET http://localhost:3000/api/hoofdentiteiten?zoek=”term”
    // i. Geef alle hoofentiteiten terug waarbij de zoekterm (niet hoofdlettergevoelig)
// in één van de getoonde attributen voorkomt (voorbeeld: term komt voor in term, TerM en termijn).
// Gebruik array functies in een vloeiende programmeerstijl.

function getBySearch(req, res) {
    const foundSearch= findBySearch(req.query.search)
    if (foundSearch.length < 1) {
        console.log('no consoles found')
        res.status(404).send('no consoles found')
    } else {
        res.json(foundSearch)
    }
}

function getConsoles(req, res) {
    const foundItems = findAllConsoles();
    console.log(foundItems)

    if (foundItems.length < 1) {
        console.log('no consoles found')
        res.status(404).send('no consoles found')
    } else {
        foundItems.map(p => addSelf(p, url.format({
            protocol: req.protocol,
            host: req.get("host"),
            pathname: "/api/personen/" + p.id
        })))
        res.json(foundItems)
    }

}

function addSelf(object, href) {
    //console.log(object)
    object._links = {
        "self": {href}
    }
    return object
}

