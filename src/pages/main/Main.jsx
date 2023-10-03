import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useInfoBook } from "./../../api/api";
import GenreCard from "../../components/GenreCardMainPage/GenreCardMainPage";
import Card from "../../components/BookCardMainPage/BookCardMainPage";
import "swiper/css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPopularBook, axiosTimeBook } from "../../store/books/BookSlice";

import "./main.scss";

function Main() {
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const popularBook = useSelector((state) => state.books.popularBook.popBook);
  const timeBook = useSelector((state) => state.books.timeBook.timBook);
  useEffect(() => {
    dispatch(axiosPopularBook());
    dispatch(axiosTimeBook());
  }, []);
  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(popularBook);

  return (
    <div className="main-wrapper">
      <div className="first-slider">
        <p className="first-slider__text">ПОПУЛЯРНЫЕ КНИГИ</p>
        <div className="popular-book-slider">
          <Swiper
            slidesPerView={3}
            spaceBetween={width < 370 ? 110 : 60}
            // loop={true}
            // modules={[FreeMode]}
            // freeMode={true}
            // speed={10}
          >
            {popularBook.map((obj) => (
              <SwiperSlide>
                <Card
                  id={obj.id}
                  title={obj.title}
                  author={obj.author}
                  image={obj.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="second-slider">
        <p className="second-slider__text">НОВЫЕ КНИГИ</p>
        <div className="new-book-slider">
          <Swiper slidesPerView={3} spaceBetween={width < 370 ? 110 : 60}>
            {timeBook.map((obj) => (
              <SwiperSlide>
                <Card
                  id={obj.id}
                  title={obj.title}
                  author={obj.author}
                  image={obj.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="rec-genre-wrapper">
        <div className="text-wrapper">
          <p>ПОДБОРКА ЖАНРОВ ДЛЯ ВАС</p>
        </div>
        <div className="rec-genre">
          <GenreCard genre={"Менеджмент"} />
          <GenreCard genre={"Программирование"} />
          <GenreCard genre={"Переговоры"} />
          <GenreCard genre={"Экономика"} />
          <GenreCard genre={"Маркетинг"} />
        </div>
      </div>
    </div>
  );
}

export default Main;
