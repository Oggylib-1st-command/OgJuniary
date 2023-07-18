import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { ReviewsCard } from "../../components/ReviewsCard/ReviewsCard";
import { Reviews } from "../../components/Reviews/Reviews";
import cn from "classnames";
import axios from "axios";
import "./book.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../store/books/Slice";
import Cookies from "js-cookie";
import { EditReviewsCard } from "../../components/EditReviewsCard/EditReviewsCard";
const lang = {
  fir: "Русский",
  sec: "English",
  null: "",
  get(lanId) {
    if (lanId === 1) return this.fir;
    else if (lanId === 2) return this.sec;
    else return this.null;
  },
};

function Book() {
  const local = JSON.parse(Cookies.get("profile"));
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState({
    text: "",
    value: 0,
    book: id,
    owner: local.id,
  });
  const book = useSelector((state) => state.books.book);

  useEffect(() => {
    dispatch(axiosBookById(id));
  }, [id]);

  useEffect(() => {
    if (book.id === 0) dispatch(axiosBookById(id));
    else if (comment.text && !active) {
      const postReviews = async () => {
        await axios.post("http://127.0.0.1:8000/reviews/", comment);
      };
      postReviews();
      setComment({ ...comment, text: "", value: 0 });
      window.location.reload();
    }
    const getReviews = async () => {
      const getRevie = await axios.get("http://127.0.0.1:8000/reviews/");
      const filt = getRevie.data.filter((el) => +el.book === +id);
      setReviews(filt);
    };
    getReviews();
  }, [id, active]);
  const [isBookings] = useState(book.owner === local.id);
  const [activeBtn] = useState(book.owner ? true : false);
  const chooseName = () => {
    if (activeBtn && isBookings) {
      return "ВАШЕ";
    } else if (activeBtn) {
      return "ЗАНЯТО";
    } else if (!activeBtn) {
      return "ВЗЯТЬ";
    }
  };
  return (
    <div className="user-book">
      <div className="user-book__card">
        <img className="book__img" src={book.image} alt="book images" />
        <h3 className="book__title">{book.title}</h3>
        <h5 className="book__author">{book.author}</h5>
        <div className="book__response">
          <div className="book__heart"></div>
          <div
            className={cn({
              active__block: !activeBtn && isBookings,
              active__block_booking: activeBtn && !isBookings,
            })}
          >
            <button className="book__btn" type="submit">
              {chooseName()}
            </button>
          </div>
        </div>
        <p className="table__list-info">
          <span>Жанры:</span>
          {book.genres}
        </p>
        <p className="table__list-info">
          <span>Язык:</span>
          {lang.get(book.languages)}
        </p>
        <p className="table__list-info">
          <span>Год издания:</span>
          {book.year}
        </p>
        <p className="book__description">
          <span>Описание: </span>
          {book.description}
        </p>
        <div className="book__rating">
          <p className="book__rating-title">ОБЩИЙ РЕЙТИНГ КНИГИ:</p>
          <Rating
            name="simple-controlled"
            value={+book.rating}
            readOnly
            precision={0.5}
            size="large"
          />
        </div>
      </div>
      <div className="user-book__reviews">
        {edit ? (
          <EditReviewsCard
            reviews={reviews}
            idUser={local.id}
            id={id}
            setEdit={setEdit}
          />
        ) : (
          <>
            <button className="reviews__btn" onClick={() => setActive(!active)}>
              {active ? "ОПУБЛИКОВАТЬ ОТЗЫВ" : "ОСТАВИТЬ ОТЗЫВ"}
            </button>
            <hr />
            <div className="reviews__info">
              {active ? (
                <Reviews setComment={setComment} comment={comment} />
              ) : (
                active
              )}
            </div>
          </>
        )}
        {reviews.map((el) => (
          <ReviewsCard
            key={el.id}
            editState={el.owner === local.id}
            name={el.name}
            surname={el.surname}
            date={el.created_at}
            rating={el.value}
            image={local.picture}
            text={el.text}
            setEdit={setEdit}
            edit={edit}
          />
        ))}
      </div>
    </div>
  );
}

export default Book;
