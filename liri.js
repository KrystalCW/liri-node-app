require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');

var Concert = require("./concert");
var Song = require("./song.js");

var blankLine = "\n---------------------------------------\n\n";


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
            const data = response.data;
            let movieInfo = [
                "Movie name: " + data.Title,
                "Year movie came out: " + data.Year,
                "imdb Rating: " + data.imdbRating,
                "Country: " + data.Country, 
                "Language: " + data.Language,
                "Plot: " + data.Plot,
                "Actors: " + data.Actors,
            ].join("\n\n");
            fs.appendFile("log.txt", movieInfo + blankLine, function(err) {
                if (err) throw err;
                console.log(movieInfo);
            })
        }
    )
}

function bandsintownQuery() {
    var bandsintownqueryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    console.log(bandsintownqueryURL);
    axios.get(bandsintownqueryURL).then(
        function(response) {
            var something = response.data;
            something.forEach(function(res) {
                let correctDate = moment(res.datetime).format("MM/DD/YYYY");
                let newConcert = new Concert(`${res.venue.name}`, `${res.venue.city}`, `${res.venue.country}`, `${correctDate}`);
                newConcert.printConcert();
            })
        })
}

function spotifyQuery() {
   var spotify = new Spotify(keys.spotify);
   spotify.search({ type: 'track', query: query, limit: 10 }, function(error, data) {
       if(error) {
           console.log(error)
       } else {
            data.tracks.items.forEach(function(response) {
                var newSong = new Song(`${response.artists[0].name}`, `${response.name}`, `${response.external_urls.spotify}`, `${response.album.name}`);
                results.push(newSong);
                if (query !== "the+sign") {
                    newSong.printSong();
                } else if (query === "the+sign") {
                    searchResults();
                }

                function searchResults() {
                    if (newSong.artist === "Ace of Base") {
                        newSong.printSong();
                    }                  
                }
            });
       }
   })
}

function randomQuery() {
    fs.readFile('random.txt', function(error, data) {
        if(error) {
            console.error.log(error)
        } else {
            var newRandom = (String(data).split(", "));
            liriCommand = newRandom[0];
            query = newRandom[1];
            console.log(liriCommand, query);
            runLiri();
        }
    })
}

runLiri();