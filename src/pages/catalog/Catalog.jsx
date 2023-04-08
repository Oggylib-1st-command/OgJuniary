import './catalog.scss'

import Card from '../../components/Card/Card'

const arr=[
  {
    id:1,
    author:'Лев Николаевич Толстой',
    title:'Война и мир',
    genre:'Вода, ужасы, комедия',
  },
  {
    id:2,
    author:'Иван Васильевич',
    title:'Что-то с чем-то',
    genre:'Я хэ',
  },
  {
    id:3,
    author:'Тетруашвили Елена Викторовна',
    title:'Вы все говно',
    genre:'Повседневность',
  },
  {
    id:4,
    author:'kkkkkkk',
    title:'kkkkkkk',
    genre:'kkkkkkk',
  }
]
function Catalog(){
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
          arr.map((obj)=>
            <Card key={obj.id} titleLink={obj.title.split(' ').join('')} author={obj.author} title={obj.title} genre={obj.genre}/>
          )
        }
      </div>
    </div> 
  )
}

export default Catalog;