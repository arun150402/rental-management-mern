import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useState} from "react";


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
import img1 from './assests/images/search.png';
import logo from './assests/images/tractor.jpg';
import axios from "axios";





export default function RegExp(){

  const navigate=useNavigate();

  const [farmer , setFarmer]=useState({
    name:"",
    phnum:"",
    mail:"",
    city:'',
    tempass:"",
    pass:"",
    pic:"",
    picname:''
  });



  function change(event){

    setFarmer((preState)=>{
      return{
        ...preState,
       pic:event.target.files[0],
      };
    })

    setFarmer((preState)=>{
      return{
        ...preState,
       picname:event.target.files[0].name,
      };
    })

  };



  function handleChange(event){
    const{name , value}=event.target;
  
    setFarmer((preState)=>{
      return{
        ...preState,
       [name]:value,
      };
    })

  
  }


  const {name ,tempass, phnum, mail,city,pass,pic,picname}=farmer;



  function sub(){
    const formdata=new FormData();
    formdata.append('name',name);
    formdata.append('phnum',phnum);
    formdata.append('mail',mail);
    formdata.append('city',city);
    formdata.append('pass',pass);
    formdata.append('pic',pic);
    formdata.append('picname',picname);

    if(tempass!==pass){
      alert("Password Not Matched!!!");
    }
  else{
    axios
      .post('/Ownerstore',formdata)
      .then((res)=>{
        
        console.log(res.data)})
        
      .catch((err)=>{
      console.log(err)});
      alert("Babe you have Registerd!!!💚😁💖");
      navigate('/');
  }

  }

    return(
        <>
        <nav className="navbar">
        <div className="logo">
          <a href="">LOGO</a>
        </div>
        <ul className="navbar--items">
          <li className="navbar--links">
          <Link to="/" >Home</Link>
          </li>
          <li className="navbar--links">
            <a href="#">About</a>
          </li>
          <li className="navbar--links">
            <a href="#">Contact</a>
          </li>
          <li className="navbar--links sign">
            <Link to='/login' className="btn1">Sign In</Link>
          </li>
          <li className="navbar--links ">
            <Link to='/RegisterFarmer' >Sign Up as Farmer</Link>
          </li>
        </ul>
        <div className="search">
          <input className="search--tbox" type="text" />
          <button className="search--btn">
            <img src={img1} alt="" className='oneim' />
          </button>
        </div>
      </nav>
      <div className="reg bgim">
        <form autoComplete="on" className="reg-cont"  onSubmit={sub} action="#" encType="multipart/form-data">
          <p className="reg-tit">REGISTERING AS "OWNER"</p>
          <div className="reg-ele">
            <h1>Name</h1>
            <input
              className="reg-txt"
              type="text"
              name="name"
              placeholder="Type here"
              onChange={handleChange}
              value={name}
              required
            /><br/><br/>
          </div>
          <div className="reg-ele">
            <h1>Phone number</h1>
            <input
              className="reg-txt"
              type="text"
              name="phnum"
              onChange={handleChange}
              value={phnum}
              placeholder={1234567890}
              required
            /><br/><br/>
          </div>
          <div className="reg-ele">
            <h1>Mail ID</h1>
            <input
              className="reg-txt"
              type="email"
              name="mail"
              placeholder="Type here"
              onChange={handleChange}
              value={mail}
              required
            /><br/><br/>
          </div>
          <div className="reg-ele">
            <h1>City</h1>
            <select name="city" className="ip3-Reg" onChange={handleChange} required>
           <option aria-required>
             --SELECT--
           </option>
           <option value ='Salem'>
              Salem
           </option>
           <option value='Erode'>
             Erode
           </option>
           <option value='Coimbatore'>
             Coimbatore
           </option>
           <option value='Namakkal'>
             Namakkal
           </option>
           <option value='Karur'>
             Karur
           </option>
           <option value='Theni'>
             Theni
           </option>
           <option value='Madhurai'>
             Madhurai
           </option>

        </select><br/><br/>
          </div>
          <div className="reg-ele">
            <h1>Gender</h1>
            <input type="radio" id="gm" name="g_radio" value="Male" required />
            <label >Male</label>
            <input type="radio" id="gf" name="g_radio" value="Female" required />
            <label >Female</label><br/><br/>
          </div>
          <div className="reg-ele">
            <h1>Password</h1>
            <input
              className="reg-txt"
              type="password"
              name="tempass"
              placeholder="Type here"
              onChange={handleChange}
              value={tempass}
              required
            />
            <br/><br/>
          </div>
          <div className="reg-ele">
            <h1>Confirm Password</h1>
            <input
              className="reg-txt"
              type="password"
              name="pass"
              placeholder="Type here"
              onChange={handleChange}
              value={pass}
             // required

            /><br/><br/>
            
          </div>

          <div className="reg-ele">
            <h1>Profile Photo</h1>
            <input
            type="File"
            onChange={change}
            name="pic"
            /><br/><br/>
            </div>

          <button 
           className="reg-btn"
           >SUBMIT</button>
        </form>
      </div>
        </>
    );

}