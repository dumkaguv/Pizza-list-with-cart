import Header from "../components/Header";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaList from "../components/PizzaList";

function Home() {
  return (
    <div className="wrapper"> 
      <Header />
      <main className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <PizzaList />
        </div>
      </main>
    </div>
  );
}

export default Home;
