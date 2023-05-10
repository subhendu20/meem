const mongoose = require('mongoose')
const post = new mongoose.Schema({
          user:{
                    type:String,
                    required:true,
                   
          },
          username:{
                    type:String,
                    required:true,
          },
          title:{
                    type:String,
                    required:true,
                    


          },
          image:{
                    type:String
          },
          Date:{
                    type:String,
                    required:true
          },
          body:{
                    type:String,
                    required:true,
                    
          }
          ,
          fist:{
                    type:Number,
                    required:true,
          }
          
          
})
const newpost = new mongoose.model('post',post)
module.exports=newpost;