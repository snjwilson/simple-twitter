const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const connect = require("./db/connect");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const passportConfig = require("./config/passport");

dotenv.config({ path: "./secret.env" });
const PORT = process.env.PORT || 5000;

const app = express();
// allow cross origin resource sharing
app.use(cors());
// Recognize incoming request as JSON object
app.use(express.json());

// middleware for passport
app.use(passport.initialize());
passportConfig(passport);

// connect to routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  // connect to DB
  connect();
  console.log(`Server is running on port ${PORT}`);
});
