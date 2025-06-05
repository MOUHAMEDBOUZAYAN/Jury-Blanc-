const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('tasks');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public
const createProject = async (req, res) => {
  const { 
    title, 
    location, 
    status, 
    completion, 
    StartDate, 
    EndDate, 
    team, 
    image, 
    budget, 
    client, 
    description 
  } = req.body;

  try {
    const project = new Project({
      title,
      location,
      status,
      completion,
      StartDate,
      EndDate,
      team,
      image,
      budget,
      client,
      description,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { 
    title, 
    location, 
    status, 
    completion, 
    StartDate, 
    EndDate, 
    team, 
    image, 
    budget, 
    client, 
    description 
  } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title || project.title;
    project.location = location || project.location;
    project.status = status || project.status;
    project.completion = completion || project.completion;
    project.StartDate = StartDate || project.StartDate;
    project.EndDate = EndDate || project.EndDate;
    project.team = team || project.team;
    project.image = image || project.image;
    project.budget = budget || project.budget;
    project.client = client || project.client;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};