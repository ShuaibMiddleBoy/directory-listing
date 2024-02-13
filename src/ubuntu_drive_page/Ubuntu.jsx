import React from "react";
import style from "./ubuntu.module.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const Ubuntu = () => {
  return (
    <div id="Ubuntu_Drive">
      <Header />
      <Navbar />
      <div className={style.ubuntuContent}>
        <div className={style.imageContainer}>
          <img
            src="https://bmm2022.com/wp-content/uploads/2023/07/DRIVE-2-1024x676.png"
            alt=""
          />
        </div>
        <p>

          The Ubuntu Drives are our chance to come together in large numbers to
          show love and support to our black-owned businesses. We arrive wearing
          a black t-shirt or tank to show unity, and we also come to spend money
          (approx. $20 per person) with the business. Ubuntu Drives happen twice
          a month. The stores are selected through a raffle. We host the Drives
          for 4 – 5 star rated, brick-and-mortar black-owned businesses. Join
          us, meet new people, and consciously spend some money with our
          business owners.
        </p>
        <div className={style.contact}>
          <h2>BoJaynes Gourmet Market & Deli</h2>
          <div>
          <h3><LocationOnIcon className={style.contactIcon}/> 371 Keys Ferry St. McDonough, Ga. 30253 </h3>
          <a href=""><LocalPhoneIcon className={style.contactIcon}/> 770-914-1154 </a>
          <a href=""><EmailIcon className={style.contactIcon}/> www.bojaynesspecialtyfoods.com </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ubuntu;
