const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=df5bc2345ec3f6fbc92c3b058514c710&query="+ latitude + "," + longitude + "&units=f"
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to retrieve weather data!", undefined)
        }else if(body.error) {
            callback("Unable to find location!", undefined)
        }else{
            callback(undefined, "it is " + body.current.weather_descriptions[0] + " with a temprature of " + body.current.temperature + ", but it feels like " + body.current.feelslike + "\n Other Information:\n" + 
            + "Humidity: " + body.current.humidity + "\n"
            + "Wind Direction: " + body.current.wind_dir + "\n" 
            + "Region:" + body.location.region +", " + body.location.country
            

)
        }
    })
}

module.exports = forecast; 