import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "@/redux/slices/filterSlice";
import categories from "@/constants/categories";

import { RootState } from "@/redux/store";

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);

  const onChangeCategoryClick = (index: number) => {
    dispatch(setCategoryId(index));
  };
  
  const onChangeCategoryKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      dispatch(setCategoryId(index));
    }
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onChangeCategoryClick(index)}
            onKeyDown={(event) => onChangeCategoryKeyDown(event, index)}
            className={categoryId === index ? "active" : ""}
            tabIndex={0}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
