const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    Title: { type: String},
    Note: { type: String },
    Tags: { type: String, index: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
