import "./commentcard.scss";
import getImageKey from "../../../components/getImageKey";
import { Rating } from "@mui/material";

function CommentCard() {
  return (
    <div className="comment__content">
      <div className="comment__head">
        <img
          className="comment__UserIcon"
          src={getImageKey("UserIcon")}
          alt={"UserIcon"}
        ></img>
        <div classname="comment__info">
          <p className="comment__info__name">Vasilyi Vaska</p>
          <p className="comment__info__data">27 april 2023</p>
        </div>
        <div className="comment__rating">
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            size="large"
            readOnly
          />
        </div>
      </div>
      <div className="comment__text">
        <p className="comment__text__title">
          Книга – настоящий хит. В России еще не было настолько нужной и
          актуальной книги для менеджеров, написанной российским менеджером. В
          этой книге Вы найдете абсолютный позитив и прямое руководство к
          действию. Это книга для всех, кто сомневался, что в Москве можно
          добиться успеха без связей, без престижного образования, без лжи, Это
          книга для всех, кто сомневался, что в Москве можно добиться успеха без
          связей, без престижного образования, без лжи, лизоблюдства и
          подсиживания коллег Книга – настоящий хит.
        </p>
        <button className="comment__text__but">Развернуть</button>
      </div>
    </div>
  );
}

export default CommentCard;
