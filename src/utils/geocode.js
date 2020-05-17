const request = require('postman-request')




const geocode = (location,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1Ijoic2h3ZXRhMTIwNCIsImEiOiJja2EwMW5veWUwZHBjM21xcjE4bWJqem5vIn0.n1mn5gRRFogswp_yfRnRBQ'
 
    request({ url :url, json: true}, (error, response) =>{
        if(error)
        {
            callback('Unable to connect app', undefined)
        }
        else if (response.body.features.length === 0)
        {
               callback('Unable to find the data for this location, please try again', undefined)
        }
        else
        {
            const result ={
             latitude : response.body.features[0].center[1],
             longitude : response.body.features[0].center[0]
            }
            callback(undefined, result)
            
        }

         
    })

}


module.exports = geocode