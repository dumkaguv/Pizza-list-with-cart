import express from "express";
import cors from "cors";
import data from "./data/dataPizza.json" with { type: "json" };

const app = express();
app.use(
  cors({
    origin: [
      "https://pizza-list-with-cart-api.vercel.app",
      "https://pizza-list-with-cart.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// ==================== API ====================
app.get("/api/pizzas", async (req, res) => {
  try {
    let _data = [...data]; // Создаем копию данных

    // ======== Фильтрация ========
    const { categoryId, searchValue, sortId, order, currentPage = 1, limit = 8 } = req.query;

    if (categoryId) {
      _data = _data.filter((item) => item.category == categoryId);
    }

    // ======== Поиск ========
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      _data = _data.filter((item) => item.title.toLowerCase().includes(searchLower));
    }

    // ======== Сортировка ========
    if (sortId) {
      _data.sort((a, b) => {
        if (sortId === "prices") {
          const priceA = parseInt(Object.values(a.prices)[0].replace(/\D/g, ""));
          const priceB = parseInt(Object.values(b.prices)[0].replace(/\D/g, ""));
          return (priceA - priceB) * (order === "desc" ? -1 : 1);
        }
        return (a[sortId] > b[sortId] ? 1 : -1) * (order === "desc" ? -1 : 1);
      });
    }

    // ======== Пагинация ========
    const totalItems = _data.length;
    const pageNumber = parseInt(currentPage);
    const itemsPerPage = parseInt(limit);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    res.json({
      items: _data.slice(startIndex, endIndex),
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage: pageNumber,
      itemsPerPage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обработке данных" });
  }
});

app.get("/api/pizzas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pizza = data.find((item) => item.id === parseInt(id));

    if (!pizza) {
      return res.status(404).json({ error: "Пицца не найдена" });
    }

    res.json(pizza);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обработке данных" });
  }
});

// ==================== ЗАПУСК СЕРВЕРА ====================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
