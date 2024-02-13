import React from "react";
import style from "./dashboard.module.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import UserMenu from "../../components/userMenu/UserMenu";

const Dashboard = () => {
  return (
    <>
      <div className={style.mainContainer}>
          <div className={style.sidebar}>
            <UserMenu />
          <div className={style.mainContent}>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
