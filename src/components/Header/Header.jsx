import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import getImageKey from "../getImageKey";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  axiosSearchCatalogeBook,
  removeSearchBooks,
} from "../../store/books/BookSlice";

function Header() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  function handleClick(e) {
    setSearchField("");
    if (searchField) {
      postForm();
    }
    return setActive(!active);
  }

  const postForm = () => {
    if (searchField) {
      dispatch(axiosSearchCatalogeBook(searchField));
      navigate(`/catalog?${searchField}`);
    } else {
      dispatch(removeSearchBooks());
      navigate("/catalog");
    }
  };

  const handleEnter = (event) => {
    if (event.code === "Enter") {
      postForm();
    }
  };

  return (
    <div className="header__inner">
      <Link className="header__logo-link" to="/">
        <img
          className="header__logo"
          src={getImageKey("Logo")}
          alt="logo icons"
          onClick={() => setShow(true)}
        />
        <p className="header__logo-text" onClick={() => setShow(true)}>
          Oggylib
        </p>
      </Link>
      <div className="header__form">
        <input
          className={
            active
              ? "header__form-input"
              : "header__form-input header__form-input--active"
          }
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
          value={searchField}
          type="text"
          placeholder="поиск"
          onKeyDown={handleEnter}
        />
        <img
          className="header__form-icon"
          onClick={handleClick}
          src={getImageKey("searchIcon")}
          alt="search icon"
        />
      </div>
      <Navbar show={show} setShow={setShow} />
    </div>
  );
}

export default Header;
