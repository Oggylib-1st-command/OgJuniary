import "./navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { googleLogout } from "@react-oauth/google";
import { useAuth } from "../useAuth";
import getImageKey from "../getImageKey";

function Navbar() {
  const [active, setActive] = useState(true);
  const [autf, setAutf] = useState(false);
  const [info, setInfo] = useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    setActive((current) => !current);
  };
  const logout = () => {
    googleLogout();
    Cookies.remove("profile");
    setAutf(false);
    setInfo([]);
    signout(() => navigate("/login", { replace: true }));
  };
  useEffect(() => {
    const local = Cookies.get("profile");
    if (local) {
      setInfo(JSON.parse(local));
      setAutf(true);
    }
  }, [autf]);
  return (
    <div className="wrapper">
      <button
        className={active ? "menu__btn" : "menu__btn menu__btn--active"}
        onClick={handleClick}
      >
        <span></span>
      </button>
      <nav className="menu">
        <ul className={active ? "menu__list" : "menu__list menu__list--active"}>
          <li className="menu__list-item">
            {autf ? (
              <div>
                <img
                  className="menu__list-img"
                  src={info.picture}
                  alt="icons avatar"
                />
                <div className="menu__list-info">
                  <p className="menu__fullname">{info.name}</p>
                  <p className="menu__email">{info.email}</p>
                </div>
                <button className="menu__logout" onClick={logout}>
                  Log Out
                </button>
              </div>
            ) : (
              <div>
                <img
                  className="menu__list-img"
                  src={getImageKey("searchIcon")}
                  alt="icons avatar"
                />
                <div className="menu__list-info">
                  <p className="menu__fullname">Без названия</p>
                  <p className="menu__email">Без названия</p>
                </div>
              </div>
            )}
          </li>
          <hr />
          <li className="menu__list-item">
            <img className="menu__list-img" src={getImageKey("User")} alt="" />
            <NavLink className="menu__list-link" to="/" onClick={handleClick}>
              Главная
            </NavLink>
          </li>
          <hr />
          <li className="menu__list-item">
            <img className="menu__list-img" src={getImageKey("User")} alt="" />
            <NavLink
              className="menu__list-link"
              to="/catalog"
              onClick={handleClick}
            >
              Каталог
            </NavLink>
          </li>
          <hr />
          <li className="menu__list-item">
            <img className="menu__list-img" src={getImageKey("User")} alt="" />
            <NavLink
              className="menu__list-link"
              to="/history"
              onClick={handleClick}
            >
              История
            </NavLink>
          </li>
          <hr />
          <li className="menu__list-item">
            <img className="menu__list-img" src={getImageKey("User")} alt="" />
            <NavLink
              className="menu__list-link"
              to="/favorites"
              onClick={handleClick}
            >
              Взятые книги
            </NavLink>
          </li>
          <hr />
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
