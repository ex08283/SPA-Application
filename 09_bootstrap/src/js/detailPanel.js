import {dataLoc} from "./lijstPanel.js";
import {fillConsolesTable} from "./lijstPanel.js";
import {fetchData} from "./lijstPanel.js";
import {detailImage} from "./commonUI.js";


//Show details of console
export function showConsoleDetail(consoleDetail) {
    // document.querySelectorAll(".lijst thead").forEach(a=> a.classList.add("text-white bg-primary fw-bold"))
    // document.querySelectorAll(".page h1").forEach(a=> a.classList.add("text-white bg-primary fw-bold"))

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
    if (consoleDetail.image === ""){
        console.log(detailImage)
        detailImage.classList.add("d-none")
    } else {
        detailImage.classList.remove("d-none")
    }

    console.log(consoleDetail)

    let imgURl = document.getElementById("image");
    imgURl.setAttribute("value", consoleDetail.image)

    detailImage.width = "400";
    detailImage.heigth = "500";
    consoleDetail.image.valueOf()
        ?detailImage.src = consoleDetail.image
        :detailImage.src = ""

    disableInputs()

}

//Show table of games of console
export function showGamesForConsole(gamesForConsole) {
    let gameCards = document.getElementById("gameCards")

    let allGameCardNodes = document.querySelectorAll("#gameCards > div");
    for (const gameCardNode of allGameCardNodes) {
        gameCards.removeChild(gameCardNode)
    }

    for (let game of gamesForConsole) {
        console.log("append")
        gameCards.append(createCardGame(game))
    }

    function createCardGame(gameAt) {
        let cardCol = document.createElement("div")
        cardCol.classList.add("col-8")
        cardCol.classList.add("col-lg-4")
        cardCol.classList.add("col-xl-3")

        let card = document.createElement("div")
        card.classList.add("card")
        card.classList.add("border-primary")

        let cardHeader = document.createElement("div")
        cardHeader.classList.add("d-flex")
        cardHeader.classList.add("justify-content-between")
        cardHeader.classList.add("card-header")
        cardHeader.classList.add("text-center")
        cardHeader.classList.add("text-primary")
        cardHeader.classList.add("bg-info")
        let rlDateDiv = document.createElement("div");
        rlDateDiv.append(gameAt.releaseDate);
        let idDiv = document.createElement("div");
        idDiv.append(gameAt.id);
        cardHeader.append(rlDateDiv,idDiv)


        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        cardBody.classList.add("text-center")
        cardBody.classList.add("py-4")

        let cardTitle = document.createElement("h3")
        cardTitle.classList.add("card-title")
        cardTitle.append(gameAt.name)

        let cardBodyAtt = document.createElement("p")
        //cardBodyAtt.classList.add("display-5")
        cardBodyAtt.classList.add("my-4")
        cardBodyAtt.classList.add("text-primary")
        cardBodyAtt.classList.add("fw-bold")
        cardBodyAtt.append(gameAt.multiplayerOnline?"Online":"Ofline")

        cardBody.append(cardTitle,cardBodyAtt)

        card.append(
            cardHeader,
            cardBody,
        )
        cardCol.append(card)
        return cardCol
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