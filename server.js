const express = require("express");
const { connectToMongoDB } = require("./database/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

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
app.use("/courses/images/", express.static("icons"));

app.use("/courses/images/:image", (req, res, next) => {
  const img = `./icons/${req.params.image}`;

  try {
    // Check if the image exists
    fs.access(img, fs.constants.F_OK);
    res.send(`${img} found!`);
  } catch {
    // If image doesn't exist, send 404 status and error message
    res.status(404).send(`${img} not found!`);
  }
});

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

// getting a specific course based on search query
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    // Connecting to DB
    const db = await connectToMongoDB();

    const filteredCourses = await db
      .collection("courses")
      .find({
        $or: [
          { subject: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { price: query },
          { spaces: query },
        ],
      })
      .toArray();

    res.json(filteredCourses);
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
    const result = await db.collection("order").insertOne(newOrder);

    if (!result) return res.status(400).json({ message: "Order not created" });

    res.status(200).json({ message: `Order successfully submitted` });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    // Connecting to DB
    const db = await connectToMongoDB();

    // Getting course id from url
    const id = req.params.id;

    // Update course attribute with the request body value
    const result = await db
      .collection("courses")
      .updateOne({ _id: id }, { $set: req.body }, { returnOriginal: false });

    // Returning error message when
    if (!result) return res.status(404).json({ message: "Course not found" });

    // Retuning the updated course
    res
      .status(200)
      .json({ message: `Successfully updated the course attribute` });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
