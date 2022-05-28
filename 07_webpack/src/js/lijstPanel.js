import {showDetail} from "./detailPanel.js";
import {consolesTable} from "./commonUI.js";
import {searchField} from "./commonUI.js";
//let editButton;
export let dataLoc;

export async function searchConsoles(event) {
    event.preventDefault()
    //let searchFieldValue =
    let searchFieldValue = (searchField.value)
        ? `http://localhost:3000/api/consoles?search=${searchField.value}`
        :`http://localhost:3000/api/consoles`

    fillConsolesTable(searchFieldValue)

}

export async function handleConsoleTable(ev) {
    if (ev.target.classList.contains("deleteButton")) {
        //console.log(ev)
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
        await fillConsolesTable()

    } else {
        if (document.querySelector("#detail").classList.contains("collapsed")) {
            document.querySelector("#detail").classList.remove("collapsed")
            document.querySelector("#lijst").classList.add("collapsed")
        }
        dataLoc = ev.target.parentElement.dataset.location
        //console.log(dataLoc)
        await showDetail(dataLoc)
    }
}



export async function fillConsolesTable(searchFieldValue) {
    let result = await fetch(searchFieldValue??`http://localhost:3000/api/consoles`)
    let consoles
    if (result.status === 404){
        consoles = []
    } else {
        consoles = await result.json()
    }

    let allConsoleIDNodes = document.querySelectorAll(".console-id");
    //console.log(allConsoleIDNodes)
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