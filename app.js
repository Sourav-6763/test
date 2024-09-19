const express = require("express");
const mongoose = require("mongoose");
const auth = require("./router/auth");
const list = require("./router/list");
const cors = require("cors");
require("dotenv").config

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config()

const port = process.env.PORT || 8080;
// const port = 1000;

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));


// Routes
app.use("/auth", auth);
app.use("/list", list);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
