require("dotenv").config();
const dbConnection = require("./config/db")
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", authRoutes);
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
