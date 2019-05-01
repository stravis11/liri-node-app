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
  var queryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  console.log(queryUrl);
  axios
    .get(queryUrl)
    .then(response => {
      var bandData = response.data;
      if (!bandData.length) {
        console.log(`No results found for ${artist}`);
        return;
      }
      console.log("Accessing Bands In Town API...");
      console.log(`Upcoming concerts for ${artist}: `);
      response.data.forEach(event => {
        console.log("------------------------------------");
        console.log(`Venue: ${event.venue.name}`);
        console.log(`Location: ${event.venue.city}, ${event.venue.country}`);
        console.log(
          "Conecrt Date: ",
          moment(event.datetime).format("MM/DD/YYYY")
        );
      });
    })
    .catch(err => {
      console.log(`Error occurred: ${err}`);
    });

  // spotify-this-song command using Spotify API
} else if (nodeArg[2] === "spotify-this-song") {
  var song = nodeArg[3];
  if (!song) song = "The Sign by Ace of Base";
  console.log("Accessing Spotify API...");
  spotify
    .search({ type: "track", query: `${song}` })
    .then(data => {
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Preview URL: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
    })
    .catch(err => {
      console.log(`Error occurred: ${err}`);
    });

  // movie-this command using IMDB API
} else if (nodeArg[2] === "movie-this") {
  var movieName = nodeArg[3];
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }
  var queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=full&tomatoes=true&apikey=trilogy`;
  console.log("Accessing OMDB API...");
  axios
    .get(queryUrl)
    .then(movieData => {
      console.log(`Title: ${movieData.data.Title}`);
      console.log(`Year: ${movieData.data.Year}`);
      console.log(`Rated: ${movieData.data.Rated}`);
      console.log(`IMDB Rating: ${movieData.data.Ratings[0].Value}`);
      console.log(`Rotten Tomato Rating: ${movieData.data.Ratings[1].Value}`);
      console.log(`Production Country: ${movieData.data.Country}`);
      console.log(`Language: ${movieData.data.Language}`);
      console.log(`Plot: ${movieData.data.Plot}`);
      console.log(`Actors: ${movieData.data.Actors}`);
    })
    .catch(err => {
      console.log(`Error occurred: ${err}`);
    });
}
