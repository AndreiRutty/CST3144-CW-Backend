const { MongoClient } = require("mongodb");
const courses = require("./courses.js");
require("dotenv").config();

const url = "mongodb+srv://andreiruttyar20:andrei1234@cluster0.mdcf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbName = "eduexplorerDB";


// Function to create the database with its collection
createDatabase = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    console.log(`Connection to ${dbName} established`);

    // Creating course collection and inserting the courses data in it
    const coursesCollection = db.collection("courses");
    await coursesCollection.insertMany(courses);

    // Creating order collection with no fields
    const orderCollection = db.collection("order");
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
};

createDatabase();
