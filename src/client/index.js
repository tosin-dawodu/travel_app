// JS file for client side ie manipulating the DOM
const form = document.getElementById("form-id");
const location = document.getElementById("location");
const destination = document.getElementById("destination");
const date = document.getElementById("date");
const feel = document.getElementById("feel");
const searchButton = document.getElementById("search-button");
const state = document.getElementById("state");
const currentLocation = document.getElementById("current-location");
const contentDestination = document.getElementById("content-destination");
const contentDate = document.getElementById("content-date");
const contentFeel = document.getElementById("content-feel");
const contentTemp = document.getElementById("content-temp");
const contentDescription = document.getElementById("content-descrip");
// const weather = document.getElementById("weather");
const img = document.getElementById("img");
let saveButton = document.getElementById("save-button");
const deleteButton = document.getElementById("delete-button");
const tripList = document.getElementById("trip-list");
let cardContent = {};
const tripCard = document.getElementById("trip-card");
const dynamicText = document.getElementById("extra-text");

import "./styles/body.scss";
import "./styles/footer.scss";
import "./styles/header.scss";

// dynamic text for the extra div
const travelTalk = [
  "Adventures are the best way to learn",
  "I have not been everywhere, but it is on my list.",
  "Life is either a daring adventure or nothing at all ~ Helen Keller",
  " The real voyage of discovery consists not in seeking new landscapes, but in having new eyes. ~ Marcel Proust",
  "Traveling: it leaves you speechless, then turns you into a storyteller. ~ Ibn Battuta",
  "Travel makes one modest. You see what a tiny place you occupy in the world. ~ Gustave Flaubert",
];

setInterval(() => {
  const talkCount = Math.floor(Math.random() * 6);
  dynamicText.innerHTML = travelTalk[talkCount];
}, 20000);

// calling API responses
async function callBackend(destination, days) {
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
  try {
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
    };
    let savedCards = JSON.parse(localStorage.getItem("savedCards"));
    console.log(savedCards);
    if (!savedCards) {
      savedCards = [];
    }
    savedCards.push(cardContent);
    localStorage.setItem("savedCards", JSON.stringify(savedCards));
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

const updateUi = (responseJson) => {
  state.innerHTML = destination.value;
  currentLocation.innerHTML = location.value;
  contentDestination.innerHTML = destination.value;
  contentDate.innerHTML = date.value;
  contentFeel.innerHTML = `I feel ${feel.value}!`;
  contentTemp.innerHTML = `Temperature: ${responseJson.temperature}°C`;
  contentDescription.innerHTML = `Description: ${responseJson.description}`;
  img.src = responseJson.imgLink;
  img.setAttribute("alt", responseJson.tag);
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

const checkRequired = () => {
  if (location.value == "" || destination.value == "" || date.value == "") {
    return false;
  }
  return true;
};

searchButton.addEventListener("click", () => {
  if (checkRequired() == false) {
    alert("Please fill required field");
    return;
  }

  const currentDate = new Date();
  const expectedDate = new Date(date.value);
  //alert for a past date
  if (expectedDate < currentDate) {
    alert("You're not travelling to the past, please input a valid date");
    return;
  }
  // console.log("testing testing testing", date.value);
  const diffTime = Math.abs(expectedDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  callBackend(destination.value, diffDays + 1);
});

// to create dynamic main card
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
  saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", () => {
    const savedCards = JSON.parse(localStorage.getItem("savedCards"));
    console.log(savedCards);
    let template = "";
    savedCards.forEach((value) => {
      template += miniCard(value);
    });
    tripList.innerHTML = template;
  });
};

// to create dynamic minicard
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

// for the save button

const saveButtonClick = () => {
  const savedCards = JSON.parse(localStorage.getItem("savedCards"));
  console.log(savedCards);
  let template = "";
  savedCards.forEach((value) => {
    template += miniCard(value);
  });
  tripList.innerHTML = template;
};
const deleteMiniCard = ()=> {
  
}