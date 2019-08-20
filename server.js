const express =require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');

const app =express();
app.use(cors());

//localhost:3000/location?location=Blah
//route for location
app.get('/location', (request, response) => {
    try{
        superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY`)
        const location = new Location(request.query.location, geoData)
        response.send(location);
    } catch(error){
        response.status(500).send("Sorry! Something went wrong.")
    }
    
});

//route for weather
app.get('/weather', (request, response) => {
    try{const darkData = require('./darkysky.json');
        let weatherResults = [];
        //fills weatherResults array 
        darkData.daily.data.forEach(day => {
        //grabs JSON stuff and adds to weather array
        weatherResults.push(new Weather(day)); 
        });
        response.send(weatherResults);
        } 
    catch(error){
    response.status(500).send("Sorry! Something went wrong.")
    }
    //return results
});

//location contstructor
function Location(query, geoData){
    this.search_query = query,
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
    
}
//weather contruction
function Weather(darkData){
//unformatted day in seconds
    let rawTime = darkData.time;
    this.forecast = darkData.summary;
//use built in Date constructor. This example is odd because it has time in seconds.
//(0, 15): first and last characters
    this.time = new Date (rawTime * 1000).toString().slice(0,15);
};

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server is listening');
});

