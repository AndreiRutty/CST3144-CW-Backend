const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = "mongodb+srv://andreiruttyar20:andrei1234@cluster0.mdcf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;"
const dbName = "eduexplorerDB"; // database name


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
