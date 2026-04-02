require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
// Middlewares para leer el body de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static("public"));

// Configuración de sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Rutas públicas (auth + productos)
app.use("/", authRoutes);
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
