import React, { useState } from 'react'
import './css/signup.css'
import Cookies from 'universal-cookie'
import axios from 'axios'

function Signup() {
  const [logdetails, setlogdetails] = useState({
    mobile: null,
    password: ''
  })

  const cookie = new Cookies()

  const change = (e) => {
    setlogdetails({ ...logdetails, [e.target.name]: e.target.value })

  }


  const login = (e) => {
    e.preventDefault()
    axios.post("http://localhost:6002/users/login", logdetails, {
      withCredentials: true
    }).then(async (res) => {
      console.log(res)
      window.location.reload(false);

    }).catch((e) => {
      console.log(e)
    })


  }

  return (
    <div className='login-form'>
      <form action="" className="logform"><span className="mobile"><input type='Number' placeholder='Enter your mobile no.' name='mobile' onChange={change} />Mobile</span>
        <span className="password"><input type="text" placeholder='Enter your password' name='password' onChange={change} />Password</span>
        <span className="button"><button className="submit" type='submit' onClick={login}>Log in</button></span>
        <span className="signupmessage">
          <p>Don't have an account?</p>
          <a href="/Signup">Sign up</a>

        </span></form>


    </div>
  )
}

export default Signup
