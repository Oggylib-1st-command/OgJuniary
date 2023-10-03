import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../useAuth";
import getImageKey from "../getImageKey";
import Cookies from "js-cookie";
import { useLogin, useInfoUser } from "./../../api/api";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import "./login.scss";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ password: "", email: "" });
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  const ref = useRef();
  const { login, user, profile } = useLogin();
  const { signin, fromPage } = useAuth();
  const [auth, setAuth] = useState();
  const { infoUser } = useInfoUser();
  useEffect(() => {
    const tempUser =
      infoUser.find((elem) => elem.email === profile.email) || [];
    if (profile.length !== 0 && tempUser.length !== 0) {
      tempUser.picture = profile.picture;
      Cookies.set("profile", JSON.stringify(tempUser), {
        expires: 7,
      });
      signin(user, () => navigate(fromPage, { replace: true }));
    } else if (profile.length !== 0 && tempUser.length === 0) {
      const stack = document.querySelector(".stack");
      stack.style.visibility = "visible";
      stack.style.opacity = "1";
      setTimeout(() => {
        stack.style.visibility = "hidden";
        stack.style.opacity = "0";
      }, 2000);
    }
  }, [profile]);

  const handleForm = (elem) => {
    elem.preventDefault();
    const login = async () => {
      const adminLogin = await axios
        .post("http://localhost:8000/check-admin/", form)
        .then((data) => setAuth(data))
        .catch((error) => setAuth(error));
    };
    login();
  };
  useEffect(() => {
    if (typeof auth === "object") {
      console.log(JSON.parse(auth?.request.response).authenticated);
      if (JSON.parse(auth?.request.response).authenticated === true) {
        signin(user, () => navigate("/admin/catalog", { replace: true }));
        Cookies.set("admin", true, {
          expires: 7,
        });
      } else if (JSON.parse(auth?.request.response).authenticated === false) {
        setForm((prevState) => ({ email: "", password: "" }));
        setError((current) => !current);
        ref.current.style.visibility = "visible";
        ref.current.style.opacity = "1";
        setTimeout(() => {
          ref.current.style.visibility = "hidden";
          ref.current.style.opacity = "0";
        }, 2000);
      }
    }
  }, [auth]);
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
      <Stack
        sx={{
          width: "100%",
          maxWidth: "300px",
          position: "absolute",
          top: "15%",
          visibility: "hidden",
          transition: "opacity 0.3s, visibility 0s linear 0.3s",
          opacity: "0",
        }}
        className="stack"
        ref={ref}
        spacing={2}
      >
        <Alert variant="filled" severity="error">
          Ошибка при авторизации!
        </Alert>
      </Stack>
      <div className="form__inner">
        <form className="form__signin">
          <h2 className="form__title">АВТОРИЗАЦИЯ</h2>
          <label className="form__label">
            <img className="form__icon" src={getImageKey("userIcon")} alt="" />
            <input
              className={error ? "form__input" : "form__input form--active"}
              type="text"
              value={form.email}
              onChange={(e) =>
                setForm((prevState) => ({ ...form, email: e.target.value }))
              }
              placeholder="Введите email"
            />
          </label>
          <label className="form__label">
            <img
              className={"form__icon"}
              src={getImageKey("passwordIcon")}
              alt=""
            />
            <input
              className={error ? "form__input" : "form__input form--active"}
              type="password"
              value={form.password}
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
