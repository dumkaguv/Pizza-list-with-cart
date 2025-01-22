import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
app.use(cors());
const DATA_FILE = "./public/data/dataPizza.json";

const readData = async () => {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// ==================== API ====================
app.get("/api/pizzas", async (req, res) => {
  try {
    let data = await readData();

    // ======== Фильтрация ========
    const { category, search, sortBy, order, page = 1, limit = 8 } = req.query;

    if (category) {
      data = data.filter((item) => item.category === parseInt(category));
    }

    // ======== Поиск ========
    if (search) {
      const searchLower = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower)
      );
    }

    // ======== Сортировка ========
    if (sortBy) {
      data.sort((a, b) => {
        if (sortBy === "prices") {
          const priceA = parseInt(Object.values(a.prices)[0].replace(/\D/g, ""));
          const priceB = parseInt(Object.values(b.prices)[0].replace(/\D/g, ""));

          return (priceA - priceB) * (order === "desc" ? -1 : 1);
        }

        if (a[sortBy] < b[sortBy]) return order === "desc" ? 1 : -1;
        if (a[sortBy] > b[sortBy]) return order === "desc" ? -1 : 1;
        return 0;
      });
    }

    // ======== Пагинация ========
    const totalItems = data.length;
    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(limit);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    res.json({
      data: paginatedData,
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

// ==================== ЗАПУСК СЕРВЕРА ====================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
