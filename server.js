const express = require("express");
const { connectToMongoDB } = require("./database/db.js");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Getting all courses
app.get("/courses", async (req, res) => {
  try {
    // Connecting to DB
    const db = await connectToMongoDB();

    // Getting courses
    const courses = await db.collection("courses").find({}).toArray();

    // Sending courses in JSON to client
    res.json(courses);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.post("/order", async (req, res) => {
  try {
    // Connecting to DB
    const db = await connectToMongoDB();

    // Getting order attributes from the client request body
    const newOrder = req.body;

    // Insert order in order collection
    await db.collection("order").insertOne(newOrder);
    
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
