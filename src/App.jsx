import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "@/assets/scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Home />
              </SearchContext.Provider>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
