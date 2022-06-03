import {dataLoc} from "./lijstPanel.js";
import {fillConsolesTable} from "./lijstPanel.js";
import {fetchData} from "./lijstPanel.js";


//Show details of console
export function showConsoleDetail(consoleDetail) {
    let consoleLegend = document.querySelector("#consoleLegend")
    consoleLegend.innerText = `${consoleDetail.consol}     ID: ${consoleDetail.id}`
    let inputs = document.querySelectorAll("#consolFs input")
    document.querySelector("#consolForm").reset()
    enableInputs()
    //console.log(consoleDetail)
    for (let i = 0; i <inputs.length; i++) {
        if (inputs[i].getAttribute("type") === "checkbox") {
            //console.log(consoleDetail[inputs[i].getAttribute("name").valueOf()])
            consoleDetail[inputs[i].getAttribute("name").valueOf()]
                ?inputs[i].setAttribute("checked", "checked")
                :inputs[i].removeAttribute("checked")
        }
        inputs[i].setAttribute("value",consoleDetail[inputs[i].getAttribute("name").valueOf()])
    }
    document.getElementById("generation").value = consoleDetail.generation;

    disableInputs()

    let img = document.querySelector("#consolFs img")
    img.width = "400";
    img.heigth = "500";
    consoleDetail.image.valueOf()? img.src = consoleDetail.image:img.src = ""
}

//Show table of games of console
export function showGamesForConsole(gamesForConsole) {
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
        const formData = new FormData(document.getElementById("consolForm"));
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        console.log(formDataJsonString)
        const button = ev.target
        button.innerText = "Add"
        document.getElementById("editButton").setAttribute("disabled", "disabled")
        enableInputs()
        document.querySelector("#consoleImage").setAttribute("src", "");
        return;
    }
    if (ev.target.innerText === "Add") {
        const formData = new FormData(document.getElementById("consolForm"));
        const plainFormData = Object.fromEntries(formData.entries());
        (document.getElementById("handheld").checked)
            ?plainFormData.handheld = true
            :plainFormData.handheld = false
        const formDataJsonString = JSON.stringify(plainFormData);

        try {
            console.log(formDataJsonString)
            let response = await fetchData("http://localhost:3000/api/consoles", "POST",formDataJsonString)
            console.log(response)
            await fillConsolesTable()

            let nr = document.querySelectorAll("tr.console-id").length
            let newConsole =  document.querySelectorAll("tr.console-id")[nr-1]
            showConsoleDetail(await fetchData(newConsole.dataset.location,"GET"))
            showGamesForConsole(await fetchData(newConsole.dataset.location + "/games","GET"))
            document.getElementById("editButton").removeAttribute("disabled")

            ev.target.innerText = "New"
        } catch (e) {
            alert("Something went wrong, the console cannot be added, "+ e.message)
        }
    }

}

export async function editConsole(ev) {
    if (ev.target.innerHTML === "Save") {
        const formData = new FormData(document.getElementById("consolForm"));
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        try {
            console.log(formDataJsonString)
            const editResp = await fetchData(dataLoc,"PUT",formDataJsonString)
            console.log(editResp)
            await fillConsolesTable()
            showConsoleDetail(await fetchData(dataLoc,"GET"))
            showGamesForConsole(await fetchData(dataLoc + "/games","GET"))
            disableInputs()
            ev.target.innerHTML = "Edit"
        } catch (e) {
            alert("Could not be edited," + e.message)
        }
    } else {
        ev.target.innerHTML = "Save"
        enableEdit()
    }
}

function enableEdit(){
    document.querySelector("#generation").removeAttribute("disabled");
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = false;
        })
}

export function enableInputs(){
    document.querySelector("#generation").removeAttribute("disabled");
    document.querySelector("#handheld").removeAttribute("checked");

    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = false;
            a.setAttribute("value", "")
        })
}

export function disableInputs() {
    document.querySelector("#generation").setAttribute("disabled","disabled");
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = true
        })
}