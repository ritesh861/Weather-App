const request=require('postman-request')

const geocode=(address,callback)=>{

  const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicml0ZXNoODYxIiwiYSI6ImNrZDRhNTNhcTF2NHczMXBnb3FwdHp4MGMifQ.5KidR4kxWSyZ2abrHl6AzQ'

  request({url ,json:true},(error,{body}={})=>{

  if(error){
    callback('cant connect to mapbox',undefined)
  }else if(body.features.length===0){

    callback('cant find the location',undefined)

  }else{

    const data={
       longitude:body.features[0].center[0],
       latitude:body.features[0].center[1],
       place:body.features[0].place_name,}

       callback(undefined,data)
      }
})}

module.exports=geocode
