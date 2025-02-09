import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { CartItem } from "@/redux/slices/cartSlice";
import Header from "@/components/Header";

const MainLayout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const saveCartItemsInLocalStorage = (cartItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  useEffect(() => {
    saveCartItemsInLocalStorage(cartItems);
  }, [cartItems]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
