const request = require('postman-request')




const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=1185cb949540ce495bd2225691909944&query=' + latitude + ','+ longitude 
    request({ url, json: true }, (error,response) => {
        if(error)
        {
           callback('Unable to connect app',undefined)
        }
        else if(response.body.error){
            //console.log(response.body.error.info)
            callback(response.body.error.info,undefined)
           }
       else{
               const result = {
                   forecast : 'The current temperature outside is  ' + response.body.current.temperature + ' degree C, but it feels like ' + response.body.current.feelslike +' degree C and the humidity is ' +response.body.current.humidity +' percent period.' ,
               }
               callback(undefined, result.forecast )
       }
    }
    )
   }

   module.exports = forecast