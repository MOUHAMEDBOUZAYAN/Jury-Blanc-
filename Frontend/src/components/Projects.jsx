import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Clock, Users, Plus, X, MapPin, Trash2, Edit, Search, 
  Filter, SortDesc, Calendar, Eye, Star, TrendingUp, CheckCircle,
  AlertCircle, BarChart3, Target, Zap, Award, Phone, Mail, AlertTriangle
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import TaskManager from './TaskManager';
import axios from 'axios';

const ProfessionalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    planning: 0
  });

  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    status: 'Planning',
    completion: '0%',
    StartDate: '',
    EndDate: '',
    team: 0,
    image: '',
    budget: '',
    client: '',
    description: ''
  });

  // Load projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort projects
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'completion':
        filtered.sort((a, b) => parseInt(b.completion) - parseInt(a.completion));
        break;
    }

    setFilteredProjects(filtered);
  }, [searchTerm, filterStatus, sortBy, projects]);

  // Calculate stats
  useEffect(() => {
    const newStats = {
      total: projects.length,
      planning: projects.filter(p => p.status === 'Planning').length,
      inProgress: projects.filter(p => p.status === 'In Progress').length,
      completed: projects.filter(p => p.status === 'Completed').length
    };
    setStats(newStats);
  }, [projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des projets');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    const { title, location, status, completion, StartDate, EndDate, team, client } = newProject;

    if (!title || title.trim().length < 3) {
      toast.error('Le titre doit contenir au moins 3 caractères.');
      return false;
    }

    if (!location || location.trim().length < 3) {
      toast.error('La localisation doit contenir au moins 3 caractères.');
      return false;
    }

    if (!client || client.trim().length < 2) {
      toast.error('Le nom du client est requis.');
      return false;
    }

    const validStatuses = ['Planning', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      toast.error('Statut invalide.');
      return false;
    }

    if (isNaN(team) || team < 0 || team > 1000) {
      toast.error('La taille de l\'équipe doit être un nombre entre 0 et 1000.');
      return false;
    }

    if (StartDate && EndDate && new Date(StartDate) > new Date(EndDate)) {
      toast.error('La date de fin doit être postérieure à la date de début.');
      return false;
    }

    return true;
  };

  const handleAddProject = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/projects', {
        ...newProject,
        createdAt: new Date().toISOString()
      });
      setProjects([response.data, ...projects]);
      setShowAddProject(false);
      resetForm();
      toast.success('Projet ajouté avec succès!');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du projet');
      console.error('Add error:', error);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject || !validateInputs()) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/projects/${editingProject._id}`,
        newProject
      );
      setProjects(projects.map(p => p._id === editingProject._id ? response.data : p));
      setShowAddProject(false);
      setEditingProject(null);
      resetForm();
      toast.success('Projet mis à jour avec succès!');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du projet');
      console.error('Update error:', error);
    }
  };

  // Modified delete function to show confirmation modal
  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setShowConfirmation(true);
  };

  // Confirm deletion function
  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectToDelete._id}`);
      setProjects(projects.filter(p => p._id !== projectToDelete._id));
      setShowConfirmation(false);
      setProjectToDelete(null);
      toast.success('Projet supprimé avec succès!');
    } catch (error) {
      toast.error('Erreur lors de la suppression du projet');
      console.error('Delete error:', error);
    }
  };

  // Cancel deletion
  const cancelDeleteProject = () => {
    setShowConfirmation(false);
    setProjectToDelete(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      location: project.location,
      status: project.status,
      completion: project.completion,
      StartDate: project.StartDate || '',
      EndDate: project.EndDate || '',
      team: project.team,
      image: project.image,
      budget: project.budget || '',
      client: project.client || '',
      description: project.description || ''
    });
    setShowAddProject(true);
  };

  const resetForm = () => {
    setNewProject({
      title: '',
      location: '',
      status: 'Planning',
      completion: '0%',
      StartDate: '',
      EndDate: '',
      team: 0,
      image: '',
      budget: '',
      client: '',
      description: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planning': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <BarChart3 className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCompletionColor = (completion) => {
    const percent = parseInt(completion);
    if (percent >= 80) return 'text-green-600';
    if (percent >= 50) return 'text-yellow-600';
    if (percent >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Nos <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Projets</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos réalisations exceptionnelles et nos projets en cours. 
              Chaque projet reflète notre engagement envers l'excellence et l'innovation.
            </p>
          </div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={statsVariants} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-gray-600 text-sm">Total Projets</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={statsVariants} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                  <p className="text-gray-600 text-sm">En Cours</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={statsVariants} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                  <p className="text-gray-600 text-sm">Terminés</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={statsVariants} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.planning}</p>
                  <p className="text-gray-600 text-sm">En Planification</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, localisation, client..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="Planning">Planification</option>
                <option value="In Progress">En cours</option>
                <option value="Completed">Terminés</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="name">Par nom</option>
                <option value="completion">Par avancement</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddProject(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Nouveau Projet
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun projet trouvé</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm || filterStatus !== 'all' 
                ? 'Aucun projet ne correspond à vos critères de recherche.' 
                : 'Commencez par créer votre premier projet.'
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddProject(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Créer un Projet
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditProject(project)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteProject(project)}
                      className="w-10 h-10 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </div>
                  </div>

                  {/* Completion Badge */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className={`text-sm font-bold ${getCompletionColor(project.completion)}`}>
                        {project.completion}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  {project.client && (
                    <p className="text-teal-600 font-medium mb-3">Client: {project.client}</p>
                  )}

                  {project.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3 text-teal-500" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    
                    {project.StartDate && (
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-3 text-teal-500" />
                        <span className="text-sm">
                          Début: {new Date(project.StartDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-3 text-teal-500" />
                      <span className="text-sm">{project.team} membres</span>
                    </div>

                    {project.budget && (
                      <div className="flex items-center text-gray-600">
                        <TrendingUp className="w-4 h-4 mr-3 text-teal-500" />
                        <span className="text-sm">Budget: {project.budget}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Avancement</span>
                      <span className={`text-sm font-bold ${getCompletionColor(project.completion)}`}>
                        {project.completion}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: project.completion }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          parseInt(project.completion) >= 80 
                            ? 'from-green-500 to-emerald-500'
                            : parseInt(project.completion) >= 50
                            ? 'from-yellow-500 to-orange-500'
                            : 'from-red-500 to-pink-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Eye className="w-5 h-5" />
                    Gérer les Tâches
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && projectToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              >
                <div className="text-center">
                  {/* Warning Icon */}
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Confirmer la suppression
                  </h3>
                  
                  {/* Message */}
                  <p className="text-gray-600 mb-2">
                    Êtes-vous sûr de vouloir supprimer le projet
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mb-6">
                    "{projectToDelete.title}" ?
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 text-sm">
                      ⚠️ Cette action est irréversible. Toutes les données associées à ce projet seront définitivement perdues.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={cancelDeleteProject}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={confirmDeleteProject}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
                    >
                      Supprimer
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Project Modal */}
        <AnimatePresence>
          {showAddProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {editingProject ? 'Modifier le Projet' : 'Nouveau Projet'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {editingProject ? 'Mettez à jour les informations du projet' : 'Créez un nouveau projet de construction'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowAddProject(false);
                      setEditingProject(null);
                      resetForm();
                    }}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  editingProject ? handleUpdateProject() : handleAddProject();
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Informations Générales</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom du Projet *
                        </label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="Ex: Résidence Les Palmiers"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Client *
                        </label>
                        <input
                          type="text"
                          value={newProject.client}
                          onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="Nom du client"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Localisation *
                        </label>
                        <input
                          type="text"
                          value={newProject.location}
                          onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="Ex: Casablanca, Maroc"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                          rows={4}
                          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                          placeholder="Description détaillée du projet..."
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Détails du Projet</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Statut
                          </label>
                          <select
                            value={newProject.status}
                            onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          >
                            <option value="Planning">Planification</option>
                            <option value="In Progress">En cours</option>
                            <option value="Completed">Terminé</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Avancement
                          </label>
                          <select
                            value={newProject.completion}
                            onChange={(e) => setNewProject({...newProject, completion: e.target.value})}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          >
                            <option value="0%">0%</option>
                            <option value="10%">10%</option>
                            <option value="25%">25%</option>
                            <option value="50%">50%</option>
                            <option value="75%">75%</option>
                            <option value="90%">90%</option>
                            <option value="100%">100%</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date de début
                          </label>
                          <input
                            type="date"
                            value={newProject.StartDate}
                            onChange={(e) => setNewProject({...newProject, StartDate: e.target.value})}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date de fin
                          </label>
                          <input
                            type="date"
                            value={newProject.EndDate}
                            onChange={(e) => setNewProject({...newProject, EndDate: e.target.value})}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Taille de l'équipe
                          </label>
                          <input
                            type="number"
                            value={newProject.team}
                            onChange={(e) => setNewProject({...newProject, team: parseInt(e.target.value) || 0})}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Nombre de membres"
                            min="0"
                            max="1000"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Budget estimé
                          </label>
                          <input
                            type="text"
                            value={newProject.budget}
                            onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Ex: 1,500,000 MAD"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL de l'image
                        </label>
                        <input
                          type="url"
                          value={newProject.image}
                          onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAddProject(false);
                        setEditingProject(null);
                        resetForm();
                      }}
                      className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
                    >
                      {editingProject ? 'Mettre à jour le Projet' : 'Créer le Projet'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Manager Modal */}
        <AnimatePresence>
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
        </AnimatePresence>

        {/* Contact CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-center text-white"
        >
          <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Prêt à Démarrer Votre Projet ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons réaliser vos ambitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+212690815605"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              <Phone className="w-5 h-5" />
              +212 6 90 81 56 05
            </motion.a>
            <motion.a
              href="mailto:contact@constructionxpert.ma"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-all border-2 border-teal-400"
            >
              <Mail className="w-5 h-5" />
              Envoyer un Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProfessionalProjects;