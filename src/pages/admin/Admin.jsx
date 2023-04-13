import './admin.scss'

import Logo from './../../assets/icons/Logo.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/useAuth';
import Cookies from 'js-cookie';


function Admin(){
  const navigate = useNavigate();
  const {signout} = useAuth();
  const logout = () => {
    Cookies.remove('admin')
    signout(()=>navigate('/login',{replace:true}));
    };
  return(
    <div className='admin__inner'>
      <div className="container__inner">
        <Link className="header__logo-link" to="/admin">
          <img className="header__logo" src={Logo} alt="logo icons" />
        </Link>
        <p className="header__logo-text">Oggylib</p>
        <button className='menu__logout' onClick={logout}>Log Out</button>
      </div>
      <p>This is Admin Panel in future</p>
    </div>
  )
}

export default Admin;