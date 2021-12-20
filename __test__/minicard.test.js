/**
 * @jest-environment jsdom
 */

import "regenerator-runtime/runtime";
import { miniCard, deleteMiniCard } from "../src/client/js/minicard.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        longtitude: "7.49508",
        latitude: "9.05785",
        countryId: 2352778,
        countryName: "Nigeria",
        description: "Few clouds",
        temperature: 27.6,
        imgLink:
          "https://pixabay.com/get/gbfaff742c9c76d3fe43ec89355dde911378dcaf946d9eba1dfab110927950c0acd9a633a5220e4ee6ada3267110058b78b4ba23214e2d08a5966cfda72c68f49_640.jpg",
        tag: "kayak, kayaking, paddle",
        total: 1,
      }),
  })
);
let localStorage = {};
localStorage.getItem = jest.fn((key) => {
  return [
    {
      longtitude: "7.49508",
      latitude: "9.05785",
      countryId: 2352778,
      countryName: "Nigeria",
      description: "Few clouds",
      temperature: 27.6,
      imgLink:
        "https://pixabay.com/get/gbfaff742c9c76d3fe43ec89355dde911378dcaf946d9eba1dfab110927950c0acd9a633a5220e4ee6ada3267110058b78b4ba23214e2d08a5966cfda72c68f49_640.jpg",
      tag: "kayak, kayaking, paddle",
      total: 1,
    },
  ];
});
JSON.parse = jest.fn((data) => {
  return [
    {
      longtitude: "7.49508",
      latitude: "9.05785",
      countryId: 2352778,
      countryName: "Nigeria",
      description: "Few clouds",
      temperature: 27.6,
      imgLink:
        "https://pixabay.com/get/gbfaff742c9c76d3fe43ec89355dde911378dcaf946d9eba1dfab110927950c0acd9a633a5220e4ee6ada3267110058b78b4ba23214e2d08a5966cfda72c68f49_640.jpg",
      tag: "kayak, kayaking, paddle",
      total: 1,
    },
  ];
});
beforeEach(() => {
  fetch.mockClear();
});

describe("Testing minicard", () => {
  test("the fetch fails with an error", () => {
    const result = `<div class="mini-card">
            <div class="mini-img">
              <img
                src="https://pixabay.com/get/gbfaff742c9c76d3fe43ec89355dde911378dcaf946d9eba1dfab110927950c0acd9a633a5220e4ee6ada3267110058b78b4ba23214e2d08a5966cfda72c68f49_640.jpg"
                alt="kayak, kayaking, paddle"
                class="mini-img"
              />
            </div>
            <div class="mini-content">
              <h3>Abuja</h3>
              <p class="result-text">Countdown: 5 days and I feel excited!</p>
              <p class="weather">
                Temperature: 27.6°C <br />
                Description: Few clouds
              </p>
            </div>
            <div class="mini-button">
              <span><i class="form-icon fas fa-trash-alt"></i></span>
            </div>
          </div>`;
    const parameter = {
      longtitude: "7.49508",
      latitude: "9.05785",
      countryId: 2352778,
      countryName: "Nigeria",
      description: "Few clouds",
      temperature: 27.6,
      imgLink:
        "https://pixabay.com/get/gbfaff742c9c76d3fe43ec89355dde911378dcaf946d9eba1dfab110927950c0acd9a633a5220e4ee6ada3267110058b78b4ba23214e2d08a5966cfda72c68f49_640.jpg",
      tag: "kayak, kayaking, paddle",
      total: 1,
      days: 5,
      feel: "excited",
      destination: "Abuja",
    };

    const template = miniCard(parameter);

    expect(template).toEqual(result);
  });
});

describe("Testing the delete minicard", () => {
  test("the fetch fails with an error", () => {
    document.body.innerHTML = `
           <section id="trip-list">         
        </section>
        <button class="mini-button">Delete Me</button>
  `;

    deleteMiniCard(0);

    expect(JSON.parse).toHaveBeenCalled();
  });
});
