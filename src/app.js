const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const app= express()

const port =process.env.PORT||3000
//setting up path of directories
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setting up location of views and hbs
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
    title:'Weather App',
    name:'ritz'
  })
})



app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return  res.send("please provide an address")
  }

    const address=req.query.address
    geocode(address,(error,{latitude,longitude,place}={})=>{
      if(error){
           return res.send(error)
      }
      forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return res.send(error)
          }
            res.send({
            forecast:forecastData,place:place})


        })
    })
})

//
// app.get('/help',(req,res)=>{
//     res.render('help',{
//       title:'fmyL',
//       name:'rizo',
//     help:'nai milega',
//   })
// })
// app.get('/about',(req,res)=>{
//     res.render('about',{
//       title:'fmyL',
//       name:'rizo',
//     about:'kya about kuch bhi',
//   })
// })
app.get('/help/*',(req,res)=>{
  res.render('404',{
    error:'help article not found',
  })
})
app.get('*',(req,res)=>
{
  res.render('404',{
    error:'page not found'
  })
})


app.listen(port,()=>{
  console.log('server is up')
})
