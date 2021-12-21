const form = document.getElementById("form-id");
const location = document.getElementById("location");
const destination = document.getElementById("destination");
const date = document.getElementById("date");
const feel = document.getElementById("feel");
const searchButton = document.getElementById("search-button");
let saveButton = document.getElementById("save-button");
const deleteButton = document.getElementById("delete-button");
const tripList = document.getElementById("trip-list");
let cardContent = {};
const tripCard = document.getElementById("trip-card");
const dynamicText = document.getElementById("extra-text");

import "./styles/body.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import { travelTalk } from "./js/extra.js";
import { miniCard, deleteMiniCard } from "./js/minicard.js";
// import { updateUi } from "./js/ui.js";

if (form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

// dynamic text for the extra div
setInterval(() => {
  const talkCount = Math.floor(Math.random() * 6);
  if (dynamicText) {
    dynamicText.innerHTML = travelTalk[talkCount];
  }
}, 20000);

// calling API responses
async function callBackend(destination, days) {
  try {
    const response = await fetch("http://localhost:3030/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: destination,
        days: days,
      }),
      credentials: "same-origin",
    });
    if (response.status != 200) {
      alert("Please input valid destination");
      return;
    }
    const responseJson = await response.json();
    cardContent = {
      imgLink: responseJson.imgLink,
      tag: responseJson.tag,
      description: responseJson.description,
      temperature: responseJson.temperature,
      location: location.value,
      destination: destination,
      feel: feel.value,
      days: days - 1,
      total: responseJson.total,
    };
    const dataObject = {
      ...responseJson,
      destination: destination,
      location: location.value,
      date: date.value,
      feel: feel.value,
    };
    mainCard(dataObject);
  } catch (error) {
    console.log(error);
  }
}

const checkRequired = () => {
  if (location.value == "" || destination.value == "" || date.value == "") {
    return false;
  }
  // if the destination is invalid, return an alert "input valid location eg a city"
  return true;
};

if (searchButton) {
  searchButton.addEventListener("click", () => {
    if (checkRequired() == false) {
      alert("Please fill required field");
      return;
    }

    // checking for valid date value and calculating the days difference
    const currentDate = new Date();
    const expectedDate = new Date(date.value);
    if (expectedDate < currentDate) {
      alert("You're not travelling to the past, please input a valid date");
      return;
    }
    const diffTime = Math.abs(expectedDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    callBackend(destination.value, diffDays + 1);
  });
}

// to create dynamic main card for the form output
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
