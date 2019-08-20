const express =require('express');
const cors = require('cors');
require('dotenv').config();

const app =express();
app.use(cors());

//localhost:3000/location?location=Blah
app.get('/location', (request, response) => {
    try{
        const geoData = require('./geo.json');
        const location = new Location(request.query.location, geoData)
        response.send(location);
    } catch(error){
        response.status(500).send("Sorry! Something went wrong.")
    }
    
});

app.get('/weather', (request, response) => {
    const darkData = require('./darkysky.json');

    let weatherResults = []

    darkData.daily.data.forEach(day => {
        weatherResults.push(new Weather(day));
    });

    response.send(weatherResults);
});


function Location(query, geoData){
    this.search_query = query,
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
    
}
function Weather(darkData){
    let rawTime = darkData.time;
    this.forcast = darkData.summary;
    this.time = new Date (rawTime * 1000).toString().slice(0,15);
};

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server is listening');
});

