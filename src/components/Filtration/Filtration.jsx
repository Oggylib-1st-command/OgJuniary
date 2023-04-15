import "./Filtration.scss";
import { Check } from "./../Check/Check";
import { useState } from "react";

const genre = [
  {
    id: "1",
    view: "aaaaa",
  },
  {
    id: "2",
    view: "bbbbbb",
  },
  {
    id: "3",
    view: "cccccc",
  },
  {
    id: "4",
    view: "ddddddd",
  },
  {
    id: "5",
    view: "eeeeeee",
  },
  {
    id: "6",
    view: "fffffff",
  },
];

export const Filter = ({ title }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <li className="filter__list-item">
      <h4 className="filter__list-title">{title}</h4>
      <div className="filter__checkbox">
        {showMore
          ? genre.map((target) => <Check key={target.id} genre={target.view} />)
          : genre
              .slice(0, 4)
              .map((target) => <Check key={target.id} genre={target.view} />)}
      </div>
      <p className="show__btn" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Скрыть" : "Показать ещё"}
      </p>
    </li>
  );
};
