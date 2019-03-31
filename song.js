var fs = require('fs');

const Song = function(artist, song, preview, album) {
    this.artist = artist,
    this.song = song,
    this.preview = preview,
    this.album = album,

    this.printSong = function() {
        let songinfo = "Artist: " + artist + "\n"
        + "Song title: " + song + "\n"
        + "Preview link: " + preview + "\n"
        + "Album song is from: " + album + "\n\n"
        fs.appendFile("log.txt", songinfo, function(err) {
            if (err) throw err;
            console.log(songinfo)
        })
    }
}

module.exports = Song;