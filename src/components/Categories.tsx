import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "@/redux/slices/filterSlice";
import categories from "@/constants/categories";

import { RootState } from "@/redux/store";

function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => dispatch(setCategoryId(index))}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                dispatch(setCategoryId(index));
              }
            }}
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
}

export default Categories;
