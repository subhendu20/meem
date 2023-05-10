
import './App.css';
import Post from './components/Post';
import Profile from './components/Profile';
import $ from 'jquery'
import "jquery-ui-dist/jquery-ui";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie'
import Regester from './components/Regester';
import Profileeditpage from './components/Profileeditpage';
import axios from 'axios'
import Postform from './components/Postform';
import Searchpage from './components/Searchpage';


function App() {

  const [searchmessage,setsearchmessage] = useState({query:''})
  const[seaerchlist,setsearchlist]=useState({searchdetails:[],loading:false})
  const[getpostloading,setgetpostloading]=useState(false)
  const[postlist,setpostlist]=useState({posts:[]})

  
  





















  const [logstatus, setlogstatus] = useState(false)

  const cookie = new Cookies()
  const open_menu = () => {
    console.log("gh")
    $('#sidebar,.sidea').toggleClass('none').toggleClass('flex')
  }

  const open_dropdown=()=>{
    $('#dropdown').toggleClass('none').toggleClass('flex')
  }

  const checklog = () => {
    const cookiecheck = cookie.get('logtoken')
    if (cookiecheck) {
      setlogstatus(true)
    }

  }

  const signout=async()=>{
    axios.post('http://localhost:6002/users/logout', {
      withCredentials: true
  }).then(async(res)=>{
    console.log(res)
    await alert("Exit the page?")
    await cookie.remove('logtoken')
    window.open('/',"_self")

  }).catch((e)=>{
    console.log(e)

  })
   
  }

  const changequery=(e)=>{
    setsearchmessage({...searchmessage,[e.target.name]:e.target.value})
  }


  const submitsearch=async(e)=>{
    e.preventDefault()
    axios.post('http://localhost:6002/posts/findpost',searchmessage ,{
      withCredentials: true
  }).then(async(res)=>{
    console.log(res.data)
    await setsearchlist({
      searchdetails:res.data,
      loading:true
    })
    
   

  }).catch((e)=>{
    console.log(e)

  })

  

   
    
    
    console.log(searchmessage)
  }

  
  







  useEffect(() => {
    checklog()

  })


  useEffect(()=>{
    console.log('zxn')
    setgetpostloading(true)
    
      axios.get('http://localhost:6002/posts/toppost',{
        withCredentials:true
    }).then(async(res)=>{
     
      await setpostlist({
        posts:res.data
      })
      console.log(res.data)
      

     
      
      
  
    }).catch((e)=>{
      console.log(e)
    })
    
    setgetpostloading(true)
  
    
  
  

   
    
    

 
  },[getpostloading])









  // ------------------------------------------axios functions---------------------------//
  

  return (
    <Router>{logstatus ?

      <div className="window">
        <div className="popup-profile-window hide" id='popup-profile-window'>
          <Postform/>
        </div>
        {/*-------------- floating window-------- */}


        {/*------------------sidebar -------------*/}
        <div className="sidebar none" id='sidebar'>

          <span className="button"><i class='bx bx-menu' id='closemenu' ></i></span>
          <span><i class='bx bxs-home-smile' ></i><a href="/" className='sidea none'>Home</a></span>
          <span><i class='bx bxl-product-hunt' ></i><a href="/profile" className='sidea none'>Ohumor</a></span>
          <span><i class='bx bxs-cog' ></i>Settings</span>

          <span></span>


        </div>


        {/* ------------------content ------------*/}
        <div className="App" id='app-main'>

          <nav className="nav">
            <span className="logo"><i class='bx bx-menu' onClick={open_menu} id='menuopen'></i><i class='bx bxl-medium' ></i></span>
            <span className="search"><input type="text" className="search" id='searchbar' name='query' placeholder='search' onChange={changequery} /><button onClick={submitsearch}><a href="/search_result"><i class='bx bx-search-alt-2' ></i></a></button></span>
            <span className="menu"><i class='bx bxs-bell-ring'  ></i><i class='bx bxl-product-hunt' onClick={open_dropdown} ></i>
            <div className="dropdown none" id ='dropdown'>
              <span><i class='bx bxl-product-hunt' ></i><p href="/profile">Ohumor</p></span>
              <span className="profilebutton"><button>View profile</button></span>
              <hr/>
              <span className="setting"><a href="/settings">Setting</a></span>
              <span className="Edit"><a href="/editprofile">Edit profile</a></span>
              <hr/>
              <span className="signout" onClick={signout}>Sign out</span>
              
              
            </div>
            </span>
          </nav>

          
          {(!seaerchlist.loading)?<div className="content">
            <div className="postlist">
              <Routes>
                <Route path='/' element={ <div className='postgrid'> {
                              (postlist.posts.length!==0) && postlist.posts.map((e)=>{
                                return <Post key={e._id} post={e} />
                              })
                             }</div>} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/editprofile' element={<Profileeditpage/>} />
                

              </Routes>


            </div>


          </div>:<Searchpage propdata={seaerchlist}/>}

        </div>

      </div> : <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/Signup' element={<Regester />} /></Routes>}
    </Router>

  );
}

export default App;
