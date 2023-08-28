let pastEventsCards = [];

let oldCard = document.getElementById("oldCards")

for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate < currentDate) 
    {
        pastEventsCards += 
        `
        <div class="col mb-4">
            <div class="card past-card h-100 text-bg-dark border-dark">
                <div class="card-header">
                    ${event.place}
                </div>
                <img src="${event.image}" class="card-img-top" style="height:10rem">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>    
                <div class="card-footer d-flex justify-content-between"> 
                    <h6><b>Assistance: </b>${event.assistance}</h6>              
                    <a href="#" class="btn btn-outline-light">Passed</a>
                </div>
            </div>
        </div>
        `
    }
} oldCard.innerHTML = pastEventsCards;