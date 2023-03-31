import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

import Main from './pages/main/Main'
import Catalog from './pages/catalog/Catalog'
import History from './pages/history/History'
import Favorites from './pages/favorites/Favorites'
import Authorization from './pages/authorization/Auth'
import Admin from './pages/admin/Admin'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Authorization/>}/>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/catalog" element={<Catalog/>} />
        <Route exact path="/history" element={<History/>} />
        <Route exact path="/favorites" element={<Favorites/>} />
        <Route exact path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
