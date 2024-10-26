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
    const db = await connectToMongoDB();
    const courses = await db.collection("courses").find({}).toArray();
    res.json(courses);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
