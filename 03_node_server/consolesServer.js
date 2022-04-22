import http from "http";
import {getConsolesAndGames} from "./service/consolesService.js"

http.createServer(
    (req, res) => {
        let path = req.url;
        let id = +path.split("/")[2]
        if (Number.isInteger(id)){
            let consolesAndGames = getConsolesAndGames(id)
            if (consolesAndGames) {
                res.writeHead(200, {"Content-Type": "application/JSON"})
                res.end(JSON.stringify(consolesAndGames))
            } else {
                res.writeHead(404, {"Content-Type": "text/plain"})
                res.end(`console met id ${id} is niet gevonden`)
            }
        }else {
            res.writeHead(400, {"Content-Type": "text/plain"})
            res.end("Geen consoleId gevonden in request")
        }

    }
).listen(3000)