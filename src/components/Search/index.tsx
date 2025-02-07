import { useRef, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import { setSearchValue } from "@/redux/slices/searchSlice";

import { RootState } from "@/redux/store";
import styles from "./Search.module.scss";

function Search() {
  const reduxSearchValue = useSelector((state: RootState) => state.search.searchValue);
  const [value, setValue] = useState(reduxSearchValue);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(reduxSearchValue);
  }, [reduxSearchValue]);

  const updateSearchValue = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 350),
    [dispatch]
  );

  useEffect(() => {
    return () => updateSearchValue.cancel();
  }, [updateSearchValue]);

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  function onButtonClearClick() {
    inputRef.current?.focus();
    setValue("");
    dispatch(setSearchValue(""));
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        fill="none"
        height="32"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={onChangeInput}
        type="search"
        placeholder="Поиск пиццы..."
      ></input>
      {value && (
        <svg
          className={styles.iconClose}
          onClick={onButtonClearClick}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onButtonClearClick();
            }
          }}
          fill="none"
          height="32"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
          tabIndex={0}
          role="button"
        >
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
}

export default Search;
