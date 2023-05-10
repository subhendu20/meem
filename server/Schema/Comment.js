const mongoose = require('mongoose')
const comment = new mongoose.Schema({
          user:{
                    type:String,
                    required:true,
                   
          },
          username:{
                    type:String, 
                    required:true,
          },
          postid:{
                    type:String,
                    required:true,
                    
          },
         
          Date:{
                    type:String,
                    required:true
          },
          comment:{
                    type:String,
                    required:true,
                    
          },
          
          
         
          
          
})
const newcomment= new mongoose.model('comment',comment)
module.exports=newcomment;