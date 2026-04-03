const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login?error=No tienes acceso. Inicia sesión para continuar");
};

module.exports = authMiddleware;
