///let consoles;
addEventListener("load", start)

// var clickedConsolID;
// var clickedConsol;
var dataLoc;

async function start() {
    await fillConsolesTable()
    document.querySelector("#newButton")
        .addEventListener("click",showInputScreen)

    document.querySelector("#showAllConsoles")
        .addEventListener("click", () => {
            disableInputs()
            document.querySelector("#newButton").innerHTML = "New"
            document.querySelector("#editButton").innerHTML = "Edit"
            document.querySelector("#detail").classList.toggle("collapsed")
            document.querySelector("#lijst").classList.toggle("collapsed")
        })

    document.querySelector("#editButton")
        .addEventListener("click", editConsole)

    document.querySelector("#consolesTable")
        .addEventListener("click", handleConsoleTable)
}


async function handleConsoleTable(ev) {

    if (ev.target.classList.contains("deleteButton")) {
        dataLoc = ev.target.parentElement.parentElement.dataset.location
        const response = await fetch(dataLoc, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage)
        }
        //console.log(await response.json());
        await fillConsolesTable()

    } else {
        disableInputs()
        document.querySelector("#detail").classList.toggle("collapsed")
        document.querySelector("#lijst").classList.toggle("collapsed")

        dataLoc = ev.target.parentElement.dataset.location
        showDetail()
    }
}

async function fillConsolesTable() {
    let consolesTable = document.getElementById("consolesTable")
    let result = await fetch("http://localhost:3000/api/consoles")
    let consoles = await result.json()

    let allConsoleIDNodes = document.querySelectorAll(".console-id");
    allConsoleIDNodes.forEach( a => consolesTable.removeChild(a))
    consoles.forEach(c => consolesTable.append(createRow(c)))

    function createRow(consol) {
        let tr = document.createElement("tr")
        tr.classList.add("console-id")
        tr.setAttribute("data-location", consol._links.self)
        tr.append(
            createCell(consol.id),
            createCell(consol.consol),
            createCell(consol.generation)
        )
        function createCell(txt){
            let cell = document.createElement("td");
            cell.append(txt)
            return cell
        }
        function createDeleteButton() {
            let button = document.createElement("button")
            button.classList.add("deleteButton")
            button.innerText = "Delete"
            return button
        }
        tr.append(createCell(createDeleteButton()))
        return tr
    }
}

//Show detail window
async function showDetail() {
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


async function showInputScreen(ev) {
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
            let newConsole =  document.querySelectorAll("tr.console-id")[nr-1]
            await showDetail(newConsole.dataset.location)

            ev.target.innerText = "New"
        } catch (e) {
            console.log(e)
        }
    }

}

async function editConsole(ev) {
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

function disableInputs() {
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = true
        })
}





