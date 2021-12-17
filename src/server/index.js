// JS file for the server side ie for APIs and co

const dotenv = require("dotenv");
const https = require("https");
const http = require("http");
dotenv.config();
const API_KEY = process.env.API_KEY1;
var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(3030, function () {
  console.log("Travel app: listening on port 3030!");
});

const geoUrl = "http://api.geonames.org/searchJSON";
const weatherBitUrl = "http://api.weatherbit.io/v2.0/forecast/daily";
const pixaBayUrl = "https://pixabay.com/api/";

app.post("/result", async function (req, res) {
  try {
    const geoRes = await geoNames(req.body.destination);
    const weatherRes = await weatherBit(
      geoRes.latitude,
      geoRes.longtitude,
      req.body.days
    );
    const pixaRes = await pixaBay(req.body.destination);
    const totalResponse = {
      ...geoRes,
      ...weatherRes,
      ...pixaRes,
    };
    res.send(totalResponse);
  } catch (error) {
    res.send(error);
  }
});
// create a request for the geonames API using the destination as the query
// request for the longitude and latitude which will be passed into the other API requests
const geoNames = (destination) => {
  return new Promise((resolve, reject) => {
    http
      .get(
        `${geoUrl}?q=${destination}&username=${process.env.GEO_USERNAME}`,
        (res) => {
          let chunks = [];
          res
            .on("data", (d) => {
              chunks.push(d);
            })
            .on("end", (d) => {
              let data = Buffer.concat(chunks);
              const geoResponse = JSON.parse(data);
              // console.log(geoResponse);
              const geoObject = geoResponse.geonames[0];
              const geoData = {
                longtitude: geoObject.lng,
                latitude: geoObject.lat,
                countryId: geoObject.geonameId,
                countryName: geoObject.countryName,
              };
              resolve(geoData);
            });
          res.on("error", (error) => {
            console.log(error);
            reject(error);
          });
        }
      )
      .on("error", (e) => {
        console.error(e);
      });
  });
};

// create a request for the weatherbits API using the lat and long obtained from geonames as the query
// since an array of the days will be returned, explain
const weatherBit = (lat, long, days) => {
  // console.log(days);
  return new Promise((resolve, reject) => {
    http
      .get(
        `${weatherBitUrl}?lat=${lat}&lon=${long}&days=${days}&key=${process.env.WEATHER_KEY}`,
        (res) => {
          let chunks = [];
          res
            .on("data", (d) => {
              chunks.push(d);
            })
            .on("end", (d) => {
              let data = Buffer.concat(chunks);
              const weatherResponse = JSON.parse(data);
              // console.log(weatherResponse);
              const weatherObject = weatherResponse.data[days - 1];
              const weatherData = {
                description: weatherObject.weather.description,
                temperature: weatherObject.temp,
              };
              resolve(weatherData);
            });
          res.on("error", (error) => {
            console.log(error);
            reject(error);
          });
        }
      )
      .on("error", (e) => {
        console.error(e);
      });
  });
};

const pixaBay = (destination) => {
  return new Promise((resolve, reject) => {
    https
      .get(
        `${pixaBayUrl}?key=${process.env.PIXA_KEY}&q=${destination}&orientation=horizontal&category=travel`,
        (res) => {
          let chunks = [];
          res
            .on("data", (d) => {
              chunks.push(d);
            })
            .on("end", (d) => {
              let data = Buffer.concat(chunks);
              const pixaResponse = JSON.parse(data);
              const pixaObject = pixaResponse.hits[0];
              const pixaData = {
                imgLink: pixaObject.webformatURL,
                tag: pixaObject.tags,
              };
              resolve(pixaData);
            });
          res.on("error", (error) => {
            console.log(error);
            reject(error);
          });
        }
      )
      .on("error", (e) => {
        console.error(e);
      });
  });
};
