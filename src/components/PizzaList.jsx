import PizzaBlock from "./PizzaBlock";
import dataPizza from "../data/dataPizza.js";

function PizzaList() {
  return (
    <>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {dataPizza.map((item) => (
          <PizzaBlock
            title={item.title}
            price={item.prices.small}
            key={`${Date.now()}-${Math.floor(Math.random() * 1e6)}`}
          />
        ))}
      </div>
    </>
  );
}

export default PizzaList;
