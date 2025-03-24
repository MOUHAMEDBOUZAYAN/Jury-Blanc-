const Task = require('../models/Task');
const Project = require('../models/Project');



const getTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, status, startDate, endDate, resources } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = new Task({
      title,
      description,
      status,
      startDate,
      endDate,
      resources,
      project: projectId,
    });

    const savedTask = await task.save();
    project.tasks.push(savedTask._id);
    await project.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, startDate, endDate, resources } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.startDate = startDate || task.startDate;
    task.endDate = endDate || task.endDate;
    task.resources = resources || task.resources;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};