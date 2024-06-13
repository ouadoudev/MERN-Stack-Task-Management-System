const Task = require("../models/Task");
const User = require("../models/User");

/**
 * @swagger
 * definitions:
 *   Task:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       deadline:
 *         type: string
 *       user:
 *         type: string
 *       completed:
 *         type: boolean
 *       taskStatus:
 *         type: string
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/Task'
 *       '400':
 *         description: Bad request
 */
const createTask = async (req, res) => {
  try {
    const { title, description, deadline, user } = req.body;

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             tasks:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Task'
 *       '500':
 *         description: Server Error
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('user','username');
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Task'
 *     responses:
 *       '200':
 *         description: Updated
 *         schema:
 *           $ref: '#/definitions/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server Error
 */
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

/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Change task status by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             taskStatus:
 *               type: string
 *     responses:
 *       '200':
 *         description: Updated
 *         schema:
 *           $ref: '#/definitions/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server Error
 */
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

/**
 * @swagger
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Mark task as complete by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Updated
 *         schema:
 *           $ref: '#/definitions/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server Error
 */
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

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Server Error
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete(req.params.id);
    if (task) {
      res.status(200).json({ message: "Task deleted successfully", task });
    } else {
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
