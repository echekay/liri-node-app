// 7. At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

var keys = require("./keys.js");
var input = process.argv;
var commands = process.argv[2];


// Write a switch-case statement to figure out which function gets run.
switch (commands) {
  case "my-tweets":
    myTweets();
    break;

   case "spotify-this-song":
    spotifyThisSong(input[3]);
    break;

   case "movie-this";
    movieThis(input[3]);
    break;

   case "do-what-it-says";
    doWhatItSays(input[3]);
    break;
}

// -------------------------------------------------------------
// Functions
// ---------

// If the "my-tweets" function gets called, run:
function myTweets() {

}

// If the "spotify-this-song" function gets called, run:
function spotifyThisSong() {

}

// If the "movie-this" function gets called, run:
function movieThis() {

}

// If the "do-what-it-says" function gets called, run:
function doWhatItSays() {

}

// -------------------------------------------------------------