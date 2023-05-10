import React, { useState } from 'react'
import './css/Postform.css'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'

function Postform() {
  const[formdata,setformdata]=useState({
    title:'',
    body:'',
    image:''
  })
  const [imgdata,setimgdata]=useState('')

  const close_pop_profile=()=>{
    $('#popup-profile-window').addClass('hide')
    $('#app-main').removeClass('reduceopacity')

  }

  const imgset=(e)=>{
    console.log(e)
    var filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    filereader.onload =()=>{
      console.log(filereader.result)
      setimgdata(filereader.result)
      setformdata({...formdata,image:filereader.result})
    }
    filereader.onerror =(e)=>{
      console.log(e)
     
    }

  }

  const change=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

  const post=(e)=>{
    e.preventDefault()
    console.log(formdata)
    axios.post('http://localhost:6002/posts/addpost', formdata, {
      withCredentials: true
  }).then((res)=>{
    console.log(res)
    window.open('/profile','_self')

  }).catch((e)=>{
    console.log(e)

  })

  }
  return (
    <form className='postform'>
      <i class='bx bx-x' onClick={close_pop_profile}></i>
      <span className="text">Post Your Meem and Gain your FIST point</span>
      <span className="imgarea"><span className="imgspan">{(imgdata==='')?<p>Upload image</p>:<img src={imgdata} alt='loading'/>} <input type="file" accept='image/*' onChange={imgset} />  </span></span>
      <span className="title"><input type="text" name='title' placeholder='Title' onChange={change} /></span>
      <span className="textarea"><textarea name="body" id="" cols="30" rows="8" placeholder='Description' onChange={change}></textarea></span>
      <span className="buttons"><button type='submit' onClick={post}>POST</button></span>
      
      
    </form>
  )
}

export default Postform
