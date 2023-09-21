import './GenreCardMainPage.scss';

function GenreCardMainPage({genre}) { 
  return (
    <div>
      <div className='genre-card'>{genre}</div>
    </div>
  )
}

export default GenreCardMainPage