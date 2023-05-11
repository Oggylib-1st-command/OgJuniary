import "./adminUsersDelete.scss";

export const AdminUsersDelete = ({ handleDelete }) => {
  return (
    <div className="admin-users__delete-bg">
      <div className="users-delete">
        <h3 className="users-delete__title">
          Вы точно хотите удалить пользователя?
        </h3>
        <div className="users-delete__btns">
          <button className="users-delete__yes-btn">ДА</button>
          <button
            className="users-delete__no-btn"
            onClick={(e) => handleDelete(e)}
          >
            НЕТ
          </button>
        </div>
      </div>
    </div>
  );
};
