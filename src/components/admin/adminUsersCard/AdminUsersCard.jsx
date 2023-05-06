import "./adminUsersCard.scss";
import getImageKey from "./../../../components/getImageKey";
import { Link } from "react-router-dom";

export const AdminUsersCard = ({ handleDelete }) => {
  return (
    <div className="users__content-card">
      <div className="users__info">
        <img
          className="users__info-avatar"
          src={getImageKey("UserIcon")}
          alt=""
        />
        <div className="users__info-text">
          <div className="fullname">
            <span>Василий</span>
            <span>Васька</span>
          </div>
          <span>Vasiliyvaska@yandex.ru</span>
        </div>
      </div>
      <div className="users__choosen">
        <span>
          <Link className="users__choosen-text" to="#">
            Перейти в “Взятые книги”
          </Link>
        </span>
      </div>
      <div className="users__options">
        <img
          className="users__options-edit"
          src={getImageKey("IconEdit")}
          alt="edit icon"
        ></img>
        <img
          className="users__options-delete"
          src={getImageKey("IconTrash")}
          alt="delete icon"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
