import React from 'react'
import style from "./contact.module.css";
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Contact = () => {
  return (
    <div id='Contact'>
       <Header/>
       <Navbar/>

       <div className={style.contactContent}>
       <img src="https://bmm2022.com/wp-content/uploads/2023/06/about-us.png" alt="" srcset="" />
<div className={style.formContainer}>
       <form>
        <div>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" placeholder='Full Name'/>
        </div>
        <div>
        <label htmlFor="email">Email*</label>
        <input type="email" placeholder='Email*'/>
        </div>
        <div>
        <label htmlFor="subject">Subject</label>
        <input type="text" placeholder='Subject'/>
        </div>
        <div>
        <label htmlFor="message">Message</label>
        <textarea placeholder='Message'></textarea>
        </div>
        <input type="submit" value={"Send Now"}/>
       </form>
       </div>

       <div className={style.socialLinks}>
                  <h4>Follow  Us</h4>
                    <div className={style.icons}>
                      <a href=""  className={style.icon}>
                      <FacebookRoundedIcon/>
                      </a>
                      <a href=""  className={style.icon}>
                      <InstagramIcon/>
                      </a>
                      <a href=""  className={style.icon}>
                      <YouTubeIcon/>
                      </a>
                    </div>
                    <hr />
       </div>
       </div>
       <Footer/>
    </div>
  )
}

export default Contact
