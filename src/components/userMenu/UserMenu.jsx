import React from "react";
import { NavLink } from "react-router-dom";
import style from './userMenu.module.css';
const UserMenu = () => {
  return (
    <>
    <div className={style.mainContainer}>
      <div className={style.visitSite}>
        <NavLink to="/">Visit Site</NavLink>
          </div>
          <hr style={{padding:"0px", margin:"5px 0", color:"lightgray"}} />
      <ul className={style.ul}>
        <li>
          <NavLink to="/dashboard/user/profile">profile</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/user/lists">Lists</NavLink>
        </li>
      </ul>
      </div>
    </>
  );
};

export default UserMenu;
