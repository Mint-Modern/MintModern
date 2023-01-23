const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
    createCustomer,
    getCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByUsername,
    updateCustomer,
    deleteCustomer,
    getAllProducts,
} = require("../db");
const bcrypt = require("bcrypt");
const { requireCustomer } = require("./utils"); 

//POST /api/customers/register
router.post("/register", async (req,res, next) => {
    const { name, password, phoneNumber, email, isAdmin } = req.body;

    try {
        const _customer = await getCustomerByUsername(username);
        if (_customer) {
            next({
                name: "UserExistsError",
                message: `User ${_customer.username} is already taken.`,
            });
        }
        
        if (password.length < 8) {
            next({
                name: "PasswordLengthError",
                message: "Password Too Short!",
            })
        }
        
        if (!phoneNumber && !email) {
            next({
                name: "RequireFieldsError",
                message: "Require Email and Phone Number",
            })
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
    } catch(error) {
        next(error);
    }
})
//POST /api/customers/login
router.post("/login", async(req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        })
    }

    try {
        const customer = await getCustomerByUsername(username);
        const hashedPassword = customer.password;
        const match = await bcrypt.compare(password, hashedPassword);
        if (customer && match) {
            delete customer.password;
            const token = jwt.sign(
                {
                    id: customer.id, name: customer.name
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
})
//GET /api/customers/me
router.get("/me", requireCustomer, async (req,res, next) => {
    try{
        res.send(req.user);
    } catch (error) {
        next(error);
    }
});
//GET /api/customers/:name/products
// router.get("/:name/products", async (res, req, next) => {
//     try {
//         const { name } = req.params;
//         // console.log("me: ", me);
//         const products = await getAllProducts;
//     } catch (error) {
//         next(error)
//     }
// })

//PATCH /api/customer/:customerId
router.patch("./:customerId", requireCustomer, async (req, res, next) => {
    const { customerId } = req.params;
    const { name, password, phoneNumber, email } = req.body;
    const fields = {};
  
    fields.name = name;
    fields.password = password;
    fields.phoneNumber = phoneNumber;
    fields.email = email;
  
    const customer = await getCustomerById(customerId);
    if (!customer) {
      next({
        error: "CustomerDoesNotExist",
        message: `Customer ${customerId} not found`,
        name: `${customerId}`,
      });
    }
  
    const checkCustomerName = await getCustomerByUsername(username);
    if (checkCustomerName) {
      next({
        error: "Error",
        message: `A customer with name ${username} already exists`,
        name: `${checkCustomerName}`,
      });
    }
  
    try {
      const update = await updateCustomer({ id: customerId, ...fields });
      res.send(update);
    } catch (error) {
      next(error);
    }
  }); 

//DELETE /api/customers/:customerId
router.delete("./:customerId", requireCustomer, async (req, res, next) => {
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