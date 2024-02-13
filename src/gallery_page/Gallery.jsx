import React, { useState, useEffect } from "react";
import style from "./gallery.module.css";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import galleryData from "./galleryData";

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const openItem = (item) => {
    setSelectedItem(item);
  };

  const closeItem = () => {
    setSelectedItem(null);
  };

  return (
    <div id="Gallery">
      <Header />
      <Navbar />
      <div className={style.galleryContent}>
        <div className={style.wrapper}>
          <h1>Gallery</h1>
          {loading ? (
            <div className="spinner1"></div> // Add a spinner or loading message
          ) : (
            <div className={style.videoList}>
              {galleryData.map((item, index) => (
                <img
                  key={index}
                  className={style.galleryItems}
                  onClick={() => openItem(item)}
                  src={item.imageSRC}
                  alt="Thumbnail"
                />
              ))}
            </div>
          )}

          {selectedItem && (
            <div className={style.videoPopup}>
              <div className={style.backdrop} onClick={closeItem}></div>
              <div className={style.popupContent}>
                <button className="close-btn" onClick={closeItem}>
                  Close
                </button>
                <video controls width="550" height="400">
                  <source src={selectedItem.videoUrl} type="video/mp4" />
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
