import "./catalog.scss";
import Card from "../../components/Card/Card";
import { useInfoUser } from "./../../api/api";
import EmptyList from "./../../components/EmptyList/EmptyList";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cn from "classnames";
import { names } from "../../utils/takenSort";
import { FiltrationCatalog } from "../../components/FiltrationCatalog/FiltrationCatalog";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosSortCatalogeBook,
  axiosAllCatalogeBook,
  removeAllBooks,
  removeSortBooks,
  removeSearchBooks,
  removeFilterBooks,
} from "../../store/books/BookSlice";
const Catalog = () => {
  const dispatch = useDispatch();
  const { infoUser } = useInfoUser();
  const searchBook = useSelector(
    (state) => state.books.searchCatalogeBook.allSearchBooks
  );
  const sortBook = useSelector(
    (state) => state.books.sortCatalogeBook.sortBook
  );
  const allBook = useSelector((state) => state.books.allCatalogeBook.allBooks);
  const filterBook = useSelector(
    (state) => state.books.filterCatalogeBook.filterBooks
  );
  const [finalSetBook, setFinalSetBook] = useState([]);
  const [name, setName] = useState("");
  const [state, setState] = useState(false);

  const handleChange = (event) => {
    const sortType = event.target.value;
    dispatch(axiosSortCatalogeBook(sortType));
    dispatch(removeSearchBooks());
    dispatch(removeFilterBooks());
  };

  useEffect(() => {
    if (sortBook.length === 0 && searchBook.length === 0)
      dispatch(axiosAllCatalogeBook());
  }, []);

  useEffect(() => {
    if (searchBook.length !== 0) {
      setFinalSetBook(searchBook);
    } else if (filterBook.length !== 0) {
      setFinalSetBook(filterBook);
    } else if (sortBook.length !== 0) {
      setFinalSetBook(sortBook);
    } else {
      setFinalSetBook(allBook);
    }
  }, [searchBook, sortBook, allBook, filterBook]);
  useEffect(() => {
    return () => {
      localStorage.removeItem("page");
      dispatch(removeSearchBooks());
      dispatch(removeAllBooks());
      dispatch(removeSortBooks());
    };
  }, []);

  return (
    <div className="catalog__inner">
      <div className="catalog__content">
        <div className="catalog__search">
          <button
            className={cn({
              catalog__filtration: !state,
              catalog__filtration_active: state,
            })}
            type="submit"
            onClick={() => setState((state) => !state)}
          >
            <p className="filter__text">Фильтрация</p>
          </button>
          <div
            className={cn({
              filter__info: !state,
              filter__info_active: state,
            })}
          >
            {state ? (
              <FiltrationCatalog setState={setState} state={state} />
            ) : (
              <></>
            )}
          </div>
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                onChange={handleChange}
                onClick={() => setState(false)}
                displayEmpty
                renderValue={name !== "" ? undefined : () => "Сортировка"}
              >
                {names.map((elem) => (
                  <MenuItem key={elem.id} value={elem.id} id="menu-item-select">
                    {elem.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        {finalSetBook[0] === "NotFound" ||
        finalSetBook.length === 0 ||
        infoUser.length < 1 ? (
          <EmptyList
            title={undefined}
            img={"EmptyCatalog"}
            text={"В библиотеке нет книг"}
          />
        ) : (
          <>
            {finalSetBook.map((obj) => (
              <Card
                key={obj.id}
                id={obj.id}
                image={obj.image}
                author={obj.author}
                title={obj.title}
                genre={obj.genres.join(", ")}
                bookings={obj.bookings}
                owner={obj.owner}
                infoUser={infoUser}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
