import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../useAuth";
import "./login.scss";
import getImageKey from "../getImageKey";
import Cookies from "js-cookie";
import axios from "axios";

import './login.scss'
import Header from './../Header/Header.jsx'

import userIcon from './../../assets/icons/user-icon.svg'
import passwordIcon from './../../assets/icons/password-icon.svg'
import googleIcon from './../../assets/icons/icon-google.svg'
import Logo from './../../assets/icons/Logo.png'
import { useAuth } from '../useAuth';


function Login(){
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [ form, setForm ] = useState({password:'',email:''})

  const navigate = useNavigate();
  const { signin } = useAuth();
  const { fromPage } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (user.length !== 0) {
          const request = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );
          setProfile(request.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getInfo();
  }, [user]);

  useEffect(() => {
    if (profile.length !== 0) {
      Cookies.set("profile", JSON.stringify(profile), {
        expires: 7,
      });
      signin(user, () => navigate(fromPage, { replace: true }));
    }
  }, [profile]);

  const handleForm = (elem) => {
    elem.preventDefault();
    if (form.email === "1" && form.password === "1") {
      signin(user, () => navigate("/admin", { replace: true }));
      Cookies.set("admin", true, {
        expires: -1,
      });
    } else {
      alert("Ошибка логина или пароля");
    }
  };

  return (
    <div className="container">
      <div className="container__inner">
        <Link className="header__logo-link" to="/login">
          <img
            className="header__logo"
            src={getImageKey("Logo")}
            alt="logo icons"
          />
        </Link>
        <p className="header__logo-text">Oggylib</p>
      </div>
      <div className="form__inner">
        <form className="form__signin" action="">
          <h2 className="form__title">АВТОРИЗАЦИЯ</h2>
          <label className="form__label">
            <img className="form__icon" src={getImageKey("userIcon")} alt="" />
            <input
              className="form__input"
              type="text"
              onChange={(e) =>
                setForm((prevState) => ({ ...form, email: e.target.value }))
              }
              placeholder="Введите email"
            />
          </label>
          <label className="form__label">
            <img
              className="form__icon"
              src={getImageKey("passwordIcon")}
              alt=""
            />
            <input
              className="form__input"
              type="password"
              onChange={(e) =>
                setForm((prevState) => ({ ...form, password: e.target.value }))
              }
              placeholder="Введите пароль"
            />
          </label>
          <button className="form__singin-btn" onClick={(e) => handleForm(e)}>
            Войти
          </button>
          <p className="form__subtext">или</p>
        </form>
        <button className="form__google-btn" onClick={() => login()}>
          <img
            className="google-icon"
            src={getImageKey("googleIcon")}
            alt="google icon"
          />
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
