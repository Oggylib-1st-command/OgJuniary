import { useEffect } from "react";
import "./Check.scss";
import { useState } from "react";

export const Check = ({ genre }) => {
  const [active, setActive] = useState(true);
  const [choose, setChoose] = useState([]);
  useEffect(() => {
    if (active) {
      setChoose(genre);
    }
  }, []);
  const handleCheck = (elem) => {
    const arr = [];
    setActive((even) => !even);
  };
  return (
    <label className="filter__label">
      <div
        className={
          active ? "filter__input" : "filter__input filter__input--active"
        }
        onClick={(e) => handleCheck(e)}
      />

      <div>{genre}</div>
    </label>
  );
};
