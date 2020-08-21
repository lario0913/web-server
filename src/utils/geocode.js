const request = require('request')

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibGFyaW8iLCJhIjoiY2tkdWU0YWdhMDU3cDJ6b3N4eHEyaW04ZyJ9.SeTcohA4_W2r60t17X3myw'

    request({url: geoUrl, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location specified', undefined)
        } else if (response.body.messagae) {
            callback("Unable to locate map, check the url and try again")
        }else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
             
        }
    })
}

module.exports = geocode