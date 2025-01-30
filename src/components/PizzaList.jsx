import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setTotalPages, setCurrentPage } from "@/redux/slices/paginationSlice";
import {
  getConcatedQueryParams,
  getParamsFromUrl,
  saveSearchParamsRedux,
} from "@/helpers/UrlSearchParams";
import sortOptionsMap from "@/constants/getSortOptionsMap";

import PizzaBlock from "./PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import Pagination from "@/components/Pagination";

function PizzaList() {
  const [dataPizza, setDataPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchValue } = useSelector((state) => state.search);

  const { categoryId: activeCategoryType, sortId: activeSortIndex } = useSelector(
    (state) => state.filter
  );

  const { totalPages, currentPage } = useSelector((state) => state.pagination);

  const baseUrl = `http://localhost:3000/api/pizzas`;
  const urlParams = {
    categoryId: activeCategoryType,
    sortId: sortOptionsMap[activeSortIndex],
    currentPage,
    searchValue,
  };

  const parsedUrlParams = getConcatedQueryParams(urlParams);
  let url = `${baseUrl}${parsedUrlParams}`;
  let isReload = false;

  useEffect(() => {
    const changeUrlOnReloadWithUrlParams = () => {
      const searchParams = getParamsFromUrl();
      url = `${baseUrl}${searchParams}`;
      saveSearchParamsRedux(searchParams.slice(1));
      isReload = true;
    };

    changeUrlOnReloadWithUrlParams();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isReload) {
          return;
        }
        setIsLoading(true);
        const response = await axios.get(url);

        if (response.status === 200) {
          const data = response.data;

          setDataPizza(data.data);
          dispatch(setTotalPages(data.totalPages));
          navigate(parsedUrlParams, { replace: true });
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
        currentPage={currentPage}
        pageCount={totalPages}
        onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
      />
    </>
  );
}

export default PizzaList;
