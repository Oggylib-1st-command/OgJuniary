import React, { useEffect } from "react";
import "./GenresCatalog.scss";
import { Link } from "react-router-dom";
import getImageKey from "../../getImageKey";
import { useGenres } from "./../../../api/api.jsx";
import { useState } from "react";
import BlockGenres from "../adminBlockGenres/BlockGenres";

const GenresCatalog = ({ active, setActive }) => {
  const { genre } = useGenres();
  const [showMore, setShowMore] = useState();

  return (
    <div
      className={
        active ? "genres__container genres__active" : "genres__no-active"
      }
    >
      <div
        className="genres__background-exit"
        onClick={() => setActive(false)}
      ></div>
      <div className="genres__inner">
        <div className="genres__head">
          <div className="exit" onClick={() => setActive(false)}>
            <img className="exit__iconL" src={getImageKey("IconCloseX")} />
          </div>
        </div>
        <div className="genres__genre">
          <div className="genres__list">
            {showMore
              ? genre
                  .filter((el) => el.id === showMore)
                  .map((target) => (
                    <BlockGenres
                      key={target.id}
                      id={target.id}
                      genre={target.main}
                      subGenres={target.name}
                      setActive={setActive}
                      setShowMore={setShowMore}
                      showMore={showMore}
                      clas={"genres__block-open"}
                    />
                  ))
              : genre
                  .slice(0, 8)
                  .map((target) => (
                    <BlockGenres
                      key={target.id}
                      id={target.id}
                      genre={target.main}
                      subGenres={target.name}
                      setActive={setActive}
                      setShowMore={setShowMore}
                      showMore={showMore}
                      clas={"genres__block"}
                    />
                  ))}
          </div>
        </div>
        <Link className="genres__all-genres" to="/admin/catalog/allgenres">
          <p>Все жанры</p>
        </Link>
      </div>
    </div>
  );
};

export default GenresCatalog;
