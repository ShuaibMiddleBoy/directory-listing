import React from 'react'
import style from "./shop.module.css";
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';


const Shop = () => {
  return (
    <div id='shop'>
        <Header/>
        <Navbar/>
        <h1>Shop</h1>
        <Footer/>
    </div>
  )
}

export default Shop
