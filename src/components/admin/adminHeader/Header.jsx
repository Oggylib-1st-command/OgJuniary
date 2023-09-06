import "./Header.scss";

import { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./../../useAuth";
import getImageKey from "../../getImageKey";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { axiosSearchCatalogeBook } from "../../../store/books/Slice";
import { useEffect } from "react";
function Header({ HeaderChoiceUser, HeaderChoiceBook }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signout } = useAuth();
  const searchBook = useSelector(
    (state) => state.books.searchCatalogeBook.allSearchBooks
  );
  const [field, setField] = useState("");
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  const postForm = () => {
    if (field) {
      dispatch(axiosSearchCatalogeBook(field));
    } else navigate("/admin/catalog");
    const handleEnter = (key) => {
      if (key.code === "Enter") {
        postForm();
      }
    };
  };
  useEffect(() => {
    console.log("----------->searchBook.length", searchBook.length);
    if (searchBook.length !== 0) navigate(`/admin/catalog?S.${field}`);
  }, [searchBook]);
  return (
    <div className="admin-header__inner">
      <div className="admin-header__logo-text-container">
        <Link className="admin-header__logo-link" to="/admin/catalog">
          <img
            className="admin-header__logotipe"
            src={getImageKey("Logo")}
            alt="logo icons"
          />
          <p className="admin-header__logo-text">Oggylib</p>
        </Link>
      </div>
      <label className="admin-header__search-position">
        <img
          className="admin-header__search-logo"
          src={getImageKey("searchIcon")}
          alt=""
          onClick={postForm}
        />
        <input
          className="admin-header__search-input"
          type="text"
          placeholder="Поиск"
          value={field}
          onKeyDown={postForm}
          onChange={(e) => {
            setField(e.target.value);
          }}
        />
      </label>

      <label className="admin-header__block-text">
        <Link
          to="/admin/users"
          className={
            HeaderChoiceUser
              ? "admin-header__admin-users-active"
              : "admin-header__admin-users-unactive"
          }
        >
          Пользователи
        </Link>

        <Link
          to="/admin/catalog"
          className={
            HeaderChoiceBook
              ? "admin-header__admin-books-active"
              : "admin-header__admin-books-unactive"
          }
        >
          Книги
        </Link>
      </label>
      <div className="admin-header__exit" onClick={logout}>
        <img src={getImageKey("HeaderExit")} alt="" />
      </div>
    </div>
  );
}

export default Header;
