import "./EmptyList.scss";
import getImageKey from "../getImageKey";

const EmptyList = (props) => {
  return (
    <div className="wrapper">
      <div className="empty">
        {props.title === undefined ? (
          <></>
        ) : (
          <>
            <div className="empty__title">
              <img
                className="empty__title__back"
                src={getImageKey("ArrowBack")}
                alt="#"
              ></img>
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
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
