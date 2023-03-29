import Login from './components/Login/login'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './pages/main/Main'


function App() {
  return (
    <div className="App">
      {/* <GoogleOAuthProvider clientId="103408156486-oi1sggasovhdi35bc4av65rrlt2rteus.apps.googleusercontent.com">
        <Login/>
      </GoogleOAuthProvider>;    */}
      <Main/>
    </div>
  );
}

export default App;
