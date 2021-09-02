const express = require("express");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const router = express.Router();

/**
 * fetch posts
 */
router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    // find the followers of the user to fetch the posts
    const user = await User.findOne({
      _id: id,
    }).lean();
    // push self into follows array to see our own posts as well
    user.follows.push(user._id);
    // find the number of all posts for pagination
    const postsLength = await Post.find({
      ownerId: { $in: user.follows },
    }).countDocuments();
    console.log(`Total posts found for feed - ${postsLength}`);
    // fetch 10 posts at a time
    const posts = await Post.find({
      ownerId: { $in: user.follows },
    })
      .sort({ _id: -1 })
      .limit(10)
      .lean();
    res.status(200).send({
      status: true,
      posts,
      message: `Fetched posts succesfully`,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      message: `Failed to retrieve posts`,
    });
  }
});

/**
 * Create a new post
 */
router.post("/", async (req, res) => {
  try {
    const { message, owner, ownerId } = req.body;
    const newPost = new Post({
      message,
      ownerId,
      owner,
    });
    await newPost.save();
    res.status(200).send({
      status: true,
      message: "Saved post successfully",
      newPost,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      message: "Failed to save post",
    });
  }
});

module.exports = router;
