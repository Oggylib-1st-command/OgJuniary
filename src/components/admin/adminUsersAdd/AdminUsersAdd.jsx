import axios from "axios";
import "./adminUsersAdd.scss";
import { useState, useEffect } from "react";
export const AdminUsersAdd = ({ handleAdd }) => {
  const [user, setUser] = useState({
    mail: "",
    name: "",
    surname: "",
  });
  const addUser = async () => {
    if (user.mail && user.name && user.surname) {
      console.log(user);
      const addUserInfo = await axios.post("", user);
      console.log(addUserInfo);
      handleAdd();
    }
  };
  return (
    <div className="admin-users__delete-bg">
      <div className="users-add">
        <h3 className="users-add__title">Добавление пользователя</h3>
        <form className="users-add__form">
          <label className="users-add__email">
            Почта:
            <input
              className="users-add__input"
              value={user.mail}
              onChange={(e) =>
                setUser(() => ({ ...user, mail: e.target.value }))
              }
              type="text"
              required
            />
          </label>
          <label className="users-add__name">
            Имя:
            <input
              className="users-add__input"
              value={user.name}
              onChange={(e) =>
                setUser(() => ({ ...user, name: e.target.value }))
              }
              type="text"
              required
            />
          </label>
          <label className="users-add__surname">
            Фамилия:
            <input
              className="users-add__input"
              value={user.surname}
              onChange={(e) =>
                setUser(() => ({ ...user, surname: e.target.value }))
              }
              type="text"
              required
            />
          </label>
        </form>
        <div className="users-add__btns">
          <button className="users-add__yes-btn" onClick={addUser}>
            Сохранить{" "}
          </button>
          <button className="users-add__no-btn" onClick={handleAdd}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};
