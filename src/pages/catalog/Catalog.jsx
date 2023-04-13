import './catalog.scss'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Card from '../../components/Card/Card'
import Paggination from '../Paggination'

function Catalog(){
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [bookperpage] = useState(10);

  useEffect (() =>{
    const getBook = async () => {
      setLoading(true)
      const res = await axios.get('http://localhost:8000')
      setBook(res.data)
      setLoading(false)
    }


    getBook()
  }, [])

  const lastBookIndex = currentpage * bookperpage
  const firstbookIndex = lastBookIndex - bookperpage
  const currentBook = book.slice(firstbookIndex, lastBookIndex)

  const paginate = pageNumber => setCurrentpage(pageNumber)
  const nextPage = () => setCurrentpage(prev => prev+1)
  const prevPage = () => setCurrentpage(prev => prev-1)

  
  if(!loading)
  {
    return(
    <div className='catalog__inner'>
      <div className='catalog__content'>
        <h2>Loading...</h2>
      </div>
    </div> 
    )
  }
  return(
    <div className='catalog__inner'>
      <div className='catalog__content'>
        <div className="catalog__search">
          <div className="catalog__filtration">
           Ждесь будет много гемороя
            </div>
          <select className="catalog__sort">
            <option>По новизне</option>
            <option>По популярности</option>
            <option>По алфавиту</option>
          </select>
        </div>
        {
          currentBook.map((obj)=>
            <Card key={obj.id} titleLink={obj.title.split(' ').join('')} author={obj.author} title={obj.title} genre={obj.genre}/>
          )
        }
        <Paggination
          bookPerPage = {bookperpage}
          totalBook = {book.length}
          paginate = {paginate}
        />

        <button className="btn btn-primaryprev" onClick={prevPage} disabled={currentpage===1}>Prev Page</button>
        <button className="btn btn-primarynext" onClick={nextPage} disabled={currentpage===Math.ceil(book.length/bookperpage)}>Next Page</button>
      </div>
    </div> 
  )
}

export default Catalog;