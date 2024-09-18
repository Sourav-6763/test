const express = require("express");
const mongoose = require("mongoose");
const auth = require("./router/auth");
const list = require("./router/list");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const dbUrl = 'mongodb+srv://srvsarkar2018:fJZwDiIIJkqpjGQm@cluster0.1n8al.mongodb.net/';
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// Serve static files
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

// Routes
app.use("/auth", auth);
app.use("/list", list);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
