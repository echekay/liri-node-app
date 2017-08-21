// Psuedocode
// ----------
// For twitter portion, user types in twitter argument, node will then display my 20 latest tweets.
// For Spotify command, user types in song name, node will then display artist name, song name, preview link from Spotify, and the album that the song is from. If no song is provided, liri will default to rick roll song.
//For OMDB command, user types in movie name and node displays 8 properties that are in the response object pertaining to that movie. If no movie gets displayed, program will default display response object for "The Room".
//For "do what it says" command, LIRI will use the text inside random.txt and perform one of LIRI's command.


// Incomplete tasks that need to be finished:
// ---------------------------------------------
// Need to have default song display if program is unable to fetch user requested song data.
//Need to have default movie info display if program is unable to locate the user's request.
// Have to implement the do-what-it-says function components so that it'll display the correct data from the random.txt to be called within the spotify function.


// Global Variables
// ----------------
var keys = require("./keys.js");
var request = require("request");
var input = process.argv;
var commands = input[2];

//
// Main switch-case statement to figure out which function gets run.
// -------------------------
switch (commands) {
  case "my-tweets":
    myTweets();
    break;

   case "spotify-this-song":
    spotifyThisSong();
    break;

   case "movie-this":
    movieThis();
    break;

   case "do-what-it-says":
    doWhatItSays();
    break;
}


// Functions
// ---------

// If the "my-tweets" function gets called, run:
function myTweets() {

  var Twitter = require("twitter");
  var twit = keys.twitterKeys;
  var client = new Twitter(twit);
  var params = {
    screen_name: "howdydoody_dood",
    count: 20
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      tweets.forEach(tweet => console.log("\nTweet: " + tweet.text + "\nTweet created at: " + tweet.created_at + "\n-----------"));
    } else if (error) {
      console.log(error);
    }
  })
}

// If the "spotify-this-song" function gets called, run:
function spotifyThisSong() {
  var Spotify = require("node-spotify-api");
  var spot = keys.spotifyKeys;
  var spotify = new Spotify(spot);
  var userSong = "";
  for (var i = 3; i < input.length; i++) {
    userSong = userSong + " " + input[i];
  }
  spotify.search({ type: 'track', query: userSong }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var itemArray = data.tracks.items;
    itemArray.forEach(function callback(currentTrack, index) {
        console.log(`Track: ${index + 1}`);
        console.log(currentTrack.artists[0].name || "No artist available");
        console.log(currentTrack.name || "No song name available");
        console.log(currentTrack.preview_url || "No preview available");
        console.log(currentTrack.album.name || "No album name available");
    });
  });
}


// If the "movie-this" function gets called, run:
// Find out what the correct properties of the response object needs to be.
function movieThis() {
  var movieInput = " ";
  for (var i = 3; i < input.length; i++) {
    movieInput = movieInput + " " + input[i];
  }
  request("http://www.omdbapi.com?t=" + movieInput + "&plot=short&apikey=40e9cece", function(error, response, body) {
    if (error) {
      console.log("If you haven't watched 'The Room', then you should: http://www.imdb.com/title/tt0368226/?ref_=nv_sr_1");
      console.log("It's probably not on Netflix, but that shouldn't deter you from trying to enjoy this mastercraft of filming!");
    } else if (!error && response.statusCode === 200) {
      var object = JSON.parse(body);
      // console.log(object);
      console.log("-----------------");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("----------------");
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("----------------");
      console.log(object.Ratings[0].Source + " Rating: " + object.Ratings[0].Value);
      console.log("----------------");
      console.log(object.Ratings[1].Source + " Rating: " + object.Ratings[1].Value);
      console.log("----------------");
      console.log("Countries: " + object.Country);
      console.log("----------------");
      console.log("Languages: " + object.Language);
      console.log("----------------");
      console.log("Plot: " + object.Plot);
      console.log("----------------");
      console.log("Actors: " + object.Actors);
    }
  });
}


// If the "do-what-it-says" function gets called, run:
function doWhatItSays() {
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    spotifyThisSong(data);
  });
}

// -------------------------------------------------------------
