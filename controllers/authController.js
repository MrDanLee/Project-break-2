const { baseHtml, closeHtml } = require("../helpers/htmlHelpers");

// GET /login
const showLogin = (req, res) => {
  const error = req.query.error;
  const html =
    baseHtml +
    `<div class="auth-page">
      <h1>Login</h1>
      <div class="form-card">
        ${error ? `<p class="error-msg">${error}</p>` : ''}
        <form action="/login" method="POST">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" required>

          <label for="password">Contraseña:</label>
          <input type="password" name="password" id="password" required>

          <button class="btn" type="submit">Login</button>
        </form>
        <a class="btn" href="/products">Atrás</a>
      </div>
    </div>` +
    closeHtml;
  res.send(html);
};

// POST /login
const login = (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    req.session.user = { email };
    return res.redirect("/dashboard");
  }

  res.redirect("/login?error=Credenciales incorrectas, no tienes acceso");
};

// GET /logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = { showLogin, login, logout };
