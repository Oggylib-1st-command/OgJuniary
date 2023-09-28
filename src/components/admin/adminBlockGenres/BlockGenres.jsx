import "./BlockGenres.scss";
import getImageKey from "../../getImageKey";
import { useDispatch } from "react-redux";
import {
  axiosFilterCatalogeBook,
  removeSearchBooks,
  removeAdminSortBooks,
} from "../../../store/books/BookSlice";

const BlockGenres = ({
  id,
  genre,
  clas,
  subGenres,
  setActive,
  setShowMore,
  showMore,
}) => {
  const dispatch = useDispatch();
  const handleGenre = (event) => {
    dispatch(axiosFilterCatalogeBook(event.target.id));
    dispatch(removeSearchBooks());
    dispatch(removeAdminSortBooks());
    setActive(false);
  };

  return (
    <div className={clas}>
      <p className="genres__span">{genre}</p>
      <div className={showMore ? "genres__block-items" : ""}>
        {showMore ? (
          <div className="exit__genres" onClick={() => setShowMore(null)}>
            <img className="exit__iconL" src={getImageKey("ArrowBack")} />
          </div>
        ) : (
          ""
        )}
        {showMore
          ? subGenres.map((genre) => (
              <p
                key={genre.id}
                id={genre.id}
                className="admin-subgenres__item"
                onClick={handleGenre}
              >
                {genre.name}
              </p>
            ))
          : subGenres.slice(0, 4).map((genre) => (
              <p
                key={genre.id}
                id={genre.id}
                className="admin-subgenres__item"
                onClick={handleGenre}
              >
                {genre.name}
              </p>
            ))}
        <p
          className="show__btn-admin"
          onClick={(e) => {
            e.stopPropagation();
            setShowMore(id);
          }}
        >
          {showMore ? "" : `Всe ${subGenres.length}`}
        </p>
      </div>
    </div>
  );
};

export default BlockGenres;
