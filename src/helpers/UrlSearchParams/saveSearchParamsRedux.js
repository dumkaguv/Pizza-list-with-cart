import { store } from "@/redux/store";
import { setCurrentPage } from "@/redux/slices/paginationSlice";
import { setSearchValue } from "@/redux/slices/searchSlice";
import { setCategoryId, setSortId } from "@/redux/slices/filterSlice";
import { OptionToIndexMap } from "@/constants/getSortOptionsMap";
import getParamsFromUrl from "./getParamsFromUrl";

function saveSearchParamsRedux(queryString) {
  const urlParams = new URLSearchParams(queryString);

  urlParams.forEach((value, key) => {
    if (key === "currentPage") store.dispatch(setCurrentPage(parseInt(value)));
    if (key === "searchValue") store.dispatch(setSearchValue(value));
    if (key === "categoryId") store.dispatch(setCategoryId(parseInt(value)));
    if (key === "sortId") {
      const order = getParamsFromUrl().includes("asc") ? "asc" : "desc";
      const sortId = OptionToIndexMap[`${value}&order=${order}`];

      store.dispatch(setSortId(sortId));
    }
  });
}

export default saveSearchParamsRedux;
