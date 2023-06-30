const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDataBase = async () => {
  try {
    const conection = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Mongoose connected Sucessfully");
  } catch (e) {
    console.log(e.message);
  }
};
