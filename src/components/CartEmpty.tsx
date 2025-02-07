import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CartEmpty: React.FC = () =>  {
  const navigate = useNavigate();

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="#" onClick={handleBackClick} className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
