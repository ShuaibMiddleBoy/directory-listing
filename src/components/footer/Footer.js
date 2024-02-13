import React from 'react';
import style from './footer.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Footer = () => {
  const { auth, setAuth } = useAuth();
  const emailAddress = "blackmoneymovement2022@gmail.com";
  const phoneNumber = "(404) 445-5088";
  const navigate = useNavigate();
  return (
    <div className={style.footer}>
      <div className={style.grid}>
        <div className={style.col}>
          <h3>MENUS</h3>
          <ul className={style.ul}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/showcase">Showcase</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/media">Media</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/directory">Directory</Link></li>
            <li><Link to="/marketing-oppurtunity">Marketing Oppurtunity</Link></li>
            {/* <li><Link to="/ubuntu-drive">Ubuntu Drive</Link></li>
      <li><Link to="/contact-us">Contact Us</Link></li> */}


           
          </ul>
        </div>
        <div className={style.col}>
          <h3>Join the Movement</h3>
          <div className={style.formContainer}>
            <form>
              <input type="text" placeholder='First Name' />
              <input type="text" placeholder='Last Name' />
              <input type="email" placeholder='Email*' />
              <input type="text" placeholder='Phone*' />
              <input type="button" value="Join Now" />
            </form>
          </div>
        </div>
        <div className={style.col}>
          <div>
            <h3>CONTACT INFO</h3>
            <p>Black Money Movement</p>
            <p><a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
            <p>Phone:<a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
            <p>PO Box 870141</p>
            <p>PO Box 870141</p>
          </div>
          <div>
            <h3>
              OFFICE HOURS
            </h3>
            <p>Monday 11am - 7pm</p>
            <p>Tuesday 11am - 7pm</p>
            <p>Wednesday 11am - 7pm</p>
            <p>Thursday 11am - 7pm</p>
            <p>Friday 11am - 7pm</p>
            <p>Saturday 11am - 7pm</p>
            <p>Sunday 11am - 7pm</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Footer
