var fs = require('fs');

const Concert = function(name, locationcity, locationcountry, date) {
    this.name = name,
    this.locationcity = locationcity,
    this.locationcountry = locationcountry,
    this.date = date,
    

    this.printConcert = function() {
        let concertinfo = "Venue: "+ name + "\n" 
        + "City: " + locationcity + "\n" 
        + "Country: " + locationcountry 
        + "Date: " + "\n" + date + "\n\n"
        fs.appendFile("log.txt", concertinfo, function(err) {
            if (err) throw err;
            console.log(concertinfo);
        })
    }
}

module.exports = Concert;