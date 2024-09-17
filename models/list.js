const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//!    schema creation or coloum
const listSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user:[{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  createdAt: { type: Date, default: Date.now }
  });




const List = mongoose.model("List", listSchema);
 
module.exports = List;
