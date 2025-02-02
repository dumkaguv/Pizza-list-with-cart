import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setTotalPages, setCurrentPage } from "@/redux/slices/paginationSlice";
import { fetchData } from "@/redux/slices/pizzaSlice";
import {
  getConcatedQueryParams,
  getParamsFromUrl,
  saveSearchParamsRedux,
} from "@/helpers/UrlSearchParams";
import sortOptionsMap from "@/constants/getSortOptionsMap";

import PizzaBlock from "./PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import Pagination from "@/components/Pagination";

const BASE_URL = "http://localhost:3000/api/pizzas";

function PizzaList() {
  const [requestUrl, setRequestUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: pizzas, totalPages: totalPagesPagination } = useSelector(
    (state) => state.pizza.data
  );

  const status = useSelector((state) => state.pizza.status);
  const searchValue = useSelector((state) => state.search.searchValue);
  const { categoryId, sortId } = useSelector((state) => state.filter);
  const { currentPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    const urlParams = getParamsFromUrl();
    const newUrl = `${BASE_URL}${urlParams}`;

    setRequestUrl(newUrl);
    if (urlParams) {
      saveSearchParamsRedux(urlParams.slice(1));
    }
  }, []);

  useEffect(() => {
    const params = {
      categoryId,
      sortId: sortOptionsMap[sortId],
      currentPage,
      searchValue,
    };

    const newUrl = `${BASE_URL}${getConcatedQueryParams(params)}`;
    setRequestUrl(newUrl);
  }, [categoryId, sortId, searchValue, currentPage]);

  useEffect(() => {
    if (!requestUrl) return;

    dispatch(fetchData(requestUrl));
    dispatch(setTotalPages(totalPagesPagination));

    navigate(requestUrl.replace(BASE_URL, ""), { replace: true });

    if (categoryId) {
      dispatch(setCurrentPage(1));
    }

    window.scrollTo(0, 0);
  }, [requestUrl]);

  return (
    <>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza, index) => (
              <PizzaBlock key={`${pizza.title}-${index}`} {...pizza} />
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={totalPagesPagination || 1}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </>
  );
}

export default PizzaList;
