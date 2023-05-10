import React, { useEffect, useState } from 'react'
import './css/Profile.css'
import defaultimg from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'

import Post from './Post'
import axios from 'axios'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";

function Profile() {
  const[profiledata,setprofiledata]=useState({name:'',tagline:'',profileimage:''})
  const[loading,setloading]= useState(true)
  const[postlist,setpostlist]=useState({posts:[]})
  const[postloading,setpostloading]=useState(false)

  
  useEffect(()=>{
    console.log('zxn')
    setloading(false)
    
      axios.get('http://localhost:6002/users/getdetails',{
        withCredentials:true
    }).then((res)=>{
      console.log(res.data)
      setprofiledata({
        name:res.data.name,
        tagline:res.data.tagline,
        profileimage:res.data.profileimg,
        coverimage:res.data.coverimg,
        about:res.data.about
  
      })
     
      
      console.log(profiledata)
  
    }).catch((e)=>{
      console.log(e)
    })
    setloading(true)
  
    
  
  

   
    
    

 
  },[loading])


  useEffect(()=>{
    console.log('zxn')
    setpostloading(false)
    
      axios.get('http://localhost:6002/posts/ownpost',{
        withCredentials:true
    }).then(async(res)=>{
     
      await setpostlist({
        posts:res.data
      })
      console.log(res.data)
      

     
      
      
  
    }).catch((e)=>{
      console.log(e)
    })
    console.log(profiledata)
    setpostloading(true)
  
    
  
  

   
    
    

 
  },[postloading])


  const open_post_popup=()=>{
    $('#popup-profile-window').removeClass('hide')
    $('#app-main').addClass('reduceopacity')
  }

  
  return (
    <div className='profile'>
          <img className='prof-image' src={(profiledata.profileimage==='') ?defaultimg:profiledata.profileimage} alt="loading" />
          <div className="banner">
                    <img src={(profiledata.coverimage==='') ?defaultimg:profiledata.coverimage} alt="loading" />

          </div>
          <div className="profile-details">
                    <div className="about">
                              <div className="aboutbox">
                                        <span className="name">
                                                  {profiledata.name}

                                        </span>
                                        <span className="tagline">
                                          {profiledata.tagline}
                                                  

                                        </span>
                                        <span className="about-details">
                                          {
                                            profiledata.about
                                          }
                                                  

                                        </span>
                                        <span className="join-date">


                                        </span>
                              </div>

                    </div>
                    <div className="posts">
                              <div className="post-bar" onClick={open_post_popup}>
                                        <p>Share your meme</p>
                                        <span className="icons"><span><i class='bx bxs-conversation'></i>Text</span>
                                        <span><i class='bx bx-image-add' ></i>Image</span>
                                        <span><i class='bx bx-video-recording' ></i>Video</span></span>
                                        
                              </div>
                              <div className="mypostlist">
                             {
                              (postlist.posts.length!==0) ? postlist.posts.map((e)=>{
                                return <Post key={e._id} post={e} />
                              }):<p className='blank-message'>Upload your first post</p>
                             }

                              </div>
                            
                              

                    </div>

          </div>
          
      
    </div>
  )
}

export default Profile
