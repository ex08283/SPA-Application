//start up server:
// 1) navigate to 04_express folder by typing in the terminal>cd 04_express
// 2) start up the server by typing in the terminal>nodemon server.js


///let consoles;
addEventListener("load", start)
var dataLoc;

async function start() {
    try {
        await fillConsolesTable()
    } catch (e) {
        console.log(e.message)
    }

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

        try {
            const responseData = await fetchData(dataLoc, "DELETE");
            //console.log(responseData)
            await fillConsolesTable()
        } catch (e) {
            alert("Something went wrong, the console cannot be deleted, "+ e.message)
        }



    } else {
        disableInputs()
        document.querySelector("#detail").classList.toggle("collapsed")
        document.querySelector("#lijst").classList.toggle("collapsed")
        dataLoc = ev.target.parentElement.dataset.location

        try {
            showConsoleDetail(await fetchData(dataLoc,"GET"))
            showGamesForConsole(await fetchData(dataLoc + "/games","GET"))
        } catch (e) {
            alert("Something went wrong, the console details could not be dsisplayed, "+ e.message)
        }
    }
}


async function fetchData(dataLoc,type,Data) {
        const response = await fetch(dataLoc, {
            method: type,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: Data
        })
        if (!response.ok) {
            console.log(response.status.toString())
            const errorMessage = await response.text();
            throw new Error(errorMessage)
        }else if (type ==="GET"){
            return response.json()
        }else {
            return await response.text()
        }
}

async function fillConsolesTable() {
    let consolesTable = document.getElementById("consolesTable")
    let consoles
    try {
        consoles = await fetchData("http://localhost:3000/api/consoles","GET");
    } catch (e) {
        throw new Error("Something went wrong, the server could not retrieve the consoles, "+ e.message)
    }

    console.log(consolesTable.innerHTML)

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


//Show details of console
function showConsoleDetail(consoleDetail) {
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

async function editConsole(ev) {
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

function enableInputs(){
    document.querySelector("#generation").removeAttribute("disabled");
    document.querySelector("#handheld").removeAttribute("checked");

    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = false;
            a.setAttribute("value", "")
        })
}

function disableInputs() {
    document.querySelector("#generation").setAttribute("disabled","disabled");
    document.querySelectorAll("#consolFs input")
        .forEach(a => {
            a.disabled = true
        })
}





