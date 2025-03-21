import React, { useState } from 'react';
import { Building2, Clock, Users, Plus, X, MapPin, Trash2, Edit } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import TaskManager from './TaskManager';

const initialProjects = [
  {
    id: 1,
    title: "Modern Office Complex",
    location: "Downtown Business District",
    status: "In Progress",
    completion: "75%",
    team: 28,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    tasks: []
  },
  {
    id: 2,
    title: "Residential Towers",
    location: "Riverside Development",
    status: "Planning",
    completion: "10%",
    team: 15,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
    tasks: []
  },
  {
    id: 3,
    title: "Shopping Mall Renovation",
    location: "City Center",
    status: "Completed",
    completion: "100%",
    team: 42,
    image: "https://images.unsplash.com/photo-1555036803-1c4398e7c997?auto=format&fit=crop&q=80",
    tasks: []
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
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

  const handleAddProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      tasks: []
    };
    setProjects([...projects, project]);
    setShowAddProject(false);
    setNewProject({
      title: '',
      location: '',
      status: 'Planning',
      completion: '0%',
      team: 0,
      image: ''
    });
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

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

  const handleUpdateProject = () => {
    if (!editingProject) return;
    
    setProjects(projects.map(p => 
      p.id === editingProject.id 
        ? { ...p, ...newProject, id: editingProject.id }
        : p
    ));
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
  };

  return (
    <main className="min-h-screen w-full pt-20 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Projects</h1>
            <p className="text-lg text-gray-600">Discover our latest construction projects and developments</p>
          </div>
          <button
            onClick={() => setShowAddProject(true)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => handleEditProject(project)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
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

        {/* Task Manager Modal */}
        {selectedProject && (
          <TaskManager
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onUpdate={(updatedProject) => {
              setProjects(projects.map(p => 
                p.id === updatedProject.id ? updatedProject : p
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