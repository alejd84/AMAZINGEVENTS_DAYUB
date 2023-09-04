const containerCheckbox = document.getElementById('checkboxes');
const containerCards = document.getElementById("currentCards");
const containernoresultsCards = document.getElementById("noresultsCards");
const title = document.getElementById("title");
const searchId = document.getElementById("searchId");

async function getallEvents() {
    const eventsDate = data.currentDate
    const eventsData = data.events

    const alleventsCards = eventsData.map((element) => element)

    const currentEvents = alleventsCards.filter(() => title.text.includes('Home'))
    const upcomingEvents = alleventsCards.filter(() => title.text.includes('Upcoming')).filter(element => element.date > eventsDate)
    const passedEvents = alleventsCards.filter(() => title.text.includes('Past')).filter(element => element.date < eventsDate)

    let allEvents = [...currentEvents, ...upcomingEvents, ...passedEvents]
    allEvents.forEach(createCard)

    const categories = alleventsCards.reduce((allCategories, event) => Array.from(new Set([...allCategories, event.category])), [])

    categories.forEach(createCheckbox)

    let checkBoxId = Array.from(document.querySelectorAll('.checkId'))
    checkBoxId.forEach(checkbox => checkbox.addEventListener("click", filterCheckCards))

    searchId.addEventListener('input', filterCheckCards)

    function filterCheckCards() {
        let filteredChecks = checkEvents(allEvents)
        let filteredSearch = filterCardsBySearch(filteredChecks, searchId.value)
        if (filteredSearch.length !== 0) {
            containerCards.innerHTML = ``
            containernoresultsCards.innerHTML = ``
        }
        filteredSearch.forEach(createCard)
    }

    function checkEvents(array) {
        let checkboxChecked = checkBoxId.filter(check => check.checked).map(checkCategory => checkCategory.value)
        if (checkboxChecked.length > 0) {
            let filteredCheckBox = array.filter(event => checkboxChecked.includes(event.category))
            return filteredCheckBox
        }
        return array
    }
}

function createCheckbox(category) {
    let label = document.createElement("label")
    label.classList.add("d-flex", "align-items-center", "p-1")

    let input = document.createElement("input")
    input.type = "checkbox"
    input.classList.add("checkboxes", "checkId", "custom-checkbox", "categories")
    input.checked = true
    input.name = category
    input.value = category
    input.id = category
    input.setAttribute("aria-label", category)

    let span = document.createElement("span")
    span.textContent = ">" + category

    label.appendChild(input)
    label.appendChild(span)
    containerCheckbox.appendChild(label)
}

function filterCardsBySearch(array, texto) {
    let cardsFilterForSearch = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()));
    if (cardsFilterForSearch.length === 0) {
        searchEmpty()
        return []
    }
    return cardsFilterForSearch
}

function searchEmpty() {
    containerCards.innerHTML = ``
    containernoresultsCards.innerHTML =
        `
    <div class="card noresultsclass" id="noresultsmsgid" role="alert" aria-label="No results found">
        <img src="./resources/images/main/404.png" alt="No results found">
    </div>
    <a href="./index.html"" aria-label="Try again searching by categories">
        <p>TRY AGAIN SEARCHING BY CATEGORIES</p>
    </a>
    `;
}

function createCard(array) {
    containerCards.innerHTML +=
        `
        <div class="col mb-4">
            <div class="card h-100 text-bg-dark">
                <div class="card-header">
                    ${array.place}
                </div>        
                <img src="${array.image}" class="card-img-top" style="height:10rem" alt="${array.name}">
                <div class="card-body text-start pt-1">
                    <p class="card-text fs-6 p-0 mb-1 text-secondary">${array.category}</p>
                    <h5 class="card-title">${array.name}</h5>
                    <p class="card-text card-descr fs-6">${array.description}</p>
                </div>
                <div class="card-footer pt-3 pb-3 d-flex justify-content-between align-items-center align-items-xl-baseline">
                    <p class="mb-0 d-flex flex-row flex-md-column flex-xl-row">
                        <span>
                            <i class="bi bi-calendar3-event" aria-hidden="true"></i>
                            <span class="visually-hidden">Date:</span>&nbsp;
                        </span>
                        ${array.date}
                    </p>
                    <a class="button button-primary button-ghost button-shine detailsClass" href="./details.html?id=${array._id}" aria-label="Details for ${array.name}"><span>Details</span></a>
                </div>
            </div>
        </div>  
    `;
}

getallEvents()