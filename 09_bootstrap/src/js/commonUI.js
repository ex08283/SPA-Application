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
export let detailImage;
export let searchField;
export let consolesTable;

export default async function start() {
    consolesTable = document.querySelector("#consolesTable");
    newButton = document.querySelector("#newButton");
    showAllConsoles = document.querySelector("#showAllConsoles");
    editButton = document.querySelector("#editButton");
    searchButton = document.querySelector("#consoleSearch");
    searchField = document.getElementById("searchConsoleField");
    detailImage = document.querySelector("#detail img");
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

    document.querySelectorAll("#lijst h1").forEach(a=> {
        a.classList.add("text-white");
        a.classList.add("bg-primary");
        a.classList.add("fw-bold");
        a.classList.add("text-center");
    })
    document.querySelectorAll("#lijst thead").forEach(a=> {
        a.classList.add("text-white");
        a.classList.add("bg-primary");
        a.classList.add("fw-bold");
    })

    document.querySelectorAll("#detail h1,h2").forEach(a=> {
        a.classList.add("text-white");
        a.classList.add("bg-primary");
        a.classList.add("fw-bold");
    })


    document.getElementById("searchButton").classList.add("btn");
    document.getElementById("searchButton").classList.add("btn-outline-primary");
    document.getElementById("searchButton").classList.add("btn-info");


    document.getElementById("newButton").classList.add("btn");
    document.getElementById("newButton").classList.add("btn-outline-primary");
    document.getElementById("newButton").classList.add("btn-info");

    document.getElementById("showAllConsoles").classList.add("btn");
    document.getElementById("showAllConsoles").classList.add("btn-outline-primary");
    document.getElementById("showAllConsoles").classList.add("btn-dark");

    document.getElementById("editButton").classList.add("btn");
    document.getElementById("editButton").classList.add("btn-outline-primary");
    document.getElementById("editButton").classList.add("btn-secondary");

    document.querySelectorAll("#consolForm div").forEach(a => {
        if (a.children[1].getAttribute("type") === "text") {
            //Opdracht:"Op een medium scherm worden de labels van de tekst inputs niet getoond"
            a.children[0].classList.add("d-md-none")
            a.children[0].classList.add("d-lg-block")
        }
    })



    // document.querySelectorAll("#lijst thead").forEach(a=> a.classList.add("text-white bg-primary fw-bold"))
    // document.querySelectorAll("#detail thead").forEach(a=> a.classList.add("text-white bg-primary fw-bold"))
    // document.querySelectorAll("#detail h1").forEach(a=> a.classList.add("text-white bg-primary fw-bold"))
}