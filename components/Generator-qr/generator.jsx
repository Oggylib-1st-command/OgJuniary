import { useState } from "react";
import QRCode from "react-qr-code";
import './generator.scss'
function GeneratorQr(){
  const [textQr,setTextQr] = useState('');
  const saveQr=(e)=>{
    const qrCode = document.querySelector('.container__generator > canvas');
    console.log();
    const pngUrl = qrCode.toDataURL()
    e.target.href = pngUrl;
    e.preventDefault();
  }
  return(
    <div className="container__generator">
      <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "250px", width: "100%"}}
      fgColor={'#ffa200'}
      value={textQr}
      viewBox={`0 0 256 256`}
      className = 'GeneratorQr'
    />
    <form className="form__qr">
      <input className="form__input-qr" type="text" onChange={(e)=>setTextQr(e.target.value)} placeholder="Введите ссылку на книгу"/>
      <button className="form__download-qr" onClick={saveQr} type="submit">Download</button>
    </form>
    </div>
  )
};

export default GeneratorQr;