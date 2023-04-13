import { createContext,useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
  const [ user,setUser ] = useState(null);
  const [ admin,setAdmin ] = useState(false);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  
  const signin = (newUser,cb,isAdmin)=>{
    setUser(newUser);
    cb();
    setAdmin(isAdmin);
  } 
  const signout = (cb)=>{
    setUser(null);
    cb();
    setAdmin(false);
  }
  const value = {user,signin,signout,fromPage,admin};

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>

}