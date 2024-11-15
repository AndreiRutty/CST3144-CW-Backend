const { MongoClient } = require("mongodb");
const courses = require("./courses.js");

const url = "mongodb://localhost:27017/"; // connection string

const dbName = "eduexplorerDB"; // database name

createDatabase = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    console.log(`Connection to ${dbName} established`);

    // Creating course collection and inserting the courses data in it
    const coursesCollection = db.collection("courses");
    await coursesCollection.insertMany(courses);

    // Creating order collection
    const orderCollection = db.collection("order");

  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
};

createDatabase()