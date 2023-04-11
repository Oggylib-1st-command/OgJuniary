import './catalog.scss'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Card from '../../components/Card/Card'
import Paggination from '../Paggination'

const info1 =[
  {
    id:1,
    author:'AAAAA',
    title:'AAAAAA',
    genre:'AAAAAA',
  },
  {
    id:2,
    author:'BBBBBB',
    title:'BBBBBB',
    genre:'BBBBBB',
  },
  {
    id:3,
    author:'CCCCCCC',
    title:'CCCCCCC',
    genre:'CCCCCCC',
  },
  {
    id:4,
    author:'DDDDDD',
    title:'DDDDDDD',
    genre:'DDDDDD',
  }
]

function Catalog(){
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [bookperpage] = useState(2);

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
          info1.map((obj)=>
            <Card key={obj.id} titleLink={obj.title.split(' ').join('')} author={obj.author} title={obj.title} genre={obj.genre}/>
          )
        }
        <Paggination
          bookPerPage = {bookperpage}
          totalBook = {info1.length }
          paginate = {paginate}
        />

        <button className="btn btn-primary" onClick={prevPage}>Prev Page</button>
        <button className="btn btn-primary" onClick={nextPage}>Next Page</button>
      </div>
    </div> 
  )
}

export default Catalog;