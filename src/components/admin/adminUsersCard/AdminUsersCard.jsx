import "./adminUsersCard.scss";
import { useState, useEffect } from "react";
import getImageKey from "./../../../components/getImageKey";
import axios from "axios";
import { Link } from "react-router-dom";

export const AdminUsersCard = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [bookperpage] = useState(10);

  useEffect(() => {
    const getUser = async () => {
      setLoading(false);
      // const res = await axios.get("http://localhost:8000/users/");
      // setUser(res.data);
      setLoading(true);
    };
    getUser();
  }, []);

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
        />
      </div>
    </div>
  );
};
