const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async (req, res) => {
  try {
    const { title, description, deadline,user } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({ message: "Please provide a task" });
    }
    
    const task = new Task({ title, description, deadline, user });
     await task.save();
    await User.findByIdAndUpdate(
      user,
      { $push: { tasks: task._id } },
      { new: true }
    );
    res.status(201).json(task);
  }  catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
      const tasks = await Task.find({}).populate('user','username');
      console.log(tasks)
      res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, deadline, completed, taskStatus } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, completed, taskStatus },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const changeTaskStatus = async (req, res) => {
  try {
    const { taskStatus } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { taskStatus },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const markTaskAsComplete = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { taskStatus: "completed", completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {

  try {
   
    const task = await Task.findOneAndDelete( req.params.id);
    if (task) {
      res.status(200).json({ message: "Task deleted successfully",task });
    }else{

      return res.status(404).json({ message: "Task not found" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  changeTaskStatus,
  markTaskAsComplete,
};
