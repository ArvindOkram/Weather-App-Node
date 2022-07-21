const request = require('request')

const forcast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a51694ece9650c3c4a90dee847f7cc9e&query='+latitude+','+longitude+'&limit=1'
 
    request({url: url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to locaion services!',undefined)
        }else if(body.error){
            callback('Unable to find location, try another search!',undefined)
        }else{
            callback(undefined,'The temperature at '+body.location.region+' is '+body.current.temperature+' and it feels like '+body.current.feelslike+', the overall weather description is '+body.current.weather_descriptions+'.')
        }
    }) 
 }

 module.exports = forcast