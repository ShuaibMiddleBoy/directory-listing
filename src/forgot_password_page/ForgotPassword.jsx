import React, { useState } from "react";
import style from "./forgotPassword.module.css";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    newPassword: "",
    securityQuestion: "",
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setValue((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const registerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `https://directory-listing-server.vercel.app/api/auth/forgot-password`;
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data.user);
        console.log(data.token);
        toast.success(data.message);
        navigate("/login");
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
      } else {
        console.log(data.message);
        toast.error(data.message);
        // navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Navbar />
      <div className={style.mainContainer}>
        <h2>Forgot Password</h2>
        <form onSubmit={registerFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={value.email}
              placeholder="Enter your Email..."
              onChange={inputEvent}
            />
          </div>
          <div>
            <label htmlFor="securityQuestion">Your Fav Cricket Team Name</label>
            <input
              type="text"
              id="securityQuestion"
              name="securityQuestion"
              value={value.securityQuestion}
              placeholder="Enter your Fav Cricket Team Name"
              onChange={inputEvent}
            />
          </div>
          <div>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={value.newPassword}
              placeholder="Enter your Password..."
              onChange={inputEvent}
            />
          </div>

          <button type="submit">Submit</button>

          <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
