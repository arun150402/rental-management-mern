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

export default function OwnerPage(){

  const navigate=useNavigate();

  const [images,setImages]=useState({
    picname:[]
  })
 const [mailId , setMailId]=useState(sessionStorage.getItem('mail'));
 

  const[vehicle,setVehicle]=useState({
    vehicleName:"",
    modelNo:"",
    picDict:'',
    imgName:"",
    status:"",
    rent:''
  })
  
  
  useEffect(()=>{
  getdata();
  }, [])
  
  function handleChange(event)
  {
    const{name,value}=event.target;
    setVehicle((preState)=>{
      return{
        ...preState,
      [name]:value,
      }
    })
  }
  
  function change(event){

    setVehicle((preState)=>{
      return{
        ...preState,
       picDict:event.target.files[0],
      };
    })

    setVehicle((preState)=>{
      return{
        ...preState,
       imgName:event.target.files[0].name,
      };
    })

  };
  
  function getdata(){
    const formdatas=new FormData();
    formdatas.append('mailId',mailId);

    axios
    .post('/getOwnersPics',{'mailId':mailId})
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


  const{picname}=images
  const{vehicleName,modelNo,picDict,imgName,status,rent}=vehicle


  function sendData(){
    const formdata=new FormData();
    formdata.append('vehicleName',vehicleName);
    formdata.append('modelNo',modelNo);
    formdata.append('picDict',picDict);
    formdata.append('imgName',imgName);
    formdata.append('mailId',mailId);
    formdata.append('status',status);
    formdata.append('rent',rent);

  axios
  .post('/sendData',formdata)
  .then((res)=>{
    
    console.log(res.data)})
    
  .catch((err)=>{
  console.log(err)});
  alert("Vehicle Uploaded!!!");

  }

  function deletePic(imageName){
    alert("Are you sure want to delete!!!");  

    axios
    .post('/deletePics',{'imageName':imageName})
    .then((response) => {
      
    }).catch((err) => {
      console.log(err);
    });

    window.location.reload(false);

  }

  function updateStatus(status,imgName){

    let statusValue='Available';
    if(status==='Available'){
      statusValue='Not Available';
    }
    
    axios
    .post('/updataStatus',{
      'imgName':imgName,
      'status':statusValue
    })
    .then((res)=>console.log(res))

    window.location.reload(false);
  }
 


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
      
      
      </div>             
      
      <div  className="up1">
        <pre>
      <div className="topDet">
        <div >
        <br/><br/><br/>
        <h1>                           Name:     {sessionStorage.getItem('name')}</h1><br/><br/>
        <h1>                           Mail Id:     {sessionStorage.getItem('mail')}</h1><br/><br/>
        <h1>                           Mobile Number:   {sessionStorage.getItem('mobilenum')}</h1><br/><br/>
        </div>
      </div>
      </pre>
      <hr/>
      <div>
        <br/>
        <div className="topDet2">
      <h1 >Upload Vehicle:-</h1>
      </div>
      
      <br/><br/><br/>
      <div className="topDet3">
        <form onSubmit={sendData} encType="multipart/form-data">
        <input className="ip1" required type="text" name="vehicleName" value={vehicleName} onChange={handleChange} placeholder="Name of the Vehicle*"></input> 
        <input className="ip2" required type="text" name="modelNo" value={modelNo} onChange={handleChange} placeholder="Model of the Vehicle*"></input> 
        <input type={Text} className="ip5" name="rent" placeholder="₹ Rent per hour*" value={rent} onChange={handleChange} required/> 
        <br/> <br/><br/><input className="ip3" required type="file" name="picDict" onChange={change} />
         <select name="status" className="ip3-1" onChange={handleChange} required>
           <option aria-required>
             --SELECT--
           </option>
           <option value ='Available'>
              Available
           </option>
           <option value='Not Available'>
             Not Available
           </option>
        </select>
        <br/><br/>
        <button className="ip4"type='submit'>Upload</button>
        </form>
      </div>
      <br/><br/><br/><br/><br/><br/>
      <br/>
      <br/>
      </div>
      <hr/>
      <div className='album'>
        <br/><br/><br/>
        <h1 className="yourVehi"> YOUR VEHICLES:-</h1>
        {picname.map(({imgName,_id,status,rent})=>
          <React.Fragment key={_id}>

          <div className='gallery we '  >
         <img width="600" height="400"   src={require( './images/'+imgName)} />
         <h1 id="id1"  name={imgName}></h1>
         <div  className='lastBut' >
         <button className="btnAvailable" id="idStatus" onClick={()=>updateStatus(status,imgName)}> {status}</button>
         <button style={{display:"inline"}} className="btnAvailable"  > ₹{rent}/hr</button>
         <button className="button-64"  id="id"   onClick={()=>deletePic(imgName)}><span>Delete</span></button>
         </div>
      
      </div>

          </React.Fragment>
        )}
      
      </div>
      </div>
        </>
    );
}