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

module.exports = {
  requireCustomer,
};
