require("dotenv").config();
const dbConnection = require("./config/db");
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const apiProductRoutes = require("./routes/apiProductRoutes");

app.use(cors({ origin: true, credentials: true }));
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

// API Auth endpoints
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    req.session.user = { email };
    return res.json({ message: "Login correcto", user: { email } });
  }
  res.status(401).json({ error: "Credenciales incorrectas" });
});

app.get("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Sesión cerrada" });
  });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

module.exports = app;
