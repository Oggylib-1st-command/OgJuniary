import "./Users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./../../useAuth";
import { AdminUsersCard } from "../adminUsersCard/AdminUsersCard";
import Cookies from "js-cookie";
import { AdminUsersDelete } from "../adminUsersDelete/AdminUsersDelete";
import { AdminUsersAdd } from "../adminUsersAdd/AdminUsersAdd";
import axios from "axios";

function Users() {
  const [user, setUser] = useState([]);
  const [userDelete, setUserDelete] = useState(false);
  const [userAdd, setUserAdd] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:8000/users/");
      setUser(res.data);
    };
    getUser();
  }, []);

  const handleDelete = (e) => {
    e.stopPropagation();
    setUserDelete(!userDelete);
    console.log("delet");
  };
  const handleAdd = (e) => {
    e.stopPropagation();
    setUserAdd(!userAdd);
  };
  const navigate = useNavigate();
  const { signout } = useAuth();
  const logout = () => {
    Cookies.remove("admin");
    signout(() => navigate("/login", { replace: true }));
  };
  return (
    <div
      className={
        userDelete || userAdd ? "admin__users disactive" : "admin__users"
      }
    >
      <div className="admin__users-top">
        <select className="admin__users-sort">
          <option value="">Сортировка: От А до Я</option>
          <option value="">Сортировка: От Я до А</option>
        </select>
        <div className="admin__users-info">
          <button className="admin__add-users" onClick={(e) => handleAdd(e)}>
            Добавить пользователя
          </button>
          <p className="menu__logout admin__logout" onClick={logout}>
            Выйти из аккаунта
          </p>
        </div>
      </div>
      <div className="admin__users-content">
        {userDelete && <AdminUsersDelete handleDelete={handleDelete} />}
        {userAdd && <AdminUsersAdd handleAdd={handleAdd} />}
        {user.map((e) => (
          <AdminUsersCard
            key={e.id}
            id={e.id}
            handleDelete={handleDelete}
            userName={e.name}
            surname={e.surname}
            mail={e.mail}
          />
        ))}
      </div>
    </div>
  );
}

export default Users;
