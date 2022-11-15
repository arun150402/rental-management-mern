import React, { useState ,useEffect} from 'react';
 import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';



import './assests/css/main.css';
import './assests/css/main.css.map';
import "./assests/js/main.js";
import './assests/scss/_layouts/_header.scss';
import './assests/scss/_layouts/_navigation.scss';
import './assests/scss/abstract/_font.scss';
import './assests/scss/abstract/_variables.scss';
import './assests/scss/components/_switch.scss';
import './assests/scss/forms/login.scss';
import './assests/scss/forms/reg.scss';
import './assests/scss/main.scss';
import './assests/css/OpenPage.css';

import img1 from './assests/images/search.png';
import img2 from './assests/images/tractor3_illus.png';



export default function Abc(){
      
  const navigate=useNavigate();

const [images,setImages]=useState({
  picname:[]
})


useEffect(()=>{
getdata();
 //console.log('hii');
  
  }, [])


function call(imgName){
  sessionStorage.setItem('imgName',imgName);
  navigate('/FarmerLogin');
}
  


function getdata(){
  axios
  .post('/getpics',"hi pa")
      .then((res)=>{
        //console.log(res.data[8])
        setImages((preState)=>{
          return{
            ...preState,
           picname:res.data,
          };
        })
        //console.log(picname[9]);
       
      })
      .catch((err)=>{
      console.log(err)});
      }
    
const{picname}=images


    return(
      
        <>

    <div className="header up" style={{position:'sticky'}} >
    {/* <h1>{picname[9]}</h1> */}
      <nav className="navbar up" style={{position:'sticky'}}>
        <div className="logo" >
          <a href="">LOGO</a>
        </div>
        <ul className="navbar--items ulSt">
          <li className="navbar--links">
            <a href="./index.html">Home</a>
          </li>
          <li className="navbar--links">
            <a href="#">About</a>
          </li>
          <li className="navbar--links">
            <a href="#">Contact</a>
          </li>
          <li className="navbar--links sign">
            <Link to="/FarmerLogin" className='btn1'>Sing In</Link>
          </li>
          <li className="navbar--links">
            <Link to="/RegisterFarmer">Sing Up</Link>
          </li>
        </ul>
        <div className="search" >
          <input className="search--tbox" type="text" />
          <button className="search--btn">
            <img src= {img1} alt="" className='oneim' />
          </button>
        </div>
      </nav>
      <div className="intro"   >
        <div className="intro--title" >
          <p>Book <br />Your Work <br />Easily!!</p>
          <p className="text-own">Sign In As OWNER Now!</p>
          <Link to="/login" className='bt'>Sing In</Link>
        </div>
        <img src={img2} alt="tractor img" />
        
      </div> 
      
      <div className='up1w'>
     
      { picname.map(({  imgName,_id,status,rent }) =>
      <React.Fragment key={_id}>
      <div className='gallery we'  >
      <img width="600" height="400"  src={require( './images/'+imgName)} />
      <label className='statusLabel'> {status}  ₹{rent}/hr</label>
      <div  className='desc' ><button className='noselect btnrent'  onClick={()=>call(imgName)}>Rent</button></div>
      </div>
      </React.Fragment>
      )}
      
      </div>
    
   

    <script src="./assests/js/main.js"></script>
    </div>


 
        
        </>
    );
    
    }