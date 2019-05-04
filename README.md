# liri-node-app

LIRI searches Spotify for songs, Bands In Town for concerts, and OMDB for movies.

Liri is a node application. To install the necessary npm packages, cd into the folder and then run:

```
npm install

```

# Commands to run LIRI

```
node liri.js concert-this '<band/artist name here>'
node liri.js spotify-this-song '<song name here>'
node liri.js movie-this '<movie name here>'
node liri.js do-what-it-says
```

The do-what-it-says commands reads and executes the command listed in the random.txt file.

LIRI will log all output to the log.txt file.

![](liri.gif)

Video of LIRI working: [LIRI Video Demo](https://youtu.be/P59XWLEYJZg)

GitHub Repo: https://github.com/stravis11/liri-node-app

# Technologies Used

- JavaScript
- node.js
- Axios
- Spotify API
- Bands In Town API
- OMDB API
