import React from "react";
import Login from './Login';
import Main from './Main';
import Reg from './Registeration';

import Owner from './OwnerPage';
import RegFarmer from "./RegisterFarmer";
import FarmerPage from'./FarmersPage';
import FarmerLogin from './FarmerLogin';
import BookPage from './BookingPage';
import { BrowserRouter,Routes, Route } from "react-router-dom";

export default function Give(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="login" element={<Login />} />
                <Route path="Register" element={<Reg />} />   
                <Route path="OwnerPage" element={<Owner/>}/>
                <Route path="RegisterFarmer" element={<RegFarmer/>}/>
                <Route path="FarmerPage" element={<FarmerPage/>}/>
                <Route path="FarmerLogin" element={<FarmerLogin/>}/>
                <Route path='BookPage' element={<BookPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}