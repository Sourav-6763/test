const express =require("express")
const app =express();
const mongoose = require("mongoose");
const auth =require("./router/auth")
const list =require("./router/list")
const cors =require("cors");
const path = require("path");


app.use(express.json());
app.use(cors());

const dbUrl ='mongodb+srv://srvsarkar2018:fJZwDiIIJkqpjGQm@cluster0.1n8al.mongodb.net/';
// const dbUrl ='mongodb://127.0.0.1:27017/TOodo';
async function main() {
  await mongoose.connect(dbUrl);

}
main()
  .then(() => {
    console.log(" connected to db");
  })
  .catch((err) => console.log(err));











app.use("/", auth);
app.use("/", list);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
  

app.listen(1000,()=>{
    console.log("server is start")
})