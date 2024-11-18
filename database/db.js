const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.DB_URL; // connection string
const dbName = process.env.DB_NAME; // database name


// Function to connect to mongoDB database
connectToMongoDB = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    let db = client.db(dbName);
    console.log(`Connection to ${db.databaseName} established`);
    return db;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = { connectToMongoDB };
