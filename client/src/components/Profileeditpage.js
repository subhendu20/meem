import React, { useEffect, useState } from 'react'
import './css/Profileeditpage.css'
import cover from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profileeditpage() {
  const [loading,setloading]=useState(false)
  const[prevalue,setprevalue]=useState({
    name:'',
    tagline:'',
    profileimg:'',
    coverimg:''

  })
  const [coverimg,setcoverimg] = useState('')
  const [ profileimg,setprofileimg]=useState('')
  const [formdata,setformdata]= useState({
    profileimg:'',
    coverimg:'',
    tagline:'',
    about:''


  })
          const navigate = new useNavigate()

        

  const setprofile=(e)=>{
    console.log(e)
    var filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    filereader.onload =()=>{
      console.log(filereader.result)
      setprofileimg(filereader.result)
      setformdata({...formdata,profileimg:filereader.result})
    }
    filereader.onerror =(e)=>{
      console.log(e)
     
    }

  } 
  const setcover=(e)=>{
    console.log(e)
    var filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    filereader.onload =()=>{
      console.log(filereader.result)
      setcoverimg(filereader.result)
      setformdata({...formdata,coverimg:filereader.result})
    }
    filereader.onerror =(e)=>{
      console.log(e)
     
    }


   

  }  
  
  const changes=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})

  }
  
  const Save_update=(e)=>{ 
    e.preventDefault()
    console.log(formdata)
    axios.put('http://localhost:6002/users/update', formdata, {
      withCredentials: true
  }).then((res)=>{
    console.log(res)
    window.open('/profile','_self')

  }).catch((e)=>{
    console.log(e)

  })
    
}

useEffect(()=>{
  setloading(false)
    
  axios.get('http://localhost:6002/users/getdetails',{
    withCredentials:true
}).then((res)=>{
  console.log(res.data)
  setprevalue({
    name:res.data.name,
    tagline:res.data.tagline,
    profileimg:res.data.profileimg,
    coverimg:res.data.coverimg

  })
 
  
  console.log(prevalue)

}).catch((e)=>{
  console.log(e)
})
setloading(true)

},[loading])

  
  return (
    <div className='update-profile'>
          <form action="" className="coverimg">
          <img src={(coverimg==='')?cover:coverimg} alt="loading" className="img" />
                   <div className="upload-box">
                    <input accept="image/*" type="file" onChange={setcover}/>
                    <i class='bx bxs-camera'></i>
                    
                   </div>
                    

          </form>
          <form action="" className="details">
          <span className="name">Name<input type="name" defaultValue={prevalue.name} placeholder='Enter your name'/></span>
          <span className="tagline">Tag Line<input type="text"  placeholder='Give a tagLine' defaultValue={prevalue.tagline} name='tagline' onChange={changes} /></span>
          <span className="about">Write something about you<input type="text" placeholder='Write something about you' name='about' onChange={changes} /></span>
          <span className="buttons"><button onClick={Save_update}>Save</button></span>

          </form>
          <form action="" className="profile-image">
                    
                    <img src={(profileimg==='')?cover:profileimg} alt="loading" className="imgprof" />
                    <div className="profile-upload-box">
                    <input accept="image/*" type="file" onChange={setprofile} />
                    <i class='bx bxs-camera'></i>

                    </div>

                    
                    
          </form>
         
      
    </div>
  )
}

export default Profileeditpage
