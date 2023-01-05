const encodedParams = new URLSearchParams();
encodedParams.append("q", "English is hard, but detectably so what do you say");

const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
  body: encodedParams,
};

fetch(
  "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// const axios = require("axios");

// const encodedParams = new URLSearchParams();
// encodedParams.append("q", "Hello, world!");
// encodedParams.append("target", "es");
// encodedParams.append("source", "en");

// const options = {
//   method: "POST",
//   url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "Accept-Encoding": "application/gzip",
//     "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
//     "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
//   },
//   data: encodedParams,
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
