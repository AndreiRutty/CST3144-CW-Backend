const express = require("express");
const { connectToMongoDB } = require("./database/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Logger Middleware
const logger = (req, res, next) => {
  const currentTime = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, currentTime);
  next();
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Static File Middleware
app.use(express.static("icons"));

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
    const updatedField = await db.collection("order").insertOne(newOrder);

    res.json(updatedField.value);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    // Connecting to DB
    const db = await connectToMongoDB();

    const id = req.params.id;

    const result = await db
      .collection("courses")
      .updateOne(
        { _id: id },
        { $set: req.body }
      );
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
