function Categories({ onCategoryClick, isActive }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onCategoryClick(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onCategoryClick(index);
              }
            }}
            className={isActive === index ? "active" : ""}
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
