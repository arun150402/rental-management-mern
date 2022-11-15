import axios from "axios";
import {React,useState} from "react";
import { useNavigate } from "react-router";

import './assests/css/main.css';
import './assests/css/main.css.map';
import logo from './assests/images/tractor.jpg';


export default function Fn(){

  const navigate=useNavigate();


const [login,setLogin]=useState({
  mail:"",
  pass:"",
})

function handleChange(event){
  const {name,value}=event.target;
  setLogin((preState)=>{
    return{
      ...preState,
      [name]:value,
    }
  })
  }

  const{mail,pass}=login;

function check(){


  axios
  .post('/clientCheck',{
    'mail':mail
  })
  .then((res)=>{
    if(res.data.length===0){
      alert("No Mail ID Found!!!")
    }
   if(pass===res.data[0].password){
    sessionStorage.setItem('mail',mail);
    sessionStorage.setItem('name',res.data[0].name);
    sessionStorage.setItem('mobilenum',res.data[0].phonenum);
    sessionStorage.setItem('profile',res.data[0].profile);
    navigate('/OwnerPage');
}
else{
  alert("Wrong PassWord!!!");
  }  
})
  .catch((err)=>{
  console.log(err)});

}

function callback(){
  navigate('/');
}
function callFarmer(){
  navigate('/FarmerLogin');
}



  return(
    <>
    <div className="container">
      <img className="mx_img" src={logo} alt="" />
      
      <div className="log">
          <div className="log-card">
          <h1 style={{fontSize:'30px',color:'white'}}>Your are Logging as "Owner"</h1>
          <p >Username:-</p>
          <input
           type="text"
           name="mail"
           onChange={handleChange}
           value={mail}
           
           />
          <p>Password:-</p>
          <input type="password"
          name="pass"
          onChange={handleChange}
          value={pass}
          
          />
          <br/>
          <button className="btnlogin" onClick={()=>check()}>Login</button>
          <button className="btnFarmer" onClick={callFarmer}>Login as Farmer</button>
          <button className="btnBack" onClick={callback}>Back</button>
        </div>
      </div>
      
    </div>
    
    </>
  );

}