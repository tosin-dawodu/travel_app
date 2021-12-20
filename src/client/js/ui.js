// assigning the values to the respective tags
const form = document.getElementById("form-id");
const state = document.getElementById("state");
const currentLocation = document.getElementById("current-location");
const contentDestination = document.getElementById("content-destination");
const contentDate = document.getElementById("content-date");
const contentFeel = document.getElementById("content-feel");
const contentTemp = document.getElementById("content-temp");
const contentDescription = document.getElementById("content-descrip");
const img = document.getElementById("img");
const deleteButton = document.getElementById("delete-button");

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

// form.addEventListener("submit", (evt) => {
//   evt.preventDefault();
// });

export { updateUi };
