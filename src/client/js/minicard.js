// to create dynamic minicard
// let saveButton = document.getElementById("save-button");

// import { dataObject } from "../index/js";
const tripList = document.getElementById("trip-list");

const miniCard = (data) => {
  let template = `  <div class="mini-card">
            <div class="mini-img">
              <img
                src="${data.imgLink}"
                alt="${data.tag}"
                class="mini-img"
              />
            </div>
            <div class="mini-content">
              <h3>${data.destination}</h3>
              <p class="result-text">Countdown: ${data.days} days and I feel ${data.feel}!</p>
              <p class="weather">
                Temperature: ${data.temperature}°C <br />
                Description: ${data.description}
              </p>
            </div>
            <div class="mini-button">
              <span><i class="form-icon fas fa-trash-alt"></i></span>
            </div>
          </div>`;
  return template;
};

// for saving mini cards to the local storage

const saveButtonClick = () => {
  const savedCards = JSON.parse(localStorage.getItem("savedCards"));
  console.log(savedCards);
  let template = "";
  savedCards.forEach((value) => {
    template += miniCard(value);
  });
  tripList.innerHTML = template;
};
// for the delete button in the mini cards
const deleteMiniCard = (index) => {
  let savedCards = JSON.parse(localStorage.getItem("savedCards"));
  savedCards = [...savedCards.slice(0, index), ...savedCards.slice(index + 1)];
  localStorage.setItem("savedCards", JSON.stringify(savedCards));
  reloadMiniCards();
};
export { miniCard, saveButtonClick, deleteMiniCard };
