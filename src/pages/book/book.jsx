import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { ReviewsCard } from "../../components/ReviewsCard/ReviewsCard";
import { Reviews } from "../../components/Reviews/Reviews";
import cn from "classnames";
import axios from "axios";
import "./book.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosBookById } from "../../store/books/BookSlice";
import Cookies from "js-cookie";
import { EditReviewsCard } from "../../components/EditReviewsCard/EditReviewsCard";
import { useInfoUser } from "./../../api/api";

function Book() {
  const local = JSON.parse(Cookies.get("profile"));
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState();
  const { infoUser } = useInfoUser();
  const [heart, setHeart] = useState();
  const [comment, setComment] = useState({
    text: "",
    value: 0,
    book: id,
    owner: local.id,
    image: local.picture,
  });
  useEffect(() => {
    if (infoUser.length > 0) {
      setHeart(
        infoUser
          .find((el) => el.id === local.id)
          .bookid_favorites?.includes(+id) || false
      );
    }
  }, [infoUser]);
  const book = useSelector((state) => state.books.currentBook.book);
  const [name, setName] = useState("");
  const favorites = () => {
    setHeart((heart) => !heart);
    const postFavorites = async () => {
      const favorite = await axios.patch(`http://localhost:8000/books/${id}/`, {
        bookmarker: local.id,
      });
    };
    const deleteFavorites = async () => {
      const favorite = await axios.patch(`http://localhost:8000/books/${id}/`, {
        bookmarker: "",
      });
    };
    if (!heart) {
      postFavorites();
    } else {
      console.log("KKKK");
      deleteFavorites();
    }
  };
  const booking = () => {
    if (!stateBtn && local) {
      const postBook = async () => {
        const bookings = await axios.patch(
          `http://localhost:8000/books/${book.id}/`,
          {
            owner: local.id,
            bookings: book.id,
          }
        );
      };
      postBook();
      setBookings(true);
      setStateBtn(true);
    } else {
      const postBook = async () => {
        const bookings = await axios.patch(
          `http://localhost:8000/books/${book.id}/`,
          {
            bookings: "",
          }
        );
      };
      postBook();
      setBookings(false);
      setStateBtn(false);
    }
  };
  useEffect(() => {
    dispatch(axiosBookById(id));
  }, [id]);
  useEffect(() => {
    if (book.id === 0) dispatch(axiosBookById(id));
    else if (comment.text && !active && comment.value > 0) {
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
      filt.length > 0 ? setError(true) : setError(false);
      setReviews(filt);
    };
    getReviews();
  }, [id, active]);
  useEffect(() => {
    setStateBtn(book.owner ? true : false);
    setBookings(book.owner === local.id);
  }, [stateBtn, book]);
  const [stateBtn, setStateBtn] = useState(book.owner ? true : false);
  const [isBookings, setBookings] = useState(book.owner === local.id);
  useEffect(() => {
    if (stateBtn && isBookings) {
      setName("ВАШЕ");
    } else if (stateBtn) {
      setName("ЗАНЯТО");
    } else if (!stateBtn) {
      setName("ВЗЯТЬ");
    }
  }, [stateBtn, isBookings]);
  return (
    <div className="user-book">
      <div className="user-book__card">
        <img className="book__img" src={book.image} alt="book images" />
        <h3 className="book__title">{book.title}</h3>
        <h5 className="book__author">{book.author}</h5>
        <div className="book__response">
          <div
            className={cn({
              book__heart: !heart,
              book__heart_active: heart,
            })}
            onClick={favorites}
          ></div>
          <div
            className={cn({
              active__block: !stateBtn && isBookings,
              active__block_booking: stateBtn && !isBookings,
            })}
          >
            <button
              className={cn({
                book__btn: !stateBtn,
                book__btn_active: stateBtn,
              })}
              type="submit"
              onClick={booking}
            >
              {name}
            </button>
          </div>
        </div>
        <p className="table__list-info">
          <span>Жанры:</span>
          {book.genres.join("  ").split("  ").join(" / ")}
        </p>
        <p className="table__list-info">
          <span>Язык:</span>
          {book.languages}
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
            <button
              className={cn({
                reviews__btn: !error,
                "reviews__btn--disabled": error,
              })}
              onClick={() => setActive(!active)}
            >
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
            image={el.image}
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
