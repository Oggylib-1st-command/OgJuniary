import "./Search.scss";
import { Link, useNavigate } from "react-router-dom";
import getImageKey from "./../../getImageKey";
import { useAuth } from "./../../useAuth";
import { useState } from "react";
import Cookies from "js-cookie";
import GenresCatalog from "../adminGenresCatalog/GenresCatalog";

function Search() {
  const [genresActive, setGenresActive] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div className="search__container">
      <div className="search__inner">
        <GenresCatalog active={genresActive} setActive={setGenresActive} />
        <div>
          <div className="sort__inner">
            <div className="sort__sort-block">
              <img
                className="sort__sort-logo"
                src={getImageKey("IconSort")}
                alt=""
              />
              <select className="sort__sorter"></select>
              <p>Сортировка: </p>
              <img
                className="sort__sort-more"
                src={getImageKey("SortArrow")}
                alt=""
              />
            </div>
            <div
              className="sort__catalog"
              onClick={() => setGenresActive(true)}
            >
              <img
                className="sort__catalog-logo"
                src={getImageKey("IconCatalog")}
                alt=""
              />
              <p>Каталог</p>
            </div>
          </div>
        </div>
        <div className="admin__info">
          <button className="admin__add-books">
            <Link to="/admin/catalog/add" className="search__add-link">
              Добавить книгу
            </Link>
          </button>
          <p className="menu__logout admin__logout" onClick={logout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;
