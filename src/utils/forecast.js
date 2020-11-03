const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=df5bc2345ec3f6fbc92c3b058514c710&query="+ latitude + "," + longitude + "&units=f"
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to retrieve weather data!", undefined)
        }else if(body.error) {
            callback("Unable to find location!", undefined)
        }else{
            callback(undefined, {
                weather_type: body.current.weather_descriptions[0],
                temprature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast; 