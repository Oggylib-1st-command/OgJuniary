import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

import Main from './pages/main/Main'
import Catalog from './pages/catalog/Catalog'
import History from './pages/history/History'
import Favorites from './pages/favorites/Favorites'
import Authorization from './pages/authorization/Auth'
import Admin from './pages/admin/Admin'
import NotFound from "./pages/notfound/notfound";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Authorization/>}/>
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
