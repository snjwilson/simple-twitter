const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  message: String,
  ownerId: Schema.Types.ObjectId,
  owner: Object,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
