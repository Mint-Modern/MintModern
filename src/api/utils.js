function requireCustomer(req, res, next) {
  if (!req.customer) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

// need a requireAdmin func here
function requireAdmin(req, res, next) {
  if (req.customer.isAdmin != true) {
    res.status(401);
    next({
      error: "NotAdminError",
      message: "You would need admin to access this info",
      name: "Not An Admin",
    });
  }
  next();
}

module.exports = {
  requireCustomer,
  requireAdmin,
};
