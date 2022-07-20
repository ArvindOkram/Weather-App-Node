const request = require('request')

const geocode = (address,callback) => {
   const url = 'http://api.positionstack.com/v1/forward?access_key=be8ca573f43fe413dee2b565df178144&query='+address+'&limit=1'
   
   request({url: url,json:true}, (error,{body} = {})=>{ 
        if(error){
            callback('Unable to connect to locaion services!',undefined)
        }else if(body.data.length === 0){
            callback('Unable to find location, try another search!',undefined)
        }else{
            callback(undefined,
                {latitude:body.data[0].latitude,
                 longitude:body.data[0].longitude,
                 location:body.data[0].name})
        }
   }) 
}

module.exports = geocode
