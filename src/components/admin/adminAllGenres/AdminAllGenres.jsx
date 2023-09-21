import { useDispatch } from "react-redux";
import "./AdminAllGenres.scss";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  axiosFilterCatalogeBook,
  removeSearchBooks,
} from "../../../store/books/BookSlice";

export const AdminAllGenres = memo((props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGenre = (event) => {
    dispatch(axiosFilterCatalogeBook(event.target.id));
    dispatch(removeSearchBooks());
    navigate("/admin/catalog");
  };
  return (
    <div className="allgenres__info">
      <h3 className="allgenres__title">{props.genre}</h3>
      <div className="allgenres__genre">
        {props.names.map((el) => (
          <span
            id={el.id}
            key={el.id}
            onClick={handleGenre}
            className="allgenres__genre-title"
          >
            {el.name}
          </span>
        ))}
      </div>
    </div>
  );
});
