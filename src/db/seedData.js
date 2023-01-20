const client = require("./client");

//drops all tables (if they exist)
const dropTables = async () => {
  try {
    console.log("Dropping tables");

    await client.query(`
        DROP TABLE IF EXISTS orderProducts;
        DROP TABLE IF EXISTS customerReviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS customers;
        DROP TABLE IF EXISTS products;
        `);

    console.log("Tables dropped");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("Building Tables");

    await client.query(`
        CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "phoneNumber" VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
        );

        CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        category INTEGER,
        price DECIMAL
        );

        CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        rating INTEGER
        );

        CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES customers(id),
        total DECIMAL,
        "salesTax" DECIMAL,
        "isActive" BOOLEAN DEFAULT true
        );

        CREATE TABLE orderProducts (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER,
        UNIQUE ("orderId", "productId")
        );

        CREATE TABLE customerReviews (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES customers(id) NOT NULL,
        "reviewId" INTEGER REFERENCES reviews(id) NOT NULL
        );

        `);

    console.log("Tables built");
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
};

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
