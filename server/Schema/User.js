const mongoose = require('mongoose')
const user = new mongoose.Schema({
          name:{
                    type:String,
                    required:true
          },
          email:{
                    type:String,
                    required:true,
                    unique:true
          },
          mobile:{
                    type:Number,
                    required:true,
                    unique:true,


          },
          age:{
                    type:Number,
                    required:true
          },
          password:{
                    type:String,
                    required:true,
                    unique:true
          }
          ,body:{
                    type:String,

          }
          ,tagline:{
                    type:String
          }
          ,profileimg:{
                    type:String
          }
          ,coverimg:{
                    type:String
          }
          
          
          
})
const newuser = new mongoose.model('userdetails',user)
module.exports=newuser;