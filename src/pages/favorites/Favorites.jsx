import "./favorites.scss";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useInfoBook, useInfoUser, useInfoUserId } from "./../../api/api";
import Card from "./../../components/Card/Card";
function Favorites() {
  const local = JSON.parse(Cookies.get("profile"));
  const [favorite] = useState([]);
  const navigate = useNavigate();
  const { infoUser } = useInfoUser();
  const { book } = useInfoBook();
  const { infoUserId } = useInfoUserId(local.id);
  useEffect(() => {
    if (infoUserId.length !== 0 && book.length !== 0) {
      infoUserId.bookid_favorites.map((el) => {
        const filt = book.filter((hist) => hist.id === el);
        favorite.push(filt[0]);
      });
    }
  }, [infoUserId, book]);
  return (
    <div className="taken">
      <div className="taken__inner">
        <div className="taken__top">
          <h2 className="taken__top-title">
            <Link
              href="#"
              className="taken__arrow"
              onClick={() => navigate(-1)}
            >
              <svg
                width="55"
                height="24"
                viewBox="0 0 55 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.939342 10.9393C0.353558 11.5251 0.353558 12.4749 0.939342 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939342 10.9393ZM55 10.5L2 10.5V13.5L55 13.5V10.5Z"
                  fill="black"
                />
              </svg>
            </Link>
            Избранное
          </h2>
        </div>
        <div className="taken__list">
          {favorite.length > 0 ? (
            favorite.map((el) => (
              <Card
                key={el.id}
                id={el.id}
                image={el.image}
                author={el.author}
                title={el.title}
                genre={el.genres.join(", ")}
                bookings={el.bookings}
                owner={el.owner}
                infoUser={infoUser}
              />
            ))
          ) : (
            <p className="taken__loading">
              Вы пока не добавили книг в избранное
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
