const client = require("./client");
const bcrypt = require("bcrypt");

/* 

Tri Approved

createCustomer **
getCustomer **
getAllCustomers (ifAdmin) **
getCustomerById **
getCustomerByUsername **
updateCustomer **
deleteCustomer **

*/

async function createCustomer({ name, password, email, phoneNumber, isAdmin }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [customer],
    } = await client.query(
      `
    INSERT INTO customers(name, password, email, "phoneNumber", "isAdmin")
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

async function getAllCustomers(customerId) {
  const customer = await getCustomerById(customerId);
  if (customer.isAdmin === true) {
    try {
      const { rows: customers } = await client.query(`
            SELECT * FROM customers
            `);
      return customers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

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
        FROM customers
        WHERE name = $1
        `,
      [username]
    );
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCustomer({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      const {
        rows: [customer],
      } = await client.query(
        `
            UPDATE customers
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `,
        Object.values(fields)
      );
      return customer;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteCustomer(id) {
  try {
    const {
      rows: [customers],
    } = await client.query(
      `
              DELETE FROM customers
              WHERE id = ${id}
              RETURNING *;
              
            `
    );
    return customers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getCustomer,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByUsername,
  updateCustomer,
  deleteCustomer,
};
