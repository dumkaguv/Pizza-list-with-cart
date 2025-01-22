import { useState, useEffect } from "react";
import PizzaBlock from "./PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function PizzaList({ activeCategoryType, activeSortIndex, searchValue }) {
  const [dataPizza, setDataPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const sortOptionsMap = {
    0: "rating&order=desc",
    1: "rating&order=asc",
    2: "prices&order=desc",
    3: "prices&order=asc",
    4: "title&order=desc",
    5: "title&order=asc",
  };

  const getActiveCategoryType = () => {
    return activeCategoryType === 0 ? "" : `category=${activeCategoryType}`;
  };

  const getActiveSortType = () => {
    return `&sortBy=${sortOptionsMap[activeSortIndex]}`;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const url = `http://localhost:3000/api/pizzas?${getActiveCategoryType()}
        // ${getActiveSortType()}&page=${currentPage}&limit=${itemsPerPage}
        // &search=${searchValue}`;
        const response = await fetch(url);
        console.log(url)
        if (response.ok) {
          const data = await response.json();

          setDataPizza(data.data);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }

      window.scrollTo(0, 0)
    };

    fetchData();
  }, [activeCategoryType, activeSortIndex, searchValue, currentPage]);

  return (
    <>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : dataPizza.map((obj, index) => (
              <PizzaBlock key={`${obj.title}-${index}`} {...obj} />
            ))}
      </div>
      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default PizzaList;
