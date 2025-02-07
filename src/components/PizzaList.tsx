import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { setTotalPages, setCurrentPage } from "@/redux/slices/paginationSlice";
import { fetchData } from "@/redux/slices/pizzaSlice";
import {
  getConcatedQueryParams,
  getParamsFromUrl,
  saveSearchParamsRedux,
} from "@/helpers/UrlSearchParams";
import sortOptionsMap from "@/constants/sortOptionsMap";
import STATUSES from "@/constants/fetchStatuses";

import PizzaBlock from "./PizzaBlock";
import Skeleton from "./PizzaBlock/Skeleton";
import Pagination from "@/components/Pagination";

import { RootState } from "@/redux/store";

const BASE_URL = "http://localhost:3000/api/pizzas";

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  size: number[];
  price: Record<string, string>;
  category: number;
  rating: number;
  ingredients: string[];
};

function PizzaList() {
  const [requestUrl, setRequestUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: pizzas, totalPages: totalPagesPagination } = useSelector(
    (state: RootState) => state.pizza.data
  );

  const pizzasList = useMemo(
    () =>
      (pizzas || []).map((pizza, index) => (
        <PizzaBlock key={`${pizza.title}-${index}`} {...pizza} />
      )),
    [pizzas]
  );
  const skeleton = useMemo(
    () => [...Array(6)].map((_, index) => <Skeleton key={index} />),
    []
  );

  const status = useSelector((state: RootState) => state.pizza.status);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const { categoryId, sortId } = useSelector((state: RootState) => state.filter);
  const { currentPage } = useSelector((state: RootState) => state.pagination);

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
        {status === STATUSES.error && (
          <div className="content__error-info">
            <h3>Пиццы не найдены 😕</h3>
            <p>
              К сожалению, произошла ошибка. Попробуйте повторить запрос позже.
            </p>
          </div>
        )}
        {status === STATUSES.loading ? skeleton : pizzasList}
        {status === STATUSES.success && pizzasList.length === 0 && searchValue && (
          <div className="content__error-info">
            <h3>Пиццы не найдены 😕</h3>
            <p>Попробуйте изменить параметры поиска.</p>
          </div>
        )}
      </div>
      {status === STATUSES.success && pizzasList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          pageCount={totalPagesPagination}
          onPageChange={(page: number) => dispatch(setCurrentPage(page))}
        />
      )}
    </>
  );
}

export default PizzaList;
