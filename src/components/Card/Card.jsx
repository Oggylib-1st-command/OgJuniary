import './card.scss'
import { Link } from 'react-router-dom';
import Cvetok from './../../assets/background/1.jpg'
import axios from "axios";


function Card(props){
  return(
    <div className="card">
      <div className='card__inner'>
        <img className="card__img" src='https://i.postimg.cc/GpSKbfZs/1.jpg' alt="background card book"/>
        <div className='card__info'>
          <ul className="card__list">
            <Link className="card__list-item" to={`/catalog/${props.titleLink}`}>{props.author}</Link>
            <li className="card__list-item">{props.title}</li>
            <li className="card__list-item">{props.genre}</li>
          </ul>
          <div className="card__response">
            <button className="card__btn" type="submit">ВЗЯТЬ</button>
            <div className="card__heart">
              
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Card;