import Login from './components/Login/login'
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="103408156486-oi1sggasovhdi35bc4av65rrlt2rteus.apps.googleusercontent.com"><Login/></GoogleOAuthProvider>;   
    </div>
  );
}

export default App;
