const bcrypt = require("bcrypt");
const User = require("../models/User");
const { baseHtml, closeHtml } = require("../helpers/htmlHelpers");

// GET /login
const showLogin = (req, res) => {
  const html =
    baseHtml +
    `<div class="auth-page">
      <h1>Login</h1>
      <div class="form-card">
        <form action="/login" method="POST">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" required>

          <label for="password">Contraseña:</label>
          <input type="password" name="password" id="password" required>

          <button class="btn" type="submit">Login</button>
        </form>
        <a class="btn" href="/register">Registrarse</a>
        <a class="btn" href="/products">Atrás</a>
      </div>
    </div>` +
    closeHtml;
  res.send(html);
};

// GET /register
const showRegister = (req, res) => {
  const html =
    baseHtml +
    `<div class="auth-page">
      <h1>Registrarse</h1>
      <div class="form-card">
        <form action="/register" method="POST">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" required>

          <label for="password">Contraseña:</label>
          <input type="password" name="password" id="password" required>

          <button class="btn" type="submit">Registrarse</button>
        </form>
        <a class="btn" href="/login">Login</a>
        <a class="btn" href="/products">Atrás</a>
      </div>
    </div>` +
    closeHtml;
  res.send(html);
};

// POST /register
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error al registrar el usuario");
  }
};

// POST /login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Credenciales incorrectas");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Credenciales incorrectas");
    }
    req.session.user = { id: user._id, email: user.email };
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Error al iniciar sesión");
  }
};

// GET /logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = { showLogin, showRegister, register, login, logout };
