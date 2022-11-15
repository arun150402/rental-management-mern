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

export default function BookPage(){

  const navigate=useNavigate();

  const [images,setImages]=useState({
    picname:[]
  })
 
 
  
  
  useEffect(()=>{
//  getVehicle();
  getdata();
  }, [])
  
  function getdata(){
    axios
    .post('/getOwnpicss',{
      'mail':sessionStorage.getItem('OwnerMail')
    })
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

function bookpage(mail,picname,status){
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
    })
    axios
    .post('/getOwnerDet',{
        'mail':mail
      })
    .then((res)=>{

        sessionStorage.setItem('ownName',res.data[0].name);
        sessionStorage.setItem('ownMobile',res.data[0].phonenum);
        sessionStorage.setItem('ownCity',res.data[0].city);

    })
    //navigate('/BookPage')
     window.location.reload(false);
    }
    else{
      alert("This vehicle is not Available!!! Book another")
    }
}

function bookfn(){
  alert("Vehicle Booked!!!")
  axios
  .post('/sendMail',{
    'ownMail': sessionStorage.getItem('OwnerMail'),
    'ownName':sessionStorage.getItem('ownName'),
    'ownerMobile':sessionStorage.getItem('ownMobile'),
    'modelName':sessionStorage.getItem('modelName'),
    'modelNo':sessionStorage.getItem('modelNo'),
    'rent':sessionStorage.getItem('rent'),
    'ownCity':sessionStorage.getItem('ownCity'),
    'Farmermail':sessionStorage.getItem('mail'),
    'FarmerName':sessionStorage.getItem('name'),
    'Farmermob':sessionStorage.getItem('mobilenum'),
  });
  navigate('/FarmerPage');
}

function back(){
  navigate('/FarmerPage');
}
  const{picname}=images



    return(
        <>
 <div className="header "  >
      <nav className="navbar up" >
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
      <br/><br/>
      <div>
          <h1 className="headForBookPage">Vehicle Owner's Details:-</h1>
      </div>
<div className="picDetails">
    <div className="firstBlk">
      <h3>Name: {sessionStorage.getItem('ownName')}</h3><br/><br/>
        <h3>Mail:{sessionStorage.getItem('OwnerMail')}</h3><br/><br/>
        <h3>Mobile Number: {sessionStorage.getItem('ownMobile')}</h3><br/><br/>
        <h3>Vehicle Name: {sessionStorage.getItem('modelName')}</h3><br/><br/>
        <h3>Vehicle Model: {sessionStorage.getItem('modelNo')}</h3><br/><br/>
        <h3>Rent per hour: ₹{sessionStorage.getItem('rent')}</h3><br/><br/>
        <h3>City: {sessionStorage.getItem('ownCity')}</h3><br/><br/>
        <br/>
        <br/>
    </div>
    <div className="secondBlk">
        <img className="vecImg" src= {require('./images/'+sessionStorage.getItem('imageName'))} alt=""  />
    </div>
    
</div>
<button className="backBtn" onClick={back}>Back</button>
<button className="bookbtn" onClick={bookfn}>Book Now</button>
<br/><br/><br/><br/><br/>
<hr/><br/><br/>
<h1 className="headForBookPage">Vehicles belongs to "{sessionStorage.getItem('ownName')}" :-</h1>
      <div className='up1w'>
      { picname.map(({  imgName,_id,mail,status,rent }) =>
      <React.Fragment key={_id}>
      <div className='gallery'  >
      <img width="600" height="400"  src={require( './images/'+imgName)} />
      <label className='statusLabel'>{status} ₹{rent}/hr</label>
      <div  className='desc' ><button className='noselect btnrent' onClick={()=>bookpage(mail,imgName,status)} >Rent</button></div>
      </div>
      </React.Fragment>
      )}
      
      </div>

 </div>             

        </>
    );
}