console.log("js is on")




const weatherForm=document.querySelector('form')
const  search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
const icon=document.getElementById('icon')


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location=search.value
msg1.textContent='loading.....'
msg2.textContent=''
  fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
      return  msg1.textContent=data.error
      }
      msg=data.forecast.weather_description+' Current Temperature : '+data.forecast.temp+'  Feels Like :'+data.forecast.feelsLike
      msg1.textContent=msg
      console.log(data.forecast)
      msg2.textContent=data.place
      icon.src=data.forecast.weather_icon
      
    })
  })



//  fetch('weather?address='+location)
})
