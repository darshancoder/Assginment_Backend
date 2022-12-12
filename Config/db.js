require("dotenv").config();

const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(process.env.mongoDB_URL);
};

module.exports = { connect };
