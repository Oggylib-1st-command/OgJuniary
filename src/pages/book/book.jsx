//import { useParams } from "react-router-dom";
import { useState } from "react";
import { Rating } from "@mui/material";
import { useInfoBookId } from "../api";
import { useParams } from "react-router-dom";

import "./book.scss";

const Book = () => {
  const [value, setValue] = useState(0);
  const { id } = useParams();

  const { book } = useInfoBookId(id);

  const hand = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <div className="user-book">
      <div className="user-book__card">
        <img className="book__img" src={book.image} alt="book images" />
        <h3 className="book__title">{book.title}</h3>
        <h5 className="book__author">{book.author}</h5>
        <div className="book__response">
          <div className="book__heart"></div>
          <button className="book__btn" type="submit">
            ВЗЯТЬ
          </button>
        </div>
        <p className="book__description">{book.description}</p>
        <div className="book__rating">
          <p className="book__rating-title">ОБЩИЙ РЕЙТИНГ КНИГИ:</p>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => hand(newValue)}
            readOnly
            //precision={0.5}
            size="large"
          />
        </div>
      </div>
      <div className="user-book__reviews">
        <button className="reviews__btn">ОСТАВИТЬ ОТЗЫВ</button>
        <div className="reviews__info"></div>
      </div>
    </div>
  );
};

export { Book };
