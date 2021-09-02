const mongoose = require("mongoose");

async function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
  });

  const connection = await mongoose.connection;

  connection.once("open", () => {
    console.log("Connected to database successfully");
  });
}

module.exports = connect;
