const tablebodymain = document.getElementById("tablebody-main");
const tBodyUpcoming = document.getElementById("tablebody-UE");
const tBodyPast = document.getElementById("tablebody-PE");

async function statsCardsFnc() {
    try {
        var eventsData = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        eventsData = await eventsData.json()
    } catch (error) {
        console.log("Not working...", error);
        throw new Error("We couldnt get API data. Try again later.");
    }

    const eventsDateInfo = eventsData.currentDate
    const eventsDataInfo = eventsData.events

    eventsDataInfo.map(event => {
        if (event.assistance !== undefined) {
            event.earnings = event.price * event.assistance
            event.percentage = 100 * event.assistance / event.capacity
        } else {
            event.earnings = event.price * event.estimate
            event.percentage = 100 * event.estimate / event.capacity
        }
    })

    let eventsUpcoming = eventsDataInfo.filter(event => event.date > eventsDateInfo)
    let eventsPast = eventsDataInfo.filter(event => event.date < eventsDateInfo)
    let categoryUpcoming = [...new Set(eventsUpcoming.map(event => event.category))]
    let categoryPast = [...new Set(eventsPast.map(event => event.category))]

    categoryUpcoming.map(category => {
        let eventsUp = eventsUpcoming.filter(event => event.category === category)
        return filter(eventsUp, 'estimate')
    }).forEach(array => createStats(array, tBodyUpcoming))

    categoryPast.map(category => {
        let eventsPasted = eventsPast.filter(event => event.category === category)
        return filter(eventsPasted, 'assistance')
    }).forEach(array => createStats(array, tBodyPast))

    function filter(events, property) {

        let categorysData = {
            category: "",
            earnings: 0,
            capacity: 0,
            [property]: 0
        }
        let stats = events.reduce((event1, event2) => {
            return {
                category: event2.category,
                earnings: event1.earnings + event2.earnings,
                capacity: event1.capacity + event2.capacity,
                [property]: event1[property] + event2[property]
            }
        }, categorysData)
        stats.percentage = (100 * stats[property] / stats.capacity).toFixed(1)
        return stats

    }

    let eventsAssistance = eventsDataInfo.filter(event => event.assistance !== undefined).sort((a, b) => a.percentage - b.percentage)

    let eventsCapacity = eventsDataInfo.sort((a, b) => b.capacity - a.capacity)

    let eventsAssCap = [eventsAssistance, eventsCapacity]


    createStatsGeneral(eventsAssCap)
}

statsCardsFnc()

function createStatsGeneral(eventsGeneral) {
    tablebodymain.innerHTML +=
        `
    <tr>
        <td class="text-secondary fw-semibold">${eventsGeneral[0][eventsGeneral[0].length - 1].name}</td></td>
        <td class="text-secondary fw-semibold">${eventsGeneral[0][0].name}</td>
        <td class="text-secondary fw-semibold">${eventsGeneral[1][0].name}</td>
    </tr>
    `
}

function createStats(category, container) {
    container.innerHTML +=
        `
    <tr>
        <td class="text-secondary fw-semibold">${category.category}</td></td>
        <td class="text-secondary">$${category.earnings.toLocaleString("en-GB")}</td>
        <td class="text-secondary">${category.percentage}%</td>
    </tr>
    `
}