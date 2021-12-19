import { miniCard } from "./minicard";

// to create dynamic main card for the form output
const tripCard = document.getElementById("trip-card");
let saveButton = document.getElementById("save-button");
let cardContent = {};

const mainCard = (data) => {
  let template = `
          <section class="results">
            <div id="result-content">
              <h2 id="state">${data.destination}</h2>
              <h3 class="result-text">
                From <span id="current-location">${data.location}</span> , I am
                travelling to
                <span id="content-destination">${data.destination}</span> on
                <span id="content-date">${data.date}</span> and
                <span id="content-feel">I feel ${data.feel}!</span>
              </h3>
              <p class="weather" id="weather">
                <span id="content-temp">Temperature: ${data.temperature}°C </span> <br />
                <span id="content-descrip"> Description: ${data.description}</span>
              </p>
            </div>
            <div class="result-img">
              <img
                src="${data.imgLink}"
                id="img"
                alt="${data.tag}"
              />
            </div>
          </section>
          <section id="result-button">
            <div>
              <button id="save-button" class="trip-button">Save</button>
            </div>
            <div>
              <button id="delete-button" class="trip-button">Delete</button>
            </div>
          </section>
        `;
  tripCard.innerHTML = template;

  //removing the main card (delete button)
  document.getElementById("delete-button").addEventListener("click", () => {
    document.querySelector(".results").remove();
    document.querySelector("#result-button").remove();
  });

  //adding the mini cards (save button) to the grid

  saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", () => {
    let savedCards = JSON.parse(localStorage.getItem("savedCards"));
    if (!savedCards) {
      savedCards = [];
    }
    savedCards.push(cardContent);
    localStorage.setItem("savedCards", JSON.stringify(savedCards));
    console.log(savedCards);
    let template = "";
    savedCards.forEach((value) => {
      template += miniCard(value);
    });
    tripList.innerHTML = template;
    Array.from(document.querySelectorAll(".mini-button")).forEach(
      (value, index) => {
        value.addEventListener("click", () => {
          deleteMiniCard(index);
        });
      }
    );
  });
};
const reloadMiniCards = () => {
  const savedCards = JSON.parse(localStorage.getItem("savedCards"));
  console.log(savedCards);
  let template = "";
  savedCards.forEach((value) => {
    template += miniCard(value);
  });
  tripList.innerHTML = template;
  Array.from(document.querySelectorAll(".mini-button")).forEach(
    (value, index) => {
      value.addEventListener("click", () => {
        deleteMiniCard(index);
      });
    }
  );
};
export { mainCard };
