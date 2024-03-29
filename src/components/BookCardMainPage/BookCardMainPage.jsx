import './BookCardMainPage.scss';
import { Link } from 'react-router-dom';

function BookCardMainPage({id, title, author, image}) { 
  return (
    <Link to={`/catalog/${id}`}>
      <div className='card-wrapper'>
        <img src={image} alt='image-book' className='card-wrapper__image'/>
        <div className='text-container'>
          <p className='text-container__card-title'>{title}</p>
          <p className='text-container__card-author'>{author}</p>
        </div>
      </div>
    </Link>
  )
}   


export default BookCardMainPage;    