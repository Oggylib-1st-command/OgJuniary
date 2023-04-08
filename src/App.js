import { Routes, Route } from "react-router-dom";

import Main from './pages/main/Main'
import Catalog from './pages/catalog/Catalog'
import History from './pages/history/History'
import Favorites from './pages/favorites/Favorites'
import Authorization from './pages/authorization/Auth'
import Admin from './pages/admin/Admin'
import NotFound from "./pages/notfound/notfound";
import {Layout} from "./components/Layout/Layout"
import {Book} from "./pages/book/book"


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>} />
          <Route path="catalog" element={<Catalog/>} />
          <Route path="catalog/:id" element={<Book/>} />
          <Route path="history" element={<History/>} />
          <Route path="favorites" element={<Favorites/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="*" element={<NotFound/>}/>
        </Route>
        <Route path="/login" element={<Authorization/>}/>
      </Routes>
    </div>
  );
}

export default App;
