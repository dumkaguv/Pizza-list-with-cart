import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { SearchContext } from "@/App";
import { setTotalPages, setCurrentPage } from "@/redux/slices/paginationSlice";
import PizzaBlock from "./PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import Pagination from "@/components/Pagination";

function PizzaList() {
  const [dataPizza, setDataPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();

  const { categoryId: activeCategoryType, sortId: activeSortIndex } = useSelector(
    (state) => state.filter
  );
  const { totalPages, currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

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
    dispatch(setCurrentPage(newPage));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const url = `http://localhost:3000/api/pizzas?${getActiveCategoryType()}
        // ${getActiveSortType()}&page=${currentPage}&limit=${itemsPerPage}
        // &search=${searchValue}`;
        const response = await axios.get(url);

        if (response.status === 200) {
          const data = response.data;

          setDataPizza(data.data);
          dispatch(setTotalPages(data.totalPages));
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }

      if (activeCategoryType) {
        dispatch(setCurrentPage(1));
      }

      window.scrollTo(0, 0);
    };

    fetchData();
  }, [activeCategoryType, activeSortIndex, searchValue, currentPage, totalPages]);

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
        currentPage={currentPage}
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default PizzaList;
