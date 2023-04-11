import './card.scss'
import { Link } from 'react-router-dom';
import Cvetok from './../../assets/background/1.jpg'


function Card(props){  
  return(
    <div className="card">
      <div className='card__inner'>
        <img className="card__img" src={Cvetok} alt="background card book"/>
        <div className='card__info'>
          <ul className="card__list">
            <Link className="card__list-item" to={`/catalog/${props.titleLink}`}>{props.author}</Link>
            <li className="card__list-item">{props.title}</li>
            <li className="card__list-item">{props.genre}</li>
          </ul>
          <div className="card__response">
            <button className="card__btn" type="submit">ВЗЯТЬ</button>
            <div className="card__heart">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="bi bi-heart" viewBox="0 0 16 16">
              <path fill='red' d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Card;