import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaList from "../components/PizzaList";

function Home(): JSX.Element {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <PizzaList />
    </div>
  );
}

export default Home;
