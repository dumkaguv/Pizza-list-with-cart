import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

import "@/assets/scss/app.scss";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";

const Cart = React.lazy(() => import("@/pages/Cart"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const FullPizza = React.lazy(() => import("@/pages/FullPizza"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route
              path="cart"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="pizza/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FullPizza />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
