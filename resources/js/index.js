let currenteventscards = "";

let CurrentCard = document.getElementById("CurrentCards")

for(let event of data.events){
    currenteventscards += 
    `
    <div class="col mb-4">
        <div class="card h-100 text-bg-dark">
            <img src="${event.image}" class="card-img-top" style="height:10rem">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
            </div>    
            <div class="card-footer d-flex justify-content-between"> 
                <h6>${event.price}</h6>               
                <a href="./details.html" class="btn btn-outline-danger">Details ></a>
            </div>
        </div>
    </div>
    `
} CurrentCard.innerHTML = currenteventscards;