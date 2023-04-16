import { Routes, Route } from "react-router-dom";

import Main from "./pages/main/Main";
import Catalog from "./pages/catalog/Catalog";
import History from "./pages/history/History";
import Favorites from "./pages/favorites/Favorites";
import Authorization from "./pages/authorization/Auth";
import Admin from "./pages/admin/Admin";
import { TakenBook } from "./pages/takenBook/TakenBook";
import NotFound from "./pages/notfound/notfound";
import { Layout } from "./components/Layout/Layout";
import { Book } from "./pages/book/book";
import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Main />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="catalog/:id" element={<Book />} />
            <Route path="history" element={<History />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="takenbook" element={<TakenBook />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Authorization />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
