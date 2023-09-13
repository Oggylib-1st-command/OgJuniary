import "./adminBook.scss";
import { useState, useEffect } from "react";
import Header from "../../../components/admin/adminHeader/Header";
import getImageKey from "../../../components/getImageKey";
import { Link, useParams } from "react-router-dom";
import QrPop from "../../../components/admin/QrPopUp/QrPopUp";
import DeletePop from "../../../components/admin/DeletePopUpBook/DeletePopUpBook";
import CommentCard from "../../../components/admin/commentcard/commentcard";
import { Pagination } from "@mui/material";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { axiosBookById, removeSearchBooks } from "../../../store/books/Slice";
import { ThemeProvider } from "@mui/material/styles";
import MuiColor from "../../MuiColor";

function AdminBook() {
  const theme = MuiColor();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.currentBook.book);
  const numberPage = parseInt(localStorage.getItem("page")) || 1;
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const comment = reviews || [];
  const [currentCommentPage, setCurrentCommentpage] = useState(numberPage);
  const commentPerPage = 4;

  const lastCommentIndex = currentCommentPage * commentPerPage;
  const firstCommentIndex = lastCommentIndex - commentPerPage;
  const currentComment = comment.slice(firstCommentIndex, lastCommentIndex);
  const countPage = Math.ceil(comment.length / commentPerPage);

  const toggleQrPopup = () => {
    setIsQrOpen(!isQrOpen);
  };

  const toggleDeletePopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleChange = (e, p) => {
    setCurrentCommentpage(p);
    localStorage.setItem("page", p);
  };

  useEffect(() => {
    dispatch(axiosBookById(id));
  }, [id]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("page");
      dispatch(removeSearchBooks());
    };
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const getRevie = await axios.get("http://127.0.0.1:8000/reviews/");
      const filt = getRevie.data.filter((el) => +el.book === +id);
      console.log(filt);
      setReviews(filt);
    };
    getReviews();
  }, []);

  return (
    <div>
      <Header />
      <QrPop isActive={isQrOpen} handleClose={toggleQrPopup} />
      <DeletePop
        isActive={isDeleteOpen}
        handleClose={toggleDeletePopup}
        id={id}
      />
      <div className="book__content">
        <div className="book__info">
          <div className="book__wrap">
            <div className="book__canvas">
              <img className="book__canvas-img" src={book.image} alt="book" />
            </div>
            <div className="book__but">
              <img
                className="book__but__trash"
                src={getImageKey("IconTrash")}
                alt=""
                onClick={toggleDeletePopup}
              />
              <Link className="book__but__edit-link" to="edit">
                <img
                  className="book__but__edit"
                  src={getImageKey("IconEdit")}
                  alt=""
                />
              </Link>
              <img
                className="book__but__QR"
                src={getImageKey("IconQR")}
                alt=""
                onClick={toggleQrPopup}
              />
            </div>
            <div className="book__text">
              <div className="book__text-title">{book.title} </div>
              <div className="book__text-author">Автор: {book.author}</div>
              <div className="book__text-year">Год издания: {book.year}</div>
              <div className="book__text-year">Язык: {book.languages}</div>
              <div className="book__text-rating">
                <Rating
                  name="half-rating-read"
                  value={+book.rating}
                  precision={1}
                  size="large"
                  readOnly
                />
              </div>
              <div className="book__text-genre">
                Жанры:
                <p>{book.genres.join("  ").split("  ").join(" / ")}</p>
              </div>
              <div className="book__text-description">Описание книги:</div>
              <div className="book__text-description__text">
                {book.description}
              </div>
            </div>
          </div>
          <div className="book__comment">
            <p className="book__comment__text"> Отзывы </p>

            {comment.length === 0 ? (
              <p className="book__comment__without">
                {" "}
                Ещё никто не оставил отзыва{" "}
              </p>
            ) : (
              <>
                {reviews.map((obj) => (
                  <CommentCard
                    key={obj.id}
                    id={obj.id}
                    img={obj.image}
                    name={obj.name}
                    surname={obj.surname}
                    data={obj.created_at}
                    rating={obj.value}
                    text={obj.text}
                  />
                ))}
                <div className="book__comment__pagination">
                  <ThemeProvider theme={theme}>
                    <Pagination
                      count={countPage}
                      color="orange"
                      page={currentCommentPage}
                      onChange={handleChange}
                    />
                  </ThemeProvider>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBook;
