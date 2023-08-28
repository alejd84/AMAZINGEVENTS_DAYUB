let upcomingEventsCards = [];

let upcomingCard = document.getElementById("upcomingCards")

for(let event of data.events)
{
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate > currentDate) 
    {
        upcomingEventsCards += 
        `
        <div class="col mb-4">
            <div class="card h-100 text-bg-dark">
                <div class="card-header">
                    ${event.place}
                </div>                
                <img src="${event.image}" class="card-img-top" style="height:10rem">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>    
                <div class="card-footer d-flex justify-content-between"> 
                    <h6><b>Date: </b>${event.date}</h6>                 
                    <a href="./details.html" class="btn btn-outline-danger">Details ></a>
                </div>
            </div>
        </div>
        `
    }
} upcomingCard.innerHTML = upcomingEventsCards;