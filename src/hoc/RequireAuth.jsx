import { useLocation,Navigate } from "react-router-dom";
import { useAuth } from "../components/useAuth";
import Cookies from 'js-cookie';

const RequireAuth = ({children})=>{
  const location = useLocation();
  const {user} = useAuth();
  const cooki =  Cookies.get("profile");

  console.log(cooki);
  if(!user & !cooki){
    return <Navigate to='/login' state={{from:location}}/>
  }
  return children;
}

export {RequireAuth};