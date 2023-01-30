const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByUsername,
  updateCustomer,
  deleteCustomer,
} = require("../db");
const bcrypt = require("bcrypt");
const { requireCustomer } = require("./utils");

//GET /api/customers
router.get("/", async (req, res, next) => {
  try {
    const customers = await getAllCustomers();
    res.send(customers);
  } catch (error) {
    next(error);
  }
});

//POST /api/customers/register
router.post("/register", async (req, res, next) => {
  const { name, password, phoneNumber, email, isAdmin } = req.body;

  try {
    const _customer = await getCustomerByUsername(name);
    if (_customer) {
      next({
        name: "UserExistsError",
        message: `User ${_customer.name} is already taken.`,
      });
    }

    if (password.length < 8) {
      next({
        name: "PasswordLengthError",
        message: "Password Too Short!",
      });
    }

    if (!phoneNumber && !email) {
      next({
        name: "RequireFieldsError",
        message: "Require Email and Phone Number",
      });
    }

    const customer = await createCustomer({
      name,
      password,
      phoneNumber,
      email,
    });

    const token = jwt.sign(
      {
        id: customer.id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.send({
      customer,
      message: "you're signed up!",
      token,
    });
  } catch (error) {
    next(error);
  }
});
//POST /api/customers/login
router.post("/login", async (req, res, next) => {
  const { name, password } = req.body;
  console.log(name, password);
  if (!name || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const customer = await getCustomerByUsername(name);
    const hashedPassword = customer.password;
    const match = await bcrypt.compare(password, hashedPassword);
    if (customer && match) {
      delete customer.password;
      const token = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
        },
        process.env.JWT_SECRET
      );

      res.send({
        customer: customer,
        message: "you're logged in!",
        token: token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});
//GET /api/customers/me
router.get("/me", requireCustomer, async (req, res, next) => {
  try {
    res.send(req.customer);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/customer/:customerId
router.patch("/:customerId", requireCustomer, async (req, res, next) => {
  const { customerId } = req.params;
  const { name, password, phoneNumber, email } = req.body;
  const fields = {};

  if (req.body.name) {
    fields.name = name;
  }
  if (req.body.password) {
    fields.password = password;
  }
  if (req.body.phoneNumber) {
    fields.phoneNumber = phoneNumber;
  }
  if (req.body.email) {
    fields.email = email;
  }

  const customer = await getCustomerById(customerId);
  if (!customer) {
    next({
      error: "CustomerDoesNotExist",
      message: `Customer ${customerId} not found`,
      name: `${customerId}`,
    });
  }
  console.log("this is after checkcCustomerId");
  const checkCustomerName = await getCustomerByUsername(name);
  if (checkCustomerName) {
    next({
      error: "Error",
      message: `A customer with name ${name} already exists`,
      name: `${checkCustomerName}`,
    });
  }
  console.log("this is after checkcCustomerUsername");

  try {
    const update = await updateCustomer({ id: customerId, ...fields });
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/customers/:customerId
router.delete("/:customerId", requireCustomer, async (req, res, next) => {
  const { customerId } = req.params;

  const customer = await getCustomerById(customerId);
  if (!customer) {
    next({
      error: "CustomerDoesNotExist",
      message: `Customer ${customerId} not found`,
      name: `${customerId}`,
    });
  }

  try {
    const customerToDelete = await deleteCustomer(customerId);
    res.send(customerToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
