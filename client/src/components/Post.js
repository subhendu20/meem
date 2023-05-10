import React, { useEffect, useState } from 'react'
import './css/Post.css'
import meme from './css/monkey-man-counting-five.jpg'
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import axios from 'axios'

function Post({post}) {

  const[comments,setcomments] = useState({comments:''})
  const[loading,setloading]=useState(true)
  const[commentlist,setcommentlist]=useState({list:[]})

  const submitcomment=async(e)=>{
    e.preventDefault()
    console.log(comments)
    axios.post(`http://localhost:6002/comments/addcomment/${post._id}`, comments, {
      withCredentials: true
  }).then((res)=>{
    console.log(res.data)
    e.value=''

  }).catch((e)=>{
    console.log(e)

  })


  }

  const opencomments=()=>{
    console.log( $(`#${post._id}`))
    $(`#${post._id}`).toggleClass('none').toggleClass('flex')
    


  }

  const change=(e)=>{
    setcomments({[e.target.name]:e.target.value})
  }


  useEffect(()=>{
    console.log('zxn')
    setloading(false)
    
      axios.get(`http://localhost:6002/comments/getcomment/${post._id}`,{
        withCredentials:true
    }).then(async(res)=>{
     
      await setcommentlist({
        list:res.data
      })
      console.log(res.data)
      

     
      
      
  
    }).catch((e)=>{
      console.log(e)
    })
    console.log(comments)
    setloading(true)
  
    
  
  

   
    
    

 
  },[loading]

  )



  // }
  return (
    <div className='post-main'>
      <i class='bx bxs-like' ></i>


          <span className="img"><img src={post.image} alt="loading" /></span>
          <span className='fistcount'>{post.fist} fist</span>
          <span className="profile">{post.username}</span>
          <span className="details">{post.body}</span>
          <span className="buttons" onClick={opencomments}><i class='bx bxs-comment-detail'></i>{commentlist.list.length} comments</span>
          <div className="comments none" id={post._id}>
            <hr/>
            <div className="commentbox">
              {
                (commentlist.list.length===0)?<p>No comments</p>:commentlist.list.map((e)=>{
                  return <span key={e._id}>
                    <span className="user">{e.username}</span>
                    <span className="comment-message"><p>{e.comment}</p></span>
                    <span className="time">{e.Date}</span>
                  </span>

                })
              }
            


            </div>
            <form action="" className="commentform">
            <input type="text" name='comments' placeholder='Write comment' onChange={change}/>
              <button className="submitcomment" onClick={submitcomment}><i class='bx bx-send'></i></button>

            </form>
          </div>

      
    </div>
  )
}

export default Post
