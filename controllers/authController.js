const bcrypt = require("bcrypt");
const User = require("../models/User");
const { baseHtml, closeHtml, getNavBar } = require("../helpers/htmlHelpers");

// GET /login
const showLogin = (req, res) => {
  const html =
    baseHtml +
    getNavBar() +
    `<div class="auth-form">
      <h1>Iniciar Sesión</h1>
      <form action="/login" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>

        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" required>

        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
    </div>` +
    closeHtml;
  res.send(html);
};

// GET /register
const showRegister = (req, res) => {
  const html =
    baseHtml +
    getNavBar() +
    `<div class="auth-form">
      <h1>Registro</h1>
      <form action="/register" method="POST">
        <label for="username">Nombre de usuario</label>
        <input type="text" name="username" id="username" required>

        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>

        <label for="password">Contraseña</label>
        <input type="password" name="password" id="password" required>

        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
    </div>` +
    closeHtml;
  res.send(html);
};

// POST /register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
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
    req.session.user = { id: user._id, username: user.username, email: user.email };
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
