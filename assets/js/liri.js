require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var nodeArg = process.argv;
var moment = require("moment");

// concert-this command using Bands In Town API
if (nodeArg[2] === "concert-this") {
  var artist = nodeArg[3];
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      var bandData = response.data;
      if (!bandData.length) {
        console.log(`No results found for ${artist}`);
        return;
      }
      console.log("Accessing Bands In Town API...");
      console.log(`Upcoming concerts for ${artist}: `);
      response.data.forEach(event => {
        console.log("====================================");
        console.log(`Venue: ${event.venue.name}`);
        console.log(`Location: ${event.venue.city}, ${event.venue.country}`);
        console.log(
          "Conecrt Date: ",
          moment(event.datetime).format("MM/DD/YYYY")
        );
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  // spotify-this-song command using Spotify API
} else if (nodeArg[2] === "spotify-this-song") {
  var song = nodeArg[3];
  console.log("Accessing Spotify API...");
  spotify.search({ type: "track", query: `${song}` }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
}
