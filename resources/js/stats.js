let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function includeAllDataFnc() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        let passedEventsArray = filterEvents(data, "past")
        let passedEventsArray0 = filterEventsInfo1(passedEventsArray)
        let passedEventsSorted = sortEventsByPercentage(passedEventsArray0)
        createTopEvents(passedEventsSorted)

        let upcomingEventsArray = filterEvents(data, "upcoming")
        let upcomingEventsArray1 = filterEventsInfo2(upcomingEventsArray)
        let upcomingEventsGroups = groupEventsByCategory(upcomingEventsArray1)
        createCategoryTable(upcomingEventsGroups, "upcoming")

        let passedEventsArray1 = filterEventsInfo2(passedEventsArray)
        let passedEventsGroups = groupEventsByCategory(passedEventsArray1)
        createCategoryTable(passedEventsGroups, "past")
    }
    catch (error) {
        console.log("We couldnt get API data. Try again later.", error);
    }
}
includeAllDataFnc();

const filterEvents = (arrayData, time) => {
    let filteredArray = []
    if (time == "past") {
        filteredArray = arrayData.events.filter(event => event.date < arrayData.currentDate);
    } else if (time == "upcoming") {
        filteredArray = arrayData.events.filter(event => event.date >= arrayData.currentDate);
    }
    return filteredArray
}

const filterEventsInfo1 = (arrayData) => {
    let results = []
    arrayData.forEach(event => {
        let result = {};
        result.id = event._id
        result.name = event.name
        result.capacity = event.capacity
        result.percentage = (100 * event.assistance) / event.capacity;
        results.push(result)
    });
    return results
}

const sortEventsByPercentage = (arrayData) => {
    let sortedEvents = arrayData.sort(
        (e1, e2) => (e1.percentage < e2.percentage) ? 1 : (e1.percentage > e2.percentage) ? -1 : 0);
    return sortedEvents
}

const sortEventsByCapacity = (arrayData) => {
    let sortedEvents = arrayData.sort(
        (e1, e2) => (e1.capacity < e2.capacity) ? 1 : (e1.capacity > e2.capacity) ? -1 : 0);
    return sortedEvents
}

const createTopEvents = (arrayData) => {
    const haRows = document.querySelectorAll(".highAssist")
    const laRows = document.querySelectorAll(".lowAssist")
    const lcRows = document.querySelectorAll(".largeCapacity")
    for (let i = 0; i < 3; i++) {
        haRows[i].innerHTML =
            `
            <a href="./details.html?id=${arrayData[i].id}">${arrayData[i].name} </a>
            <span>(${(arrayData[i].percentage).toFixed(2)}%)</span>
            `
    }

    arrayData.reverse()
    for (let i = 0; i < 3; i++) {
        laRows[i].innerHTML =
            `
            <a href="./details.html?id=${arrayData[i].id}">${arrayData[i].name} </a>
            <span>(${arrayData[i].percentage.toFixed(2)}%)</span>
            `
    }

    const byCapacityFnc = sortEventsByCapacity(arrayData)
    for (let i = 0; i < 3; i++) {
        lcRows[i].innerHTML =
            `
            <a href="./details.html?id=${byCapacityFnc[i].id}">${byCapacityFnc[i].name} </a>
            <span>(${byCapacityFnc[i].capacity} people)</span>
            `
    }
}

const filterEventsInfo2 = (arrayData) => {
    let results = []
    arrayData.forEach(event => {
        let result = {};
        result.category = event.category
        result.revenues = (event.price * event.estimate) || (event.price * event.assistance)
        result.percentage = (100 * event.estimate) / event.capacity || (100 * event.assistance) / event.capacity;
        results.push(result)
    });
    return results
}

const groupEventsByCategory = (arrayData) => {
    let categoriesUnique = []
    arrayData.forEach(event => {
        if (!categoriesUnique.includes(event.category)) {
            categoriesUnique.push(event.category);
        }
    })
    categoriesUnique.sort()
    let grouped = []
    categoriesUnique.forEach(categor => {
        let cat = {}
        cat.category = ''
        cat.revenues = 0
        cat.percentage = 0
        cat.events = 0
        arrayData.forEach(event => {
            if (event.category == categor) {
                cat.category = categor
                cat.revenues += event.revenues
                cat.percentage += event.percentage
                cat.events++
            }
        })
        cat.percentage = cat.percentage / cat.events
        grouped.push(cat)
    })
    return grouped
}

const createCategoryTable = (arrayData, time) => {
    let id = ''
    if (time == "upcoming") {
        id = "tablebody-UE"
    } else if (time == "past") {
        id = "tablebody-PE"
    }
    const table = document.getElementById(id)
    arrayData.forEach(event => {
        table.innerHTML +=
            `
            <tr>
                <td>${event.category}</td>
                <td>$ ${event.revenues}</td>
                <td>
                    <div class="progress" role="progressbar" aria-valuenow="${event.percentage.toFixed(2)}" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: ${event.percentage.toFixed(2)}%">${event.percentage.toFixed(2)}%</div>
                    </div>
                </td>
            </tr>
            `
    })
}