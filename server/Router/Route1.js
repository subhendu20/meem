const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookie = require('cookie-parser')
const user = require('../Schema/User')

const hash = require('bcryptjs')
const JWT = require('jsonwebtoken')

router.use(cors(
          {
                    origin: 'http://localhost:3000',
                    methods: ['POST', 'PUT', 'GET','DELETE','OPTIONS', 'HEAD'],
                    credentials: true
          }
))
router.use(cookie())


//add new user
router.post('/adduser',async(req,res)=>{
          const {name,email,mobile,age,password,confirmpassword} = req.body
          if(password!==confirmpassword){
                    return res.send("invalid")
          }
          const salt = await hash.genSaltSync(10)
          const encryptpass = await hash.hashSync(password,salt)
          const newuser = new user({
                    name,
                    email,
                    age,
                    mobile,
                    password:encryptpass,
                    tag:'',
                    about:'',
                    profileimg:'',
                    coverimg:'',

                    
                    
          })

          newuser.save().then(async()=>{
                    
                    const b = await user.findOne({mobile})
                    const token = await JWT.sign(b.id,process.env.TOKEN)
                    res.cookie('logtoken',token).send(newuser)
                    



                    
          }).catch((e)=>{
                    console.log(e)
          })
})


//login user

router.post('/login',async(req,res)=>{
          const {mobile,password} = req.body

         
          
          const b = await user.findOne({mobile})

          if(!b){
                    return res.send("User not found")
          }
         
          

                    const check = await hash.compare(password,b.password)
                    if(!check){
                              console.log(password+" "+b)
                              return res.send('invalid password')
                    }

                    const token = await JWT.sign(b.id,process.env.TOKEN)

                    res.cookie('logtoken',token)
                    res.send("logged in successfully")

          


})

//logout user
router.post('/logout',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("You are already logged out")
          }
          res.clearCookie('logtoken').send("You are logged out")
})

//update user details
router.put('/update',async(req,res)=>{
          const{profileimg,coverimg,tagline,about}=req.body
          const getcookie = await req.cookies.logtoken
                    if (!getcookie) {
                              return res.status(400).send("logged out")
                    }
                    const checkid = await JWT.verify(getcookie, process.env.TOKEN)
                    if (!checkid) {
                              return res.send("you are logged out")
                    }
                    const find = await user.findById(checkid)
                    find.tagline=tagline
                    find.about=about
                    find.profileimg=profileimg
                    find.coverimg = coverimg
                    find.save().then((e)=>{
                              console.log(e)
                              res.send(e)

                    }).catch((e)=>{
                              console.log(e)
                    })
})


//get user details
router.get('/getdetails',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          console.log(cookie)
          if(!cookie){
                    return res.send("you are hai logged in")
          }
          const id = await JWT.verify(cookie,process.env.TOKEN)
          console.log(id)
          const userdetails = await user.findById(id).lean()
          console.log(userdetails)
          res.send(userdetails)


})

//delete user
router.delete('/deleteuser',async(req,res)=>{
          const cookie = await  req.cookies.logtoken
          if(!cookie){
                    return res.send("you are not logged in")
          }
          const id = await JWT.verify(cookie,process.env.TOKEN)
          const deluser = await user.findByIdAndDelete(id)
          res.send("user deleted")

})






















module.exports = router