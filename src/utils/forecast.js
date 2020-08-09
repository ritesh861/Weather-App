const request=require('postman-request')

const forecast=(latitude,longitude,callback)=>{
  const url='http://api.weatherstack.com/current?access_key=0e5d9f2592c3e315cd5f9260dd250af5&query='+latitude+','+longitude
  request({url ,json:true},(error,{body}={})=>{
    if(error){
      callback('cant connect to weather stack',undefined)
    }else if(body.error){
      callback('unable to find location',undefined)
    }else{
      const data={
        weather_description:body.current.weather_descriptions[0],
        temp:body.current.temperature,
        feelsLike:body.current.feelslike,
        weather_icon:body.current.weather_icons[0]
      }
      console.log(body)
      callback(undefined,data)
    }
  })
}

module.exports=forecast
