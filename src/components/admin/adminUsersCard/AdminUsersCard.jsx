import "./adminUsersCard.scss";
import getImageKey from "./../../../components/getImageKey";
import { Link } from "react-router-dom";
import { useState } from "react";

export const AdminUsersCard = ({ handleDelete }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("Василий");
  const handleEdit = () => {
    setEdit(!edit);
  };
  const chooseName = () => {
    setEdit(!edit);
  };
  return (
    <div className="users__content-card">
      {edit ? (
        <>
          <div className="users__info">
            <img
              className="users__info-avatar"
              src={getImageKey("UserIcon")}
              alt=""
            />
            <div className="users__info-text">
              <div className="fullname">
                <input
                  className="users__info-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <input
                className="users__info-input"
                type="email"
                value={"Vasiliyvaska@yandex.ru"}
              />
            </div>
          </div>
          <div className="edit__options">
            <button className="users__edit-save" onClick={chooseName}>
              Сохранить всё
            </button>
            <button className="users__edit-cancel" onClick={handleEdit}>
              Отменить всё
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="users__info">
            <img
              className="users__info-avatar"
              src={getImageKey("UserIcon")}
              alt=""
            />
            <div className="users__info-text">
              <div className="fullname">
                <span>{name}</span>
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
              onClick={handleEdit}
            ></img>
            <img
              className="users__options-delete"
              src={getImageKey("IconTrash")}
              alt="delete icon"
              onClick={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
};
