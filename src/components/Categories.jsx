import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "@/redux/slices/filterSlice";
import categories from "@/constants/getCategories";

function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => dispatch(setCategoryId(index))}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onCategoryClick(index);
              }
            }}
            className={categoryId === index ? "active" : ""}
            tabIndex="0"
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
