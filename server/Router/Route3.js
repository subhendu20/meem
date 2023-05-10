const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const user = require('../Schema/User')
const post = require('../Schema/Post')
const comment = require('../Schema/Comment')

const cors = require('cors')
const cookie = require('cookie-parser')
const JWT = require('jsonwebtoken')
const { json } = require('body-parser')

router.use(cors(
          {
                    origin: 'http://localhost:3000',
                    methods: ['POST', 'PUT', 'GET','DELETE','OPTIONS', 'HEAD'],
                    credentials: true
          }
))
router.use(cookie())

//add comment
router.post('/addcomment/:id',async(req,res)=>{
          const {comments}=req.body  
          const cookie = await req.cookies.logtoken
          console.log(comments)
          if(!cookie){
                    return res.send("you are logged out")
          }
          const userid = await JWT.verify(cookie,process.env.TOKEN)

          const users = await user.findById(userid)

          const newcomment = new comment({
                    user:userid,
                    username:users.name,
                    postid:req.params.id,
                    Date:new Date(Date.now()).getDate()+":"+new Date(Date.now()).getMonth()+":"+new Date(Date.now()).getFullYear(),
                    comment:comments
          })
          newcomment.save().then(()=>{
                    res.send(newcomment)
          }).catch((e)=>{
                    console.log(e)
          })

})


//delete comment
router.delete('/deletecomment/:id',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const del = await comment.findByIdAndDelete(req.params.id)
          res.send(del)

})

//update comment
router.patch('/updatecomment/:id',async(req,res)=>{
          const {comments} = req.body
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const findcomment = await comment.findById(req.params.id)

          findcomment.comment=comments
          findcomment.save().then(()=>{
                    res.send(findcomment)
          }).catch((e)=>{
                    console.log(e)
          })


})

//get comments
router.get('/getcomment/:id',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const commentlist = await comment.find({postid:req.params.id})
          res.send(commentlist)

})




module.exports=router