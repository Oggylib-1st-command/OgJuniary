import "./AdminAllGenres.scss";
import { memo } from "react";
export const AdminAllGenres = memo((props) => {
  return (
    <div className="allgenres__info">
      <h3 className="allgenres__title">{props.genre}</h3>
      <div className="allgenres__genre">
        {props.names.map((el) => (
          <span key={el.id} className="allgenres__genre-title">
            {el.name}
          </span>
        ))}
      </div>
    </div>
  );
});
