const client = require("./client");
const { createCustomer } = require("./customers");
const { createProduct } = require("./products");
const { createReview } = require("./reviews");

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

async function createInitialCustomers() {
  console.log("Startin to create customers...");
  try {
    const customersToCreate = [
      {
        name: "Collin",
        password: "password",
        email: "weCodingNow0@gmail.com",
        phoneNumber: "(281) 330-8004",
        isAdmin: true,
      },
      {
        name: "Krystle",
        password: "password",
        email: "weCodingNow1@gmail.com",
        phoneNumber: "281-330-8004",
        isAdmin: true,
      },
      {
        name: "Maria",
        password: "password",
        email: "weCodingNow2@gmail.com",
        phoneNumber: "281 330-8004",
        isAdmin: true,
      },
      {
        name: "Chandler",
        password: "password",
        email: "weCodingNow3@gmail.com",
        phoneNumber: "281--330-8004",
        isAdmin: true,
      },
      {
        name: "mike jones",
        password: "password",
        email: "weCodingNow4@gmail.com",
        phoneNumber: "281--330--8004",
        isAdmin: false,
      },
    ];
    const customers = await Promise.all(customersToCreate.map(createCustomer));

    console.log("Customers created: ");
    console.log(customers);
    console.log("Finished creating customers");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...");
  try {
    const productsToCreate = [
      {
        name: "Avocado Rolls",
        description: "2 pieces",
        category: null,
        price: 4.0,
      },
      {
        name: "Shrimp & Pork Rolls",
        description: "2 pieces",
        category: null,
        price: 4.5,
      },
      {
        name: "Vietnamese Pork Tacos",
        description: "2 pieces",
        category: null,
        price: 5.0,
      },
      {
        name: "Spicy Beef Pho",
        description: "That gud gud",
        category: null,
        price: 9.0,
      },
      {
        name: "Kimchi Burger",
        description: "Served with sweet potato fries.",
        category: null,
        price: 10.0,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products created: ");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialReviews() {
  console.log("Starting to create reviews...");
  try {
    const reviewsToCreate = [
      { name: "Spicy Beef Pho", description: "INCREDIBLE", rating: 10 },
      { name: "Kimchi Burger", description: "DELICIOUS", rating: 10 },
      { name: "Vietnamese Pork Tacos!", description: "HOLY MOLY", rating: 10 },
    ];
    const reviews = await Promise.all(reviewsToCreate.map(createReview));
    console.log("Reviews created");
    console.log(reviews);
    console.log("Finished creating reviews");
  } catch (error) {
    console.error("Error creating reviews!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialCustomers();
    await createInitialProducts();
    await createInitialReviews();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
