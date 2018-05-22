const isLoggedIn = (req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) next();
  else res.sendStatus(403);
};

const isAdminOrSelf = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.userId) next();
  else res.sendStatus(403);
};

module.exports = { isLoggedIn, isAdmin, isAdminOrSelf };
