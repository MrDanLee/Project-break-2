require("dotenv").config();
const dbConnection = require("./config/db");
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const apiProductRoutes = require("./routes/apiProductRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Ruta raíz redirige a productos
app.get("/", (req, res) => res.redirect("/products"));

app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/api/products", apiProductRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
