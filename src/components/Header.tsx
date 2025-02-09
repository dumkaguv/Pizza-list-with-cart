import React from "react";
import { Link } from "react-router-dom";

import logo from "/img/pizza-logo.svg";
import Cart from "./CartHeader";
import Search from "./Search";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/" tabIndex={0}>
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
