const Task = require("../models/Task");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ Error: error.message });
    console.log("\x1b[36m%s\x1b[0m", error.message);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ Error: error.message });
    console.log("\x1b[36m%s\x1b[0m", error.message);
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ Error: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.log("\x1b[36m%s\x1b[0m", error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ Error: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.log("\x1b[36m%s\x1b[0m", error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ Error: `No task with id : ${taskID}` });
    }
    res.status(200).json({ id: taskID, data: req.body });
  } catch (error) {
    res.status(500).json({ Error: error });
    console.log("\x1b[36m%s\x1b[0m", error.message);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
