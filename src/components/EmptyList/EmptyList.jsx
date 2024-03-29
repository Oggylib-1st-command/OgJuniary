import "./EmptyList.scss";
import getImageKey from "../getImageKey";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSearchBooks } from "../../store/books/BookSlice";
import { removeSearchUsers } from "../../store/users/UserSlice";

const EmptyList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlPath = window.location.pathname;

  const backtoMain = () => {
    if (urlPath.indexOf("admin") === -1) {
      navigate("/catalog");
    } else if (urlPath.indexOf("admin/catalog") >= 0) {
      dispatch(removeSearchBooks());
      navigate("/admin/catalog");
    } else if (urlPath.indexOf("admin/user") >= 0) {
      dispatch(removeSearchUsers());
      navigate("/admin/users");
    }
  };
  return (
    <div className="wrapper">
      <div className="empty">
        {props.title === undefined ? (
          <></>
        ) : (
          <>
            <div className="empty__title">
              <p className="empty__title__text"> {props.title} </p>
            </div>
          </>
        )}
        <div className="empty__content">
          <img
            src={getImageKey(props.img)}
            alt=""
            className="empty__content__img"
          />
          <p className="empty__content__text"> {props.text} </p>
          <button className="empty__content__butmain" onClick={backtoMain}>
            Назад на главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
