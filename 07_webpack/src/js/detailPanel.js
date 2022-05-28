import {dataLoc} from "./lijstPanel.js";
import {fillConsolesTable} from "./lijstPanel.js";

export async function showDetail(dataLoc) {
    let consoleDetail = await fetch(dataLoc)
    consoleDetail = await consoleDetail.json()
    showConsoleDetail(consoleDetail)

    let gamesForConsole = await fetch(dataLoc + "/games")
    gamesForConsole = await gamesForConsole.json()
    showGamesForConsole(gamesForConsole)
}

//Show details of console
function showConsoleDetail(consoleDetail) {
    let consoleLegend = document.querySelector("#consoleLegend")
    consoleLegend.innerText = `${consoleDetail.consol}     ID: ${consoleDetail.id}`
    consoleLegend.innerText = `${consoleDetail.consol}     ID: ${consoleDetail.id}`
    let inputs = document.querySelectorAll("#consolFs input")
    document.querySelector("#consolForm").reset()
    enableInputs()
    for (let i = 0; i <inputs.length; i++) {
        inputs[i].setAttribute("value",consoleDetail[inputs[i].getAttribute("name").valueOf()])
    }
    disableInputs()

    let img = document.querySelector("#consolFs img")
    img.width = "400";
    img.heigth = "500";
    consoleDetail.image.valueOf()? img.src = consoleDetail.image:img.src = ""
}

//Show table of games of console
function showGamesForConsole(gamesForConsole) {
    let gameTable = document.getElementById("tableConsoleGame")

    let allGameTableNodes = document.querySelectorAll("#tableConsoleGame > tr");
    for (const allGameTableNode of allGameTableNodes) {
        gameTable.removeChild(allGameTableNode)
    }

    for (let game of gamesForConsole) {
        gameTable.append(createRowGame(game))
    }


    function createRowGame(gameAt) {
        let tr = document.createElement("tr")

        function createCellGame(txt){
            let cell = document.createElement("td");
            cell.append(txt)
            return cell
        }

        tr.append(
            createCellGame(gameAt.id),
            createCellGame(gameAt.name),
            createCellGame(gameAt.releaseDate),
            createCellGame(gameAt.multiplayerOnline),
        )
        return tr
    }
    disableInputs()
}


export async function showInputScreen(ev) {
    if (ev.target.innerText === "New") {
        const button = ev.target
        button.innerText = "Add"
        enableInputs()
        document.querySelector("#consoleImage").setAttribute("src", "")
        return;
    }
    if (ev.target.innerText === "Add") {
        try {
            const formData = new FormData(document.getElementById("consolForm"));
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJsonString = JSON.stringify(plainFormData);

            let response = await fetch("http://localhost:3000/api/consoles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: formDataJsonString
            })
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            await fillConsolesTable()

            let nr = document.querySelectorAll("tr.console-id").length
            //console.log(document.querySelectorAll("tr.console-id")[nr-1].childNodes[0])
            document.querySelectorAll("tr.console-id")[nr-1].childNodes[0].click()
            ev.target.innerText = "New"
        } catch (e) {
            console.log(e)
        }
    }

}

export async function editConsole(ev) {
    if (ev.target.innerHTML === "Save") {
        const formData = new FormData(document.getElementById("consolForm"));
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        const editResp = await fetch(dataLoc, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formDataJsonString
        })

        if (!editResp.ok){
            console.log(editResp.json())
            // const errorMessage = await response.text()
            // throw new Error(errorMessage)
        }
        await fillConsolesTable()
        showDetail(dataLoc)
        disableInputs()
        ev.target.innerHTML = "Edit"
    } else {
        ev.target.innerHTML = "Save"
        enableEdit()
    }
}

function enableEdit(){
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = false;
        })
}

function enableInputs(){
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = false;
            a.setAttribute("value", "")
        })
}

export function disableInputs() {
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = true
        })
}