import {Link} from 'react-router-dom'
import './main.scss'


function Main(){
  
  return(
    <div className='main__header'>
      <Link to='/login'>Login</Link>      
      <p>This is main</p>
    </div>
    
  )
}

export default Main;