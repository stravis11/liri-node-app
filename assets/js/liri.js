require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var nodeArg = process.argv;
var moment = require("moment");

// console.log(keys);
// console.log(spotify);

// concert-this command accessing Bands In Town API
if ((nodeArg[2] = "concert-this")) {
  var artist = nodeArg[3];
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      var bandDate = response.data[0].datetime;
      console.log("Accessing Bands In Town API...");
      console.log(`Venue: ${response.data[0].venue.name}`);
      console.log(
        `Location: ${response.data[0].venue.city}, ${
          response.data[0].venue.country
        }`
      );
      bandDate = moment(bandDate, "YYYY-MMTHH:mm:ss").format("MM/DD/YY");
      console.log(`Date: ${bandDate}`);
    })
    .catch(function(error) {
      console.log(error);
    });
}
