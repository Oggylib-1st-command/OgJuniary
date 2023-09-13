import "./Catalog.scss";
import BookCardCatalog from "./../adminBookCardCatalog/BookCardCatalog";
import { Pagination } from "@mui/material";
import { useInfoBook } from "./../../../api/api";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import EmptyList from "../../EmptyList/EmptyList";
import MuiColor from "../../../pages/MuiColor";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosAllCatalogeBook,
  removeSearchBooks,
  removeAllBooks,
  removeSortBooks,
} from "../../../store/books/Slice";

const Catalog = () => {
  const dispatch = useDispatch();
  const theme = MuiColor();
  const searchBook = useSelector(
    (state) => state.books.searchCatalogeBook.allSearchBooks
  );
  const sortBook = useSelector(
    (state) => state.books.sortAdminCatalogeBook.sortAdminBook
  );
  const allBook = useSelector((state) => state.books.allCatalogeBook.allBooks);
  const [finalSetBook, setFinalSetBook] = useState([]);
  const [countPage, setCountPage] = useState(0);
  const numberPage = parseInt(localStorage.getItem("page")) || 1;
  const [currentPage, setCurrentPage] = useState(numberPage);
  const bookOnPage = 20;
  const lastBookOnPage = currentPage * bookOnPage;
  const firstBookOnPage = lastBookOnPage - bookOnPage;
  useEffect(() => {
    if (sortBook.length === 0 && searchBook.length === 0)
      dispatch(axiosAllCatalogeBook());
  }, []);
  useEffect(() => {
    if (sortBook.length !== 0) setCurrentPage(1);
  }, [sortBook]);
  useEffect(() => {
    if (searchBook.length !== 0) {
      setFinalSetBook(searchBook);
    } else if (sortBook.length !== 0) {
      setFinalSetBook(sortBook);
    } else {
      setFinalSetBook(allBook);
    }
  }, [searchBook, sortBook, allBook]);

  useEffect(() => {
    setCountPage(Math.ceil(finalSetBook.length / bookOnPage));
  }, [finalSetBook]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("page");
      dispatch(removeSearchBooks());
      dispatch(removeAllBooks());
      dispatch(removeSortBooks());
    };
  }, []);
  const handleChange = (prev, next) => {
    setCurrentPage(next);
    localStorage.setItem("page", next);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="admin-catalog__wrapper">
        <div className="admin-catalog__inner">
          {finalSetBook[0] !== "NotFound" ? (
            finalSetBook
              .slice(firstBookOnPage, lastBookOnPage)
              .map((target) => (
                <BookCardCatalog
                  key={target.id}
                  id={target.id}
                  title={target.title}
                  author={target.author}
                  image={target.image}
                  holder={target.holder}
                />
              ))
          ) : (
            <EmptyList
              title={"Пусто"}
              text={"По вашему запросу ничего не найдено"}
              img={"EmptyCatalog"}
            />
          )}
        </div>
      </div>
      {finalSetBook.length === 0 ? (
        <></>
      ) : (
        <ThemeProvider theme={theme}>
          <Pagination
            className="paggination"
            count={countPage}
            color="orange"
            page={currentPage}
            onChange={handleChange}
          />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Catalog;
