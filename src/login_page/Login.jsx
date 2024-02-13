import React, { useState } from "react";
import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Login = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
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
      const URL = `https://directory-listing-server.vercel.app/api/auth/login`;
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
        navigate("/");
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
      } else {
        console.log(data.message);
        toast.error(data.message);
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
     
        <h2>LOGIN FORM</h2>
        <form  onSubmit={registerFormSubmit}>
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={value.email}
              placeholder="Enter your Email..."
              onChange={inputEvent}
            />
          </div>
          <div >
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={value.password}
              placeholder="Enter your Password..."
              onChange={inputEvent}
            />
          </div>

          <button type="submit">
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </form>
      </div>
    
      <Footer />
    </>
  );
};

export default Login;
