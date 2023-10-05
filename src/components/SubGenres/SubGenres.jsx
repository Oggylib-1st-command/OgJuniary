import axios from "axios";
import "./subgenres.scss";
import { useDispatch } from "react-redux";
import {
  axiosFilterCatalogeBook,
  removeSearchBooks,
  removeSortBooks,
} from "../../store/books/BookSlice";

export const SubGenres = ({ subGenres, setState }) => {
  const dispatch = useDispatch();
  const handleGenre = (event) => {
    console.log(event);
    dispatch(axiosFilterCatalogeBook(event.target.id));
    dispatch(removeSearchBooks());
    dispatch(removeSortBooks());
    setState(false);
  };
  return (
    <div className="subgenres__info">
      {subGenres.map((genre) => (
        <p
          key={genre.id}
          id={genre.id}
          className="subgenres__item"
          onClick={handleGenre}
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
};
