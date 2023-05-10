import React, { useEffect,useState} from 'react'
import './css/Searchpage.css'
import Post from './Post'
import defaultimg from './css/abstract-luxury-blur-grey-color-gradient-used-as-background-studio-wall-display-your-products.jpg'


function Searchpage({propdata}) {
  const[details,setdetails]=useState({
    postlist:[],
    profilelist:[]
  })
  const fs=()=>{
    console.log(propdata.searchdetails.profiles)
  }
  useEffect(()=>{
    setdetails({
      ...details,
      postlist:propdata.searchdetails.posts,
      profilelist:propdata.searchdetails.profiles

    })
  },[propdata.searchdetails])
 
  return (
    <div className='searchresult'>
      <div className="posts-search">
        <span className="title">
          Posts

        </span>
        <hr />
        <span className="postlist">

          {
            (details.postlist.length!==0) && details.postlist.map((e)=>{
              
              
                return e.map((x)=>{
                  
                  return <Post post={x} />


                })
              
            })
          }


        </span>

      </div>
      <div className="creator-search" onClick={fs}>
        <span className="title">
          Profiles
        </span>
        
        <span className="profilelist">
        {
            (details.profilelist.length!==0) && details.profilelist.map((e)=>{
              
              
                return e.map((x)=>{
                  
                  return <span key={x._id}>
                    <img src={(x.profileimg!=='')? x.profileimg:defaultimg} alt="loading" />
                    <div className='prof-details'>
                      <span className="name">{x.name}</span>
                      <span className="tagline">{x.tagline}</span>
                    </div>

                  </span>



                })
              
            })
          }

        </span>

      </div>
    </div>
  )
}

export default Searchpage
