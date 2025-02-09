import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Button from "@/components/Button";
import {
  addItem,
  selectIsInCart,
  selectCartItemQuantity,
} from "@/redux/slices/cartSlice";
import PIZZA_TYPES from "@/constants/pizzaTypes";
import { RootState } from "@/redux/store";

const BASE_URL = "https://pizza-list-with-cart-api.vercel.app/api/pizzas";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    title: string;
    imageUrl: string;
    rating: number;
    ingredients: string[];
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const type = PIZZA_TYPES[Number(queryParams.get("type"))];
  const size = Number(queryParams.get("size"));
  const price = Number(queryParams.get("price"));

  const item = {
    id: Number(id),
    title: pizza?.title || "",
    imageUrl: pizza?.imageUrl || "",
    type,
    size,
    price,
  };

  const isInCart = useSelector((state: RootState) => selectIsInCart(state, item));
  const quantity = useSelector((state: RootState) => selectCartItemQuantity(state, item));

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/${id}`)
      .then((response) => setPizza(response.data))
      .catch((error) => {
        console.error("Ошибка загрузки пиццы:", error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="container">
      {isLoading ? (
        <span>Загрузка...</span>
      ) : (
        pizza && (
          <div className="fullPizza">
            <img src={pizza.imageUrl} width={350} height={350} alt="" />
            <div className="fullPizza__wrapper">
              <ul className="fullPizza__info">
                <li className="fullPizza__info-item">
                  <span className="fullPizza__info-key">Название:</span>{" "}
                  <span className="fullPizza__info-value">{pizza.title}</span>
                </li>
                <li className="fullPizza__info-item">
                  <span className="fullPizza__info-key">Рейтинг:</span>{" "}
                  <span className="fullPizza__info-value">{pizza.rating} 🌟</span>
                </li>
                <li className="fullPizza__info-item">
                  <span className="fullPizza__info-key">Ингредиенты:</span>{" "}
                  <span className="fullPizza__info-value">
                    {pizza.ingredients?.join(", ") || "Нет данных"}
                  </span>
                </li>
                <li className="fullPizza__info-item">
                  <span className="fullPizza__info-key">Тип теста:</span>{" "}
                  <span className="fullPizza__info-value">{type}</span>
                </li>
                <li className="fullPizza__info-item">
                  <span className="fullPizza__info-key">Размер:</span>{" "}
                  <span className="fullPizza__info-value">{size} см</span>
                </li>
                <li className="fullPizza__info-item">
                  <span className="fullPizza__info-key">Цена:</span>{" "}
                  <span className="fullPizza__info-value">{price} ₽</span>
                </li>
              </ul>
              <div className="fullPizza__buttons">
                <Button
                  onClick={() => dispatch(addItem(item))}
                  classes={["button button--outline button--add"]}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                      fill="white"
                    />
                  </svg>
                  <span>Добавить</span>
                  {isInCart && <i>{quantity}</i>}
                </Button>
                <Link
                  to="#"
                  onClick={handleBackClick}
                  className="button button--black"
                >
                  <span>Вернуться назад</span>
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FullPizza;
