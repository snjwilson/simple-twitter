const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  email: String,
  password: String,
  follows: [Schema.Types.ObjectId],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
