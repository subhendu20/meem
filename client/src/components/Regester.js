import React, { useState } from 'react'
import './css/Regester.css'
import Cookies from 'universal-cookie'
import axios from 'axios'
 function Regester() {
          const cookie= new Cookies()

          const [formdata,setformdata]=useState({
            name:"",
            age:null,
            email:"",
            mobile:null,
            password:"",
            confirmpassword:"",

          })

          const change=(e)=>{
            setformdata({...formdata,[e.target.name]:e.target.value})
          }


          const signupandlogin=(e)=>{
            e.preventDefault()
            console.log(formdata)
            axios.post('http://localhost:6002/users/adduser', formdata, {
              withCredentials: true
          }).then((res) => {
              console.log(res)
              window.location.reload(false);
            
  
  
          }
  
          ).catch((e) => {
              console.log(e)
          })



           
          }


          // ------------------------axios functions---------------------------//
       

  return (
    <div className='register-main'>
          <form className="form-register">
                    <span className="name"><input type="text" placeholder='Enter your name' name='name' required onChange={change}/></span>
                    <span className="email"><input type="email" placeholder='Enter your email' name='email' required onChange={change}/></span>
                    <span className="mobile"><input type="Number" placeholder='Enter your Mobile no.' name='mobile' required onChange={change}/></span>
                    <span className="age"><input type="text" placeholder='Enter your age' name='age' required onChange={change}/></span>
                    <span className="password"><input type="password" placeholder='Enter Password' name='password' required onChange={change}/></span>
                    <span className="confirmpassword" ><input type="password" placeholder='Re-enter the Password' name='confirmpassword' onChange={change}/></span>
                    <span className="buttons"><button type='submit' onClick={signupandlogin}>Sign up</button></span>
                    <span className="loginmessage">
                              <p>Already Have an account?</p>
                              <a href="/Signup">Log in</a>
                    </span>
          </form>
      
    </div>
  )
}

 export default Regester
