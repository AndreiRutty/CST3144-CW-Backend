const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/"; // connection string
const dbName = "eduexplorerDB"; // database name

let db;

connectToMongoDB = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    db = client.db(dbName);
    console.log(`Connection to ${db.databaseName} established`);
    return db;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = { connectToMongoDB };
