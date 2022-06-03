import {consolesTable} from "./commonUI.js";
import {searchField} from "./commonUI.js";
import {showConsoleDetail} from "./detailPanel.js";
import {disableInputs} from "./detailPanel.js";
import {showGamesForConsole} from "./detailPanel.js";

//let editButton;
export let dataLoc;

export async function searchConsoles(event) {
    event.preventDefault()
    //let searchFieldValue =
    let searchFieldValue = (searchField.value)
        ? `http://localhost:3000/api/consoles?search=${searchField.value}`
        :`http://localhost:3000/api/consoles`

    try {
        await fillConsolesTable(searchFieldValue)
    } catch (e) {
        console.log(e.message)
    }
}


export async function handleConsoleTable(ev) {
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
            alert("startup server by typing in terminal > nodemon src/js/restClient.js, "+ e.message)
        }
    }
}

export async function fetchData(dataLoc,type,Data) {
    const response = await fetch(dataLoc, {
        method: type,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: Data
    })
    if (!response.ok) {
        if (response.status === 404){//if not consoles are found
            return []
            } else {// if any other error, eg server is down
            console.log(response.status.toString())
            const errorMessage = await response.text();
            throw new Error(errorMessage)}
    }else if (type ==="GET"){
        return response.json()
    }else {
        return await response.text()
    }
}



export async function fillConsolesTable(searchFieldValue) {
    let consoles
    try {
        consoles = await fetchData(searchFieldValue??"http://localhost:3000/api/consoles","GET");
    } catch (e) {
        throw new Error("startup server by typing in terminal > nodemon src/js/restClient.js, "+ e.message)
    }

    let allConsoleIDNodes = document.querySelectorAll(".console-id");
    allConsoleIDNodes.forEach( a => consolesTable.removeChild(a))
    if (consoles.length !== 0) {consolesTable.innerHTML += '<thead class="console-id"><tr><th>ID</th><th>Console</th><th>Generation</th></tr></thead>'}
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