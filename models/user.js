const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//!    schema creation or coloum
const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String},
  password:{ type: String, required: true },
list:[{
  type: Schema.Types.ObjectId,
  ref: "List",
}]
});



const User = mongoose.model("User", userSchema);
 
module.exports = User;
