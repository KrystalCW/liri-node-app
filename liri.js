require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');


var liriCommand = process.argv[2];
var query = process.argv[3];

var results = [];

function runLiri() {
    if (query !== undefined && query.indexOf(" ")) {
        query = query.replace(/\s/g, "+");
    }
    if (liriCommand === "movie-this"){
        if (query === undefined) {
            query = 'Mr. Nobody';
        }
        omdbQuery();
    } else if (liriCommand === "concert-this") {
        if (query === undefined) {
            query = 'first aid kit';
            console.log(query);
            // console.log(bandsintownqueryURL);
        }
        bandsintownQuery();
    } else if (liriCommand === "spotify-this-song") {
        if (query === undefined) {
            query = "the+sign";
        }
        spotifyQuery();
    } else if (liriCommand === "do-what-it-says") {
        randomQuery();
    }
}

function omdbQuery() {
    var omdbqueryURL= "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
    axios.get(omdbqueryURL).then(
        function(response) {
            var data = response.data;
            console.log("Movie name: "+ query + "\n"
                + "Year movie came out: " + data.Year + "\n"
                + "imdb Rating: " + data.imdbRating  + "\n"
                + "Country: " + data.Country + "\n"
                + "Language: " + data.Language + "\n"
                + "Plot: " + data.Plot + "\n"
                + "Actors: " + data.Actors);
        }
    )
}

function bandsintownQuery() {
    var bandsintownqueryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    console.log(query);
    console.log(bandsintownqueryURL);
    axios.get(bandsintownqueryURL).then(
        function(response) {
            var data = response.data;
            results = [];
            data.forEach(function(response) {
                results.push({name: response.venue.name,
                location: response.venue.city + ", " + response.venue.country,
                dateOfEvent: moment(response.datetime).format("LLL"),
                })
            })
            console.log(results);
            }
    )
}

function spotifyQuery() {
   var spotify = new Spotify(keys.spotify);
   results = [];
   var indices = [];
   spotify.search({ type: "track", query: query, limit: 10 }, function(error, data) {
       if(error) {
           console.log(error)
       } else {
            data.tracks.items.forEach(function(response) {
                results.push({artist: response.artists[0].name,
                song: response.name,
                preview: response.external_urls.spotify,
                album: response.album.name});
            });
       }
       if (query !== "the+sign") {
           console.log(results)
       } else if (query === "the+sign") {
           searchResults();
       }
       function searchResults() {
        for (var i = 0; i < results.length; i++) {
            var index = (results[i].artist).indexOf("Ace of Base");
            indices.push(index);
         }
        }
        var thisIsTheOne = indices.indexOf(0);
        console.log(results[thisIsTheOne]);
   })
}

function randomQuery() {
    fs.readFile('random.txt', function(error, data) {
        if(error) {
            console.error.log(error)
        } else {
            var newRandom = (String(data).split(","));
            liriCommand = newRandom[0];
            query = newRandom[1];
            console.log(liriCommand, query);
            runLiri();
        }
    })
}

runLiri();