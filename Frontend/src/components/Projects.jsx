// src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import { Building2, Clock, Users, Plus, X, MapPin, Trash2, Edit, Search } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import TaskManager from './TaskManager';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    status: 'Planning',
    completion: '0%',
    team: 0,
    image: ''
  });

  // Charger les projets depuis le backend
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filtrer les projets lorsque searchTerm ou projects change
  useEffect(() => {
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
      setFilteredProjects(response.data); // Initialiser les projets filtrés
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  // Validation des inputs
  const validateInputs = () => {
    const { title, location, status, completion, team, image } = newProject;

    if (!title || title.trim().length < 3) {
      toast.error('Title must be at least 3 characters long.');
      return false;
    }

    if (!location || location.trim().length < 3) {
      toast.error('Location must be at least 3 characters long.');
      return false;
    }

    const validStatuses = ['Planning', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      toast.error('Invalid status. Must be one of: Planning, In Progress, Completed.');
      return false;
    }

    const validCompletions = ['0%', '25%', '50%', '75%', '100%'];
    if (!validCompletions.includes(completion)) {
      toast.error('Invalid completion. Must be one of: 0%, 25%, 50%, 75%, 100%.');
      return false;
    }

    if (isNaN(team) || team < 0 || team > 1000) {
      toast.error('Team size must be a number between 0 and 1000.');
      return false;
    }

    if (image && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(image)) {
      toast.error('Invalid image URL.');
      return false;
    }

    return true;
  };

  // Ajouter un projet
  const handleAddProject = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/projects', newProject);
      setProjects([...projects, response.data]);
      setShowAddProject(false);
      setNewProject({
        title: '',
        location: '',
        status: 'Planning',
        completion: '0%',
        team: 0,
        image: ''
      });
      toast.success('Project added successfully!');
    } catch (error) {
      toast.error('Failed to add project');
    }
  };

  // Mettre à jour un projet
  const handleUpdateProject = async () => {
    if (!editingProject) return;
    if (!validateInputs()) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/projects/${editingProject._id}`,
        newProject
      );
      setProjects(projects.map(p => p._id === editingProject._id ? response.data : p));
      setShowAddProject(false);
      setEditingProject(null);
      setNewProject({
        title: '',
        location: '',
        status: 'Planning',
        completion: '0%',
        team: 0,
        image: ''
      });
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  // Supprimer un projet
  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
      setProjects(projects.filter(p => p._id !== projectId));
      toast.success('Project deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  // Gérer l'édition d'un projet
  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      location: project.location,
      status: project.status,
      completion: project.completion,
      team: project.team,
      image: project.image
    });
    setShowAddProject(true);
  };

  return (
    <main className="min-h-screen w-full pt-20 bg-cyan-900">
      <Toaster position='top-right' />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-100 mb-2">Our Projects</h1>
            <p className="text-lg text-gray-100">Discover our latest construction projects and developments</p>
          </div>
          <button
            onClick={() => setShowAddProject(true)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Projgect
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects by title, location or status..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add/Edit Project Modal */}
        {showAddProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button 
                  onClick={() => {
                    setShowAddProject(false);
                    setEditingProject(null);
                  }} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter project location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Completion Percentage</label>
                  <select
                    value={newProject.completion}
                    onChange={(e) => setNewProject({...newProject, completion: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="0%">0%</option>
                    <option value="25%">25%</option>
                    <option value="50%">50%</option>
                    <option value="75%">75%</option>
                    <option value="100%">100%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <input
                    type="number"
                    value={newProject.team}
                    onChange={(e) => setNewProject({...newProject, team: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter team size"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Image URL</label>
                  <input
                    type="text"
                    value={newProject.image}
                    onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <button
                  onClick={editingProject ? handleUpdateProject : handleAddProject}
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${project.image || 'https://via.placeholder.com/400'})` }} 
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => handleEditProject(project)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project._id)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Building2 className="w-5 h-5 mr-2" />
                    <span>Status: {project.status}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Completion: {project.completion}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Team Size: {project.team} members</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors"
                >
                  Manage Tasks
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun projet trouvé */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-100">No projects found matching your search criteria</p>
          </div>
        )}

        {/* Task Manager Modal */}
        {selectedProject && (
          <TaskManager
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onUpdate={(updatedProject) => {
              setProjects(projects.map(p => 
                p._id === updatedProject._id ? updatedProject : p
              ));
              setSelectedProject(null);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default Projects;