import React from 'react'
import style from "./showcase.module.css";
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
const Showcase = () => {
  return (
    <div id='Showcase'>
        <Header/>
        <Navbar/>
        <div className={style.showcaseContent}>
          <div className={style.wrapper}>
          <div className={style.imgContainer}>
<img src="https://bmm2022.com/wp-content/uploads/2023/09/Untitled-design-2.png" alt="" />
          </div>
          <div className={style.owner}>
            <h3>Erika H. Perry (Owner)</h3>
            <ul>
              <li>North Carolina Native</li>
              <li>Graduate of NC A&T (B.S. Marketing)</li>
              <li>Member of Alpha Kappa Alpha Sorority Inc. (Alpha Phi, Spr. 2001)</li>
              <li>15+ successful years of corporate and non profit experience</li>
              <li>Loves concerts, traveling, and spending time with her two bous and husband</li>
            </ul>
          </div>
          <div className={style.row}>
            <div>
              <img src="https://bmm2022.com/wp-content/uploads/2023/08/Kilwins10-300x300.png" alt="" />
            </div>
            <div>
            <a href="">1380 Atlantic Drive. #14160</a>
            <h4>Atlanta, GA 30363 </h4>
            </div>
            <div>
              <a href="">(404)963-1130</a>
            </div>
          </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Showcase
