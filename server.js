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
    const {
      categoryId,
      searchValue,
      sortId,
      order,
      currentPage = 1,
      limit = 8,
    } = req.query;

    if (categoryId) {
      data = data.filter((item) => item.category === parseInt(categoryId));
    }

    // ======== Поиск ========
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      data = data.filter((item) => item.title.toLowerCase().includes(searchLower));
    }

    // ======== Сортировка ========
    if (sortId) {
      data.sort((a, b) => {
        if (sortId === "prices") {
          const priceA = parseInt(Object.values(a.prices)[0].replace(/\D/g, ""));
          const priceB = parseInt(Object.values(b.prices)[0].replace(/\D/g, ""));

          return (priceA - priceB) * (order === "desc" ? -1 : 1);
        }

        if (a[sortId] < b[sortId]) return order === "desc" ? 1 : -1;
        if (a[sortId] > b[sortId]) return order === "desc" ? -1 : 1;
        return 0;
      });
    }

    // ======== Пагинация ========
    const totalItems = data.length;
    const pageNumber = parseInt(currentPage);
    const itemsPerPage = parseInt(limit);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    res.json({
      items: paginatedData,
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
    const data = await readData();

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
