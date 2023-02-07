const client = require("../client");
const { createCustomer } = require("./customers");
const { createOrder } = require("./orders");
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
        category VARCHAR(255),
        price DECIMAL,
        image TEXT NOT NULL,
        quantity INTEGER DEFAULT 1
        );

        CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(255),
        rating INTEGER,
        "userId" INTEGER REFERENCES customers(id)
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
        name: "Demo",
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
        name: "Tofu Rolls",
        description: "2 pieces, served with Peanut Sauce",
        category: "teasers",
        price: 4.0,
        image: `https://i.ibb.co/sJszfdz/tofu-rolls-600sq.jpg`,
      },
      {
        name: "Shrimp & Pork Rolls",
        description: "2 pieces, served with Peanut Sauce",
        category: "teasers",
        price: 4.5,
        image: `https://i.ibb.co/PrF1Dv9/shrimppork-rolls-600sq.jpg"`,
      },
      {
        name: "Avocado Rolls",
        description: "2 pieces, served with Peanut Sauce",
        category: "teasers",
        price: 4.0,
        image: `https://i.ibb.co/g6nRL71/avocado-rolls-600sq.jpg`,
      },
      {
        name: "Avocado & Shrimp Rolls",
        description: "2 pieces, served with Peanut Sauce",
        category: "teasers",
        price: 4.5,
        image: `https://i.ibb.co/pXQ3TxB/shrimpavo-rolls-600sq.jpg`,
      },
      {
        name: "Grilled Pork Rolls",
        description: "2 pieces, served with House Fish Sauce",
        category: "teasers",
        price: 4.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled Beef Rolls",
        description: "2 pieces, served with House Fish Sauce",
        category: "teasers",
        price: 5.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Mint Special Rolls",
        description:
          "2 pieces, *Our Eggroll Stuffing Roll*, served with House Fish Sauce",
        category: "teasers",
        price: 4.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled Mushroom Rolls",
        description: "2 pieces, served with Peanut Sauce",
        category: "teasers",
        price: 4.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "White Chicken Rolls",
        description: "2 pieces, served with Peanut Sauce",
        category: "teasers",
        price: 4.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Fried Egg Rolls",
        description: "4 pieces, served with Sweet Chilli Sauce",
        category: "teasers",
        price: 5.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pork Belly Steamed Buns",
        description: "2 pieces, served with Honey Sriracha Glaze",
        category: "teasers",
        price: 5.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Vietnamese Pork Steamed Buns",
        description: "2 pieces, served with Spicy Cream",
        category: "teasers",
        price: 5.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled Shrimp Steamed Buns",
        description: "2 pieces, served with Spicy Mayo",
        category: "teasers",
        price: 6.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Tofu Steamed Buns",
        description: "2 pieces, served with Spicy Mayo",
        category: "teasers",
        price: 5.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Bacon & Crab Rangoons",
        description: "4 pieces, served with Sweet Chilli Sauce",
        category: "teasers",
        price: 5.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Sticky Chicken Wings",
        description: "4 Winglets, served with Spicy Cream and Sweet Soy Glaze",
        category: "teasers",
        price: 6.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Sweet Fried Shrimp",
        description:
          "4 Shrimp with Tail, served with Sweet Chilli and Spicy Mayo",
        category: "teasers",
        price: 6.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Beef Stew",
        description: "served with Dong Phuong Bread, *Entree Size*",
        category: "teasers",
        price: 8.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Chicken Curry",
        description: "served with Dong Phuong Bread, *Entree Size*",
        category: "teasers",
        price: 8.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pho Tofu & Mushroom",
        description: "served with Veggie Broth",
        category: "pho",
        price: 9.0,
        image: `https://i.ibb.co/YD06QWV/tofumushroom-pho-600sq.jpg`,
      },
      {
        name: "Pho Veggie",
        description: "served with Veggie Broth",
        category: "pho",
        price: 9.0,
        image: `https://i.ibb.co/mHsP0ZP/veggie-pho-600sq.jpg`,
      },
      {
        name: "Pho Chicken",
        description: "served with Chicken Broth",
        category: "pho",
        price: 9.5,
        image: `https://i.ibb.co/Yty7801/chicken-pho-600sq.jpg`,
      },
      {
        name: "Pho Shrimp",
        description: "served with Chicken Broth",
        category: "pho",
        price: 10.0,
        image: `https://i.ibb.co/xDvcTXj/shrimp-pho-600sq.jpg`,
      },
      {
        name: "Pho Meatball",
        description: "served with Beef Broth",
        category: "pho",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pho Brisket",
        description: "served with Beef Broth",
        category: "pho",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pho New York Strip",
        description: "served with Beef Broth",
        category: "pho",
        price: 10.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pho New York Strip & Meatball",
        description: "served with Beef Broth",
        category: "pho",
        price: 11.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pho Mint Combo",
        description:
          "served with Beef Broth, contains Brisket, Meatball, & NYS",
        category: "pho",
        price: 11.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Wonton Soup",
        description: "served with Chicken Broth, contains BBQ Pork",
        category: "pho",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Spicy Beef",
        description:
          "also known as 'Bun Bo Hue', served with Spicy Lemongrass Beef Broth, contains Brisket, Tofu, and Thick vermicelli",
        category: "pho",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Sate Beef Stew",
        description:
          "served with Beef Stew Broth *Richer Broth*, contains Beef Chunks, Carrots, and Pho Noodles",
        category: "pho",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Fried Tofu",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 5.5,
        image: `https://i.ibb.co/fnSGPHm/tofu-baguette-600sq.jpg`,
      },
      {
        name: "Grilled Pork",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 6.0,
        image: `https://i.ibb.co/Ms5m16s/grilledpork-baguette-600sq.jpg`,
      },
      {
        name: "Grilled Beef",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 7.0,
        image: `https://i.ibb.co/4f5bZJN/grilledbeef-baguette-600sq.jpg`,
      },
      {
        name: "French Fries & Mushrooms",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 6.0,
        image: `https://i.ibb.co/pw8HFsm/mushroom-baguette-600sq.jpg`,
      },
      {
        name: "Lemongrass Chicken",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 6.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Vietnamese Meatball & BBQ Pork",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber, contains Tomato Sauce with Meatball",
        category: "baguette",
        price: 6.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Meat Lover",
        description:
          "Served with Homemade Butter, Homemade Pate, Pickled Carrots, Cilantro, and Cucumber, contains Tomato Sauce with Meatball, BBQ Pork, and Vietnamese Ham",
        category: "baguette",
        price: 7.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Fried Pork Belly",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 7.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled or Fried Shrimp",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 8.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Fried Soft Shell Crab",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 8.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "BBQ Short Ribs",
        description:
          "Served with Homemade Butter, Pickled Carrots, Cilantro, and Cucumber",
        category: "baguette",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Sizzling Beef Steak and Eggs",
        description:
          "also known as 'Bo Ne', served with Dong Phuong Bread, Butter, and Pate",
        category: "houseSpecials",
        price: 12.0,
        image: `https://i.ibb.co/Gc9R5Qk/steakeggs-special-600sq.jpg`,
      },
      {
        name: "Fried Chicken & Pandan Waffle",
        description:
          "4 pieces of Winglets, Pandan is Green Leaf Extract and contains Coconut, served with Homemade Strawberry Jam and Homemade Caramel, Pandan is also known as ",
        category: "houseSpecials",
        price: 10.0,
        image: `https://i.ibb.co/J7cKTJ8/chickpandan-special-600sq.jpg`,
      },
      {
        name: "Kimchi Burger",
        description:
          "served with Sweet Potato Fries, dressed with Kimchi, Spicy Mayo, & Brioche Buns",
        category: "houseSpecials",
        price: 10.0,
        image: `https://i.ibb.co/wQCvTLf/kimchiburger-special-600sq.jpg`,
      },
      {
        name: "Vietnamese Banh Mi Burger",
        description:
          "served with Seasoned Fries, dressed with Homemade Pate, Homemade Butter, Pickled Carrots, Cilantro, Cucumber, & Brioche Buns",
        category: "houseSpecials",
        price: 10.0,
        image: `https://i.ibb.co/0CbPpVv/banhmiburger-special-600sq.jpg`,
      },
      {
        name: "Mint Moon Crepe",
        description:
          "also known as 'Banh Xeo', served with House Garlic Fish Sauce, Lettuce, Carrots, stuffed with Bean Sprouts, Pork, & Shrimp",
        category: "houseSpecials",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Seasoned Noodle & Chicken",
        description:
          "also known as 'Pho Ga Kho', served with side of Chicken Broth and our House Seasoned Noodle Sauce",
        category: "houseSpecials",
        price: 10.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },

      {
        name: "Sate' Veggies",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber, contains Broccoli & Carrots",
        category: "rice",
        price: 8,
        image: `https://i.ibb.co/0jVmfNx/veggie-rice-600sq.jpg`,
      },
      {
        name: "Lemongrass Tofu",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 8,
        image: `https://i.ibb.co/xsBNYrc/tofu-rice-600sq.jpg`,
      },
      {
        name: "Tofu & Tomato",
        description:
          "served with White Rice, House Tomato Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 8,
        image: `https://i.ibb.co/Vt6BXb2/tofutom-rice-600sq.jpg`,
      },
      {
        name: "Grilled Pork",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 9.0,
        image: `https://i.ibb.co/5KgvCLH/pork-rice-600sq.jpg`,
      },
      {
        name: "Lemongrass Chicken",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Crispy Hen",
        description:
          "served with White Rice, House Fish Sauce, Homemade Honey Mustard, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Mushroom & Asparagus",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled Shrimp",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Shakin' New York Strip",
        description:
          "served with White Rice, House Fish Sauce, Homemade Honey Mustard, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 11.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Steak & Asparagus",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 10.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Steak & Sate Veggies",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber, contains Broccoli & Carrots",
        category: "rice",
        price: 10.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Fried Soft Shell Crab",
        description:
          "served with White Rice, House Tomato Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 12.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled Salmon",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 12.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "BBQ Short Ribs",
        description:
          "served with White Rice, House Fish Sauce, Pickled Cabbage & Carrots, Tomatoes, and Cucumber",
        category: "rice",
        price: 12.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Shrimp Fried Rice",
        description: "contains Shrimp, Eggs, & Onions",
        category: "rice",
        price: 8.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Deluxe Fried Rice",
        description: "contains Chinese Sausage, Shrimp, Eggs, & Onions",
        category: "rice",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Fried Tofu",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 7.5,
        image: `https://i.ibb.co/DVph2Wy/friedtofu-vermicelli-600sq.jpg`,
      },
      {
        name: "Lemongrass Tofu",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 8.0,
        image: `https://i.ibb.co/t8KXH5C/lemontofu-vermicelli-600sq.jpg`,
      },
      {
        name: "Egg Rolls",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 8.5,
        image: `https://i.ibb.co/ZdgfPCG/eggroll-vermicelli-600sq.jpg`,
      },
      {
        name: "Grilled Pork",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 9.0,
        image: `https://i.ibb.co/zr6HtDC/pork-vermicelli-600sq.jpg`,
      },
      {
        name: "Lemongrass Chicken",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Mushroom & Asparagus",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 9.0,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Grilled Shrimp",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Beef Sate",
        description:
          "served with Vermicelli Rice Noodles, House Fish Sauce, Lettuce, Carrots, and Cucumber",
        category: "vermicelli Bowl",
        price: 9.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Pandan Waffle with Vanilla Ice Cream",
        description:
          "served with Powdered Sugar, Pandan is Green Leaf Extract and contains Coconut",
        category: "desserts",
        price: 6,
        image: `https://i.ibb.co/NxwGVd4/pandanwaffle-desserts-600sq.jpg`,
      },
      {
        name: "Red Bean Ice Cream Sandwich",
        description: "served with Chinese Sugar Buns and Powdered Sugar",
        category: "desserts",
        price: 6,
        image: `https://i.ibb.co/q9b9LRN/icecreamsand-desserts-600sq.jpg`,
      },
      {
        name: "Molten Lava Cake",
        description: "no molten here just a basic brownie with Powdered Sugar",
        category: "desserts",
        price: 7,
        image: `https://i.ibb.co/dbQ1NRH/lavacake-desserts-600sq.jpg`,
      },
      {
        name: "Ice Cream",
        description:
          "Blue Bell Vanilla Ice Cream, Green Tea Ice Cream, Red Bean Ice Cream",
        category: "desserts",
        price: 3.5,
        image: `https://i.ibb.co/dDxKZ8L/bluebell-desserts-600sq.jpg`,
      },
      {
        name: "Tapioca Smoothies",
        description:
          "Avocado, Blueberry, Coconut, Green Apple, Honeydew, Mango, Match Green Tea, Pineapple, Raspberry, Strawberry, Taro",
        category: "smoothies",
        price: 5.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
      },
      {
        name: "Tapioca Milk Teas",
        description:
          "Green Milk Tea, Matcha Milk Tea, Taro Milk Tea, Thai Milk Tea",
        category: "milkTeas",
        price: 5.5,
        image: `https://i.imgur.com/ZZiMrz0.gif`,
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

async function createInitialOrders() {
  console.log("Starting to create orders...");
  try {
    const ordersToCreate = [
      {
        userId: 1,
        total: 0,
        salesTax: 0.0945,
        isActive: true,
      },
      {
        userId: 1,
        total: 0,
        salesTax: 0.0945,
        isActive: false,
      },
      {
        userId: 2,
        total: 0,
        salesTax: 0.0945,
        isActive: true,
      },
      {
        userId: 3,
        total: 0,
        salesTax: 0.0945,
        isActive: true,
      },
      {
        userId: 4,
        total: 0,
        salesTax: 0.0945,
        isActive: true,
      },
      {
        userId: 5,
        total: 0,
        salesTax: 0.0945,
        isActive: true,
      },
    ];
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log("Order created");
    console.log(orders);
    console.log("Finished creating orders");
  } catch (error) {
    console.error("Error creating orders");
    throw error;
  }
}

async function createInitialReviews() {
  console.log("Starting to create reviews...");
  try {
    const reviewsToCreate = [
      {
        name: "Spicy Beef Pho",
        description: "INCREDIBLE",
        rating: 10,
        userId: 1,
      },
      {
        name: "Kimchi Burger",
        description: "DELICIOUS",
        rating: 10,
        userId: 2,
      },
      {
        name: "Vietnamese Pork Tacos!",
        description: "HOLY MOLY",
        rating: 10,
        userId: 3,
      },
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
    await createInitialOrders();
    await createInitialReviews();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
