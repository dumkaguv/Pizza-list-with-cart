import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { RootState } from "@/redux/store";
import { setSortId } from "@/redux/slices/filterSlice";
import { sortOptions } from "@/constants/sortOptionsMap";

function Sort() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const sortOptionIndex = useSelector((state: RootState) => state.filter.sortId);

  function onClickOutside(event: MouseEvent) {
    const isClickOutside = !(event.target as Element).closest(".sort");

    if (isClickOutside) {
      setIsPopupOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <div className="sort">
      <div
        className="sort__label"
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setIsPopupOpen(!isPopupOpen);
          }
        }}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span tabIndex={0}>{sortOptions[sortOptionIndex]}</span>
      </div>
      {isPopupOpen && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((item, index) => (
              <li
                onClick={() => {
                  dispatch(setSortId(index));
                  setIsPopupOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    dispatch(setSortId(index));
                    setIsPopupOpen(false);
                  }
                }}
                className={index === sortOptionIndex ? "active" : ""}
                key={index}
                tabIndex={0}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
