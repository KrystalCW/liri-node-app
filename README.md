# liri-node-app

Liri is an application that searches on 4 basic terms:

- movie-this
- concert-this
- spotify-this-song
- do-what-it-says

-- **movie-this** searches IMDB for a movie's
-- Name, Rating, Country, Language, Plot, and Actors
--(if nothing is specified, "Mr. Nobody" is the default search term)

-- **concert-this** searches Bands in Town API for
-- band's upcoming concerts
--(if nothing is specified, "First Aid Kit" is the default search term)

-- **spotify-this-song** searches Spotify's API for the top 10 songs associated with the search term
--(if nothing is specified, "The Sign" by Ace of Base is the default search term)

-- **do-what-it-says** searches random.txt for instructions to either *movie-this*, *concert-this*, or *spotify-this-song* and a search term


Not only does the application log all of this information to the console, it also saves it to log.txt