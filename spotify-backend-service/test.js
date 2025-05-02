// import SpotifyWebApi from "spotify-web-api-node";
// import dotenv from 'dotenv';
// dotenv.config();


// const spotifyApi=new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//   });
// // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(spotifyApi)));

// console.log(spotifyApi.getAccessToken())

import request from "request";
var options = {
  'method': 'GET',
  'url': 'https://accounts.spotify.com/authorize?client_id=b1e0b525ccf94699a5790241d28e329e&redirect_uri=http://127.0.0.1:5000/&response_type=code',
  'headers': {
    'Cookie': '__Host-device_id=AQCxYcpQCjfVXKFvFi9Jkh-dPWtJ7QwzrrHzNNRs0XrQtRyNZ4hrWKHqj7uiR-CSAYvEr7eNd1skQpu3Zi3H5r8HNHMoncqrNpw; __Host-sp_csrf_sid=2c9b27bde0f84cb03ee1f7ff108dfe2e4c0d07370a28cea6029e73c078584404; __Secure-TPASESSION=AQA7UnoUX6J9eayqpxASBesKGM8O38jHJ1rgUJekHjQINMfDCB6lE4A4TG98rizL8mhHGhbaKgra2txokJ7NvSwgmJzMrnWnCmY=; inapptestgroup=; sp_sso_csrf_token=013acda719cc3be6cc463e6adea2a3c38e2de28a1131373435383333373235353235; sp_tr=false'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
//   console.log(response.body);
  console.log(response.statusCode)
});
