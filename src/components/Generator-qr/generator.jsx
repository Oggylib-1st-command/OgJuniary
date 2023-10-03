import { useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import toImg from "react-svg-to-image";
import "./generator.scss";

function GeneratorQr({ path, id }) {
  const [textQr, setTextQr] = useState(
    path.split("admin/")[0].concat(path.split("admin/")[1])
  );
  const saveQr = (e) => {
    toImg(".GeneratorQr", "name", {
      scale: 1.3,
      format: "jpg",
      download: false,
    }).then((file) => saveAs(file, `image_${id}.jpg`));
    e.preventDefault();
  };
  return (
    <div className="container__generator">
      <QRCode
        size={256}
        style={{ height: "300px", maxWidth: "300px", width: "100%" }}
        fgColor={"#000000"}
        value={textQr}
        viewBox={`0 0 256 256`}
        className="GeneratorQr"
      />
      <form className="form__qr">
        <input
          className="form__input-qr"
          type="text"
          value={textQr}
          onChange={(e) => setTextQr(e.target.value)}
          placeholder="Введите ссылку на книгу"
          style={{ display: "none" }}
        />
        <button
          className="form__download-qr"
          onClick={(e) => saveQr(e)}
          type="submit"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default GeneratorQr;
