const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const middleware = require('body-parser')
const routeuser = require('./Router/Route1')
const routepost = require('./Router/Route2')
const routecomment = require('./Router/Route3')


mongoose.connect(process.env.DB).then(()=>{
          console.log("connected")
}).catch((e)=>{
          console.log(e)
})


const app = express()


app.use(middleware.urlencoded({ extended: false,limit : '100mb'}));
app.use(middleware.json({limit : '100mb'}));
app.use('/users',routeuser)
app.use('/posts',routepost)
app.use('/comments',routecomment)





app.listen(process.env.PORT,()=>{
          console.log(`app is running on${process.env.PORT}`)
})