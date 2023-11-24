import logo from './logo.svg';
import './App.css';
import Item from './components/Item';
import Cart from './components/Cart';
import React, { Component } from "react";
import Slider from "react-slick";
import Products from './components/Products'
import { Routes,Route } from 'react-router-dom';
import Footer from './components/Footer';
import Detail from './components/Detail';
import { DeckRounded, Filter } from '@mui/icons-material';
import { Provider } from 'react-redux';
import { store } from './components/redux/slices/store';
import Filteri from './components/Filteri';
import Register from './components/Register';
import User from './components/User';






function App() {
  
 

  return (
   
 
    <Routes>
      <Route path="/" element={<Products/>}> </Route>
      <Route path="/Cart" element={<Cart/>}></Route>
      <Route path="/User" element={<User/>}></Route>
      <Route path='/Filter' element={<Filteri></Filteri>}></Route>
      <Route path='/Detail/:id' element={<Detail></Detail>}></Route>
    </Routes>
    
    
   
   
   
   
   
  );
}

export default App;
  