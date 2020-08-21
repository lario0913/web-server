const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b8db6ec9da22287ebaacbc4fdbf711c7&query=' + lat + ',' + long
    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location specified', undefined)
        }else if (response.body.error){
            callback('unable to forecast the location, please check the coordinates and try again', undefined)
        }else{
            callback(undefined, {
                weather : response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast