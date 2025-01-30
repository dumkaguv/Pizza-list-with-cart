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

const BASE_URL = "http://localhost:3000/api/pizzas";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestUrl, setRequestUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchValue = useSelector((state) => state.search.searchValue);
  const { categoryId, sortId } = useSelector((state) => state.filter);
  const { totalPages, currentPage } = useSelector((state) => state.pagination);

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

    const fetchPizzas = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(requestUrl);

        setPizzas(data.data);
        dispatch(setTotalPages(data.totalPages));

        navigate(requestUrl.replace(BASE_URL, ""), { replace: true });
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }

      if (categoryId) {
        dispatch(setCurrentPage(1));
      }

      window.scrollTo(0, 0);
    };

    fetchPizzas();
  }, [requestUrl]);

  return (
    <>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza, index) => (
              <PizzaBlock key={`${pizza.title}-${index}`} {...pizza} />
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </>
  );
}

export default PizzaList;
