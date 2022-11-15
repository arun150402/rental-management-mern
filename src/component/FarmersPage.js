import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import axios from "axios";
import img1 from './assests/images/search.png';
import { useState,useEffect } from "react";

import './assests/css/OpenPage.css';
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

export default function FarmerPage(){

  const navigate=useNavigate();

  const [images,setImages]=useState({
    picname:[]
  })
 
 
  
  
  useEffect(()=>{
  getdata();
  }, [])
  
  function getdata(){

    axios
    .post('/getpics',"hi pa")
    .then((res)=>{
          setImages((preState)=>{
            return{
              ...preState,
             picname:res.data,
            };
          })
        })
    .catch((err)=>{
        console.log(err)});
        }

function bookpage(picname,mail,status){
  if(status==='Available'){
    sessionStorage.setItem('imageName',picname)
    sessionStorage.setItem('OwnerMail',mail);
    axios
    .post('/getVehModel',{
        'imgName':picname
      })
    .then((res)=>{
        sessionStorage.setItem('modelName',res.data[0].modelName);
        sessionStorage.setItem('modelNo',res.data[0].modelNum);
        sessionStorage.setItem('rent',res.data[0].rent);
    })
    axios
    .post('/getOwnerDet',{
        'mail':mail
      })
    .then((res)=>{
      console.log(res);
        sessionStorage.setItem('ownName',res.data[0].name);
        sessionStorage.setItem('ownMobile',res.data[0].phonenum);
        sessionStorage.setItem('ownCity',res.data[0].city);
        console.log("HIIII");
    })
    navigate('/BookPage');
  }
  else{
    alert("This vehicle is not Available!!! Book another")
  }
}

  const{picname}=images



    return(
        <>
 <div className="header up1" style={{position:'sticky'}} >
      <nav className="navbar up" style={{position:'sticky'}}>
        <div >
        <img src={require('./images/'+sessionStorage.getItem('profile'))}  width='50px' height='50px'/>
        </div>
        <h1 className="head1" >{sessionStorage.getItem('name')}</h1>
        <ul className="navbar--items ulSt">
          <li className="navbar--1">
          <Link to='/'>Home</Link>
          </li>
          <li className="navbar--1">
            <a href="#">About</a>
          </li>
          <li className="navbar--1">
            <a href="#">Contact</a>
          </li>
          
        </ul>
        <div className="search" >
          <input className="search--tbox" type="text" />
          <button className="search--btn">
            <img src= {img1} alt="" className='oneim' />
          </button>
        </div>
      </nav>
      
      <div className='up1w'>
     
      { picname.map(({  imgName,_id,status,mail,rent }) =>
      <React.Fragment key={_id}>
      <div className='gallery we'  >
      <img width="600" height="400"  src={require( './images/'+imgName)} />
      <label className='statusLabel'>{status} ₹{rent}/hr</label>
      <div  className='desc' ><button className='noselect btnrent' onClick={()=>bookpage(imgName,mail,status)} >Rent</button></div>
      </div>
      </React.Fragment>
      )}
      
      </div>

 </div>             

        </>
    );
}