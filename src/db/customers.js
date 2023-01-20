const client = require("./client");
const bcrypt = require("bcrypt");

/* 

Tri Approved

createCustomer **
getCustomer **
getAllCustomers (ifAdmin)
getCustomerById **
getCustomerByUsername **
updateCustomer
deleteCustomer

*/

async function createCustomer({ name, password, email, phoneNumber, isAdmin }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [customer],
    } = await client.query(
      `
    INSERT INTO customers(name, password, email, phoneNumber, isAdmin)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `,
      [name, hashedPassword, email, phoneNumber, isAdmin]
    );
    delete customer.password;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCustomer({ name, password }) {
  try {
    const customer = await getCustomerByUsername(name);
    const hashedPassword = customer.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (customer && isValid) {
      delete customer.password;
      return customer;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllCustomers() {}

async function getCustomerById(customerId) {
  try {
    const {
      rows: [customer],
    } = await client.query(`
        SELECT * FROM customers
        WHERE id = ${customerId}
        `);
    delete customer.password;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCustomerByUsername(username) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
        SELECT *
        FROM USERS
        WHERE username = $1
        `,
      [username]
    );
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCustomer() {}

async function deleteCustomer() {}

module.exports = {
  getCustomer,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByUsername,
  updateCustomer,
  deleteCustomer,
};
