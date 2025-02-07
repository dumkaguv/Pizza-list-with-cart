import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

import "@/assets/scss/app.scss";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import FullPizza from "@/pages/FullPizza";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
