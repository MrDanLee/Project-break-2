require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/productRoutes");

// Middlewares para leer el body de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static("public"));

// Rutas
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
