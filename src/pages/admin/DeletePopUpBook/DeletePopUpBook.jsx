import "./DeletePopUpBook.scss";
import React from "react";

function DeletePop(props) {
  return (
    <div
      className={
        !props.isActive ? "DeletePop__bg" : "DeletePop__bg DeletePop--active"
      }
    >
      <div
        className={
          !props.isActive ? "DeletePop" : "DeletePop DeletePop--active"
        }
      >
        <p className="DeletePop__text">Вы точно хотите удалить книгу?</p>
        <div className="DeletePop__but">
          <button className="DeletePop__but__Yes">Да</button>
          <button className="DeletePop__but__No" onClick={props.handleClose}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePop;
