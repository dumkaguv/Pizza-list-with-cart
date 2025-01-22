import { useState } from "react";
import Button from "../Button";

function PizzaBlock({ title, prices, imageUrl, sizes, types }) {
  const [activeType, setActiveType] = useState(0);
  const [activePizzaSize, setActivePizzaSize] = useState(0);
  const [price, setPrice] = useState(0);

  const pricesValues = Object.values(prices);
  const typeName = ["тонкое", "традиционное"];

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
        width={260}
        height={260}
        loading="lazy"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeIndex, index) => (
            <li
              onClick={() => setActiveType(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter") setActiveType(index);
              }}
              className={index === activeType ? "active" : ""}
              key={`type-${typeIndex}-${index}`}
              tabIndex="0"
            >
              {typeName[typeIndex]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              className={index === activePizzaSize ? "active" : ""}
              onClick={() => {
                setActivePizzaSize(index);
                setPrice(pricesValues[index]);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setActivePizzaSize(index);
                  setPrice(pricesValues[index]);
                }
              }}
              key={`size-${size}-${index}`}
              tabIndex="0"
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price || pricesValues[0]}</div>
        <Button classes={["button button--outline button--add"]}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>0</i>
        </Button>
      </div>
    </div>
  );
}

export default PizzaBlock;
