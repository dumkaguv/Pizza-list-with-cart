import { useState } from "react";

import Header from "../components/Header";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaList from "../components/PizzaList";

function Home({ searchValue, setSearchValue }) {
  const [activeCategoryType, setActiveCategoryType] = useState(0);
  const [activeSortIndex, setActiveSortIndex] = useState(0);

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <main className="content">
        <div className="container">
          <div className="content__top">
            <Categories
              onCategoryClick={(index) => setActiveCategoryType(index)}
              isActive={activeCategoryType}
            />
            <Sort
              activeSortIndex={activeSortIndex}
              setActiveSortIndex={(index) => setActiveSortIndex(index)}
            />
          </div>
          <PizzaList
            activeCategoryType={activeCategoryType}
            activeSortIndex={activeSortIndex}
            searchValue={searchValue}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
