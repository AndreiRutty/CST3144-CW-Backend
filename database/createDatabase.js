const { MongoClient } = require("mongodb");
const courses = require("./courses.js");

const url = "mongodb://localhost:27017"; // connection string

const dbName = "eduexplorerDB"; // database name

createDatabase = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    console.log(`Connection to ${dbName} established`);

    const coursesCollection = db.collection("courses");

    await coursesCollection.insertMany(courses);
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
};

createDatabase()