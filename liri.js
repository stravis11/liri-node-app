require("dotenv").config();
const axios = require("axios");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const command = process.argv[2];
const data = process.argv.slice(3);
const moment = require("moment");
const fs = require("fs");

// concert-this function using Bands In Town API
function concertThis(artist) {
  var queryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
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
          "Concert Date: ",
          moment(event.datetime).format("MM/DD/YYYY")
        );
      });
    })
    .catch(err => {
      console.log(`Error occurred: ${err}`);
    });
}

// spotify-this-song function using Spotify API
function spotifySongs(song) {
  if (song.length == 0) song = "The Sign by Ace of Base";
  console.log("Accessing Spotify API...");
  spotify
    .search({ type: "track", query: `${song}` })
    .then(data => {
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      fs.appendFile(
        "log.txt",
        `Artist: ${data.tracks.items[0].artists[0].name}\n`,
        err => {
          if (err) throw err;
        }
      );
      console.log(`Song: ${data.tracks.items[0].name}`);
      fs.appendFile("log.txt", `Song: ${data.tracks.items[0].name}\n`, err => {
        if (err) throw err;
      });
      console.log(`Preview URL: ${data.tracks.items[0].external_urls.spotify}`);
      fs.appendFile(
        "log.txt",
        `Preview URL: ${data.tracks.items[0].external_urls.spotify}\n`,
        err => {
          if (err) throw err;
        }
      );
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      fs.appendFile(
        "log.txt",
        `Album: ${data.tracks.items[0].album.name}\n`,
        err => {
          if (err) throw err;
          fs.appendFile("log.txt", "--------------------\n", err => {
            if (err) throw err;
          });
        }
      );
    })
    .catch(err => {
      console.log(`Error occurred: ${err}`);
    });
}

// movie-this function using IMDB API
function movieThis(movieName) {
  if (movieName.length == 0) movieName = "Mr Nobody";
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

// do-what-it-says function using fs
function doWhatItSays() {
  console.log("Accessing random.txt file...");
  fs.readFile("random.txt", "utf8", (err, textFile) => {
    if (err) {
      console.log(`Error occurred: ${err}`);
    }
    let input = textFile.split(",")[1];
    spotifySongs(input);
  });
}

function userInput(command, data) {
  if (command === "concert-this") {
    concertThis(data);
  } else if (command === "spotify-this-song") {
    spotifySongs(data);
  } else if (command === "movie-this") {
    movieThis(data);
  } else if (command === "do-what-it-says") {
    doWhatItSays();
  } else {
    console.log(
      "Invalid command. Please use concert-this, spotify-this-song, movie-this, or do-what-it-says"
    );
  }
}
userInput(command, data);
