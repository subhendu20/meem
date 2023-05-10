const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const user = require('../Schema/User')
const post = require('../Schema/Post')

const cors = require('cors')
const cookie = require('cookie-parser')
const JWT = require('jsonwebtoken')
const { json } = require('body-parser')


router.use(cors( {
          origin: 'http://localhost:3000',
          methods: ['POST', 'PUT', 'GET','DELETE','OPTIONS', 'HEAD'],
          credentials: true
}))
router.use(cookie())
//post a new post
router.post('/addpost',async(req,res)=>{
          const {title,body,image} = req.body
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const userid = await JWT.verify(cookie,process.env.TOKEN)
          console.log(userid)
          
          const users = await user.findById(userid)
          console.log(users)
          const newpost = new post({
                    user:userid,
                    username:users.name,
                    title,
                    body,
                    Date:new Date(Date.now()).getDate()+":"+new Date(Date.now()).getMonth()+":"+new Date(Date.now()).getFullYear(),
                    fist:0,
                    image
          })
          newpost.save().then(()=>{
                    res.send(newpost)
          }).catch((e)=>{
                    console.log(e)
          })
})

//delete a post
router.delete('/deletenote/:id',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const del = await post.findByIdAndDelete(req.params.id)
          res.send(del)




})

//update a post
router.put('/updatepost/:id',async(req,res)=>{
          const {title,body} = req.body
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const userid = await JWT.verify(cookie,process.env.TOKEN)
          
          
          const users = await user.findById(userid)
          
          const findpost = await post.findById(req.params.id)
          findpost.user=userid,
          findpost.username=users.name,
          findpost.title = title,
          findpost.body = body
          findpost.Date = users.Date,
          findpost.boost = users.fist
          findpost.image=users.image  

          findpost.save().then(()=>{
                    res.send(findpost)

          }).catch((e)=>{
                    console.log(e)
          })
          

})

//get post for home page
router.get('/toppost',async(req,res)=>{
          const allpost = await post.find({})
          res.send(allpost)
          

})

//find post list from search
router.post('/findpost',async(req,res)=>{
          var list=[]
          var profilelist = []
          
          const{query} =req.body
          console.log(query)
          const keys= query.split(' ')
          for(var i=0;i<keys.length;i++){
                    console.log(keys[i])
                    const finditem = await post.find({username:keys[i]})
                    const findprofile = await user.find({name:keys[i]})
                    if(finditem){
                              console.log(finditem)
                              list.push(finditem)
                    }
                    if(findprofile){
                              console.log(findprofile)
                              profilelist.push(findprofile)
                    }

          }
          res.send({posts:list,profiles:profilelist})
})

//get own post for profile
router.get('/ownpost',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }
          const id = await JWT.verify(cookie,process.env.TOKEN)
          console.log(id)
          const posts = await post.find({user:id})
          console.log(posts)
          res.send(posts)

})

//get top users

//update like
router.patch('/addlike/:id',async(req,res)=>{
          const {changeboost} = req.body
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    return res.send("you are logged out")
          }

          const findpost = await post.findById(req.params.id)
          
          if(changeboost=="add"){
                    findpost.boost = findpost.boost+1


          }
          if(changeboost=="reduce"){
                    findpost.boost = findpost.boost-1
          }

          findpost.save().then(()=>{
                    res.send(findpost)
          }).catch((e)=>{
                    console.log(findpost)
          })
          

})




module.exports=router