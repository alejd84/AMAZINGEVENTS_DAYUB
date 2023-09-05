const containerDetails = document.getElementById("detailedCards");

let eventsData = data.events
let id = location.search.slice(4)
let eventDetails = eventsData.filter(event => id == event._id)
eventDetails = eventDetails[0]

createCardDetail(eventDetails)

//TEST3 TO CREATE CARDS
function createCardDetail(event) {
    let AorE
    if (event.assistance !== undefined) {
        AorE = ['Assistance', event.assistance]
    } else {
        AorE = ['Estimate', event.estimate]
    }
    containerDetails.innerHTML = `
    <div class="card text-bg-dark mb-3 col-12 col-lg-10 shadow" id="nocardshadowmoveid">
        <div class="row g-3">
            <div class="col-md-4">
                <img src="${event.image}" class="img-fluid rounded-start"
                    alt="${event.name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="card-footer text-muted">
                    <ul
                        class="list-group list-group-flush d-flex flex-row flex-wrap justify-content-around">
                        <li
                            class="list-group-item d-flex align-items-center justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-grid" viewBox="0 0 16 16">
                                <path
                                    d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                            </svg>
                            &nbsp; Category: ${event.category}
                        </li>
                        <li
                            class="list-group-item d-flex align-items-center justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-calendar-date" viewBox="0 0 16 16">
                                <path
                                    d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>
                            &nbsp; Date: ${event.date}
                        </li>
                        <li
                            class="list-group-item d-flex align-items-center justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            &nbsp; Place: ${event.place}
                        </li>
                    </ul>
                </div>
                <div class="card-footer text-muted">
                    <ul
                    class="list-group list-group-flush d-flex flex-row flex-wrap justify-content-around">
                        <li
                            class="list-group-item d-flex align-items-center justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-door-closed" viewBox="0 0 16 16">
                                <path
                                    d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                            </svg>
                            &nbsp; Capacity: ${event.capacity}
                        </li>
                        <li
                            class="list-group-item d-flex align-items-center justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                        </svg>
                            &nbsp; ${AorE[0]} : ${AorE[1]}
                        </li>
                        <li
                            class="list-group-item d-flex align-items-center justify-content-between">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-tag" viewBox="0 0 16 16">
                                <path
                                    d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                                <path
                                    d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                            </svg>
                            &nbsp; Price: ${event.price}
                        </li>
                    </ul>
                </div>
                <div class="detailsBtns d-flex flex-row justify-content-around align-items-center">
                    <a class="buttongoback detailsClass m-3" href="#" onclick="history.back();" aria-label="Go Back"><i
                    class="fa fa-chevron-left"></i><span class="ml-half"> Go Back</span></a>
                    <a class="button button-primary button-ghost button-shine detailsClasss m-3" href="#" aria-label="Buy Ticket"><i
                    class="fa fa-credit-card"></i><span class="ml-half"> Buy Ticket</span></a>
                </div>
            </div>
        </div>
    </div>    
    `
}