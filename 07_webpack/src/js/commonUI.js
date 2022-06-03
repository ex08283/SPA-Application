import {handleConsoleTable} from "./lijstPanel.js";
import {fillConsolesTable} from "./lijstPanel.js";
import {showInputScreen} from "./detailPanel.js";
import {editConsole} from "./detailPanel.js";
import {disableInputs} from "./detailPanel.js";
import {searchConsoles} from "./lijstPanel.js";

//HTML elements
let newButton;
let showAllConsoles;
let editButton;
let searchButton;
export let searchField;
export let consolesTable;

export default async function start() {
    consolesTable = document.querySelector("#consolesTable");
    //
    // try {
    //     await fillConsolesTable()
    // } catch (e) {
    //     alert(e.message)
    // }
    newButton = document.querySelector("#newButton");
    showAllConsoles = document.querySelector("#showAllConsoles");
    editButton = document.querySelector("#editButton");
    searchButton = document.querySelector("#consoleSearch");
    searchField = document.getElementById("searchConsoleField")
    addEventHandlers();
}

function addEventHandlers(){
    newButton.addEventListener("click",showInputScreen)
    showAllConsoles.addEventListener("click", () => {
            disableInputs()
            document.querySelector("#newButton").innerHTML = "New"
            document.querySelector("#editButton").innerHTML = "Edit"
            document.querySelector("#detail").classList.add("collapsed")
            document.querySelector("#lijst").classList.remove("collapsed")
        })

    editButton.addEventListener("click", editConsole)
    searchButton.addEventListener("submit", searchConsoles)
    consolesTable.addEventListener("click", handleConsoleTable)
}