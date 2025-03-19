const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { name, description, startDate, endDate, budget, createdBy } = req.body;

  try {
    const project = new Project({ name, description, startDate, endDate, budget, createdBy });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy', 'username');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};