import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";
import URL from "../../Config";

const Register = () => {
  const [inpUsername, setUsername] = useState("");
  const [inpEmail, setEmail] = useState("");
  const [inpPassword, setPassword] = useState("");
  const [inpPasswordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();
  const notify = (error) => {
    toast.error(Object.values(error).toString().replace(/,/gi, ""), {
      icon: false,
      theme: "dark",
    });
  };

  const loginUser = async (newUser) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    try {
      const res = await axios.post(`${URL}/account/login/`, newUser, config);
      console.log(res);
      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      navigate("/products");
    } catch (error) {}
  };

  const registerUser = async (newUser) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    try {
      await axios.post(`${URL}/account/register/`, newUser, config);
      loginUser(newUser);
    } catch (error) {}
  };

  function handleClick() {
    const form_data = new FormData();
    if (!inpUsername) notify("Enter username");
    else if (!inpEmail) notify("Enter email");
    else if (!inpPassword) notify("Enter password");
    else if (!inpPasswordConfirm) notify("Enter password");
    else {
      form_data.append("username", inpUsername);
      form_data.append("email", inpEmail);
      form_data.append("password", inpPassword);
      form_data.append("password_confirm", inpPasswordConfirm);
      registerUser(form_data);
    }
    console.log(inpUsername, inpEmail, inpPassword, inpPasswordConfirm);
  }

  return (
    <div className="container__registration">
      <div className="card" style={{ width: "50vw" }}>
        <div className="card-body">
          <h2>Create new account</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              key="username"
              placeholder="*username"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              key="email"
              placeholder="*Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              key="password"
              placeholder="*Password"
            />
          </div>
          <div className="mb-3">
            <input
              type="password_confirm"
              className="form-control"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              name="password_confirm"
              key="password_confirm"
              placeholder="*PasswordConfirm"
            />
          </div>
          <div className="container__registration__button">
            <button onClick={handleClick} className="btn1">
              Sign up
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
