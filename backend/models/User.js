const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      min: 6,
    },
    resetPasswordCode: {
      type: String,
      default: "",
    },
    resetPasswordExpires: {
      type: Date,
      default: Date.now(),
    },
    tasks :[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
