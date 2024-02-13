import React, { useState } from "react";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
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
      const URL = `https://directory-listing-server.vercel.app/api/auth/register`;
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data.message);
        toast.success(data.message);
        navigate("/");
      } else {
        console.log(data.message);
        toast.error(data.message);
        navigate("/login");
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
        <h2>Register Here </h2>
        <form onSubmit={registerFormSubmit}>
          <div>
            <label htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={value.firstName}
              placeholder="Enter your First Name..."
              onChange={inputEvent}
            />
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={value.lastName}
              placeholder="Enter your Last Name..."
              onChange={inputEvent}
            />
          </div>
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
          <div>
            <label htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={value.phone}
              placeholder="Enter your Phone no..."
              onChange={inputEvent}
            />
          </div>
          <div>
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

          <div>
            <label htmlFor="cPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="cPassword"
              name="cPassword"
              value={value.cPassword}
              placeholder="Enter your Confirm Password..."
              onChange={inputEvent}
            />
          </div>

          <div>
            <label htmlFor="cPassword">
              Your favourite Cricket Team
            </label>
            <input
              type="text"
              id="securityQuestion"
              name="securityQuestion"
              value={value.securityQuestion}
              placeholder="Enter your Fav Cricket Team..."
              onChange={inputEvent}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
