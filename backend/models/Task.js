const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  taskStatus:{
    type :String,
    default:"todo",
    enum:[ "todo" ,"in progress","completed"]
  },
  deadline: {
    type: Date,
    required: false,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Task", TaskSchema);


