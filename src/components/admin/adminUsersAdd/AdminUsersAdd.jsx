import "./adminUsersAdd.scss";

export const AdminUsersAdd = ({ handleAdd }) => {
  return (
    <div className="admin-users__delete-bg">
      <div className="users-add">
        <h3 className="users-add__title">Добавление пользователя</h3>
        <form className="users-add__form">
          <label className="users-add__email">
            Почта:
            <input className="users-add__input" type="text" />
          </label>
          <label className="users-add__name">
            Имя:
            <input className="users-add__input" type="text" />
          </label>
          <label className="users-add__surname">
            Фамилия:
            <input className="users-add__input" type="text" />
          </label>
        </form>
        <div className="users-add__btns">
          <button className="users-add__yes-btn">Сохранить </button>
          <button className="users-add__no-btn" onClick={handleAdd}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};
