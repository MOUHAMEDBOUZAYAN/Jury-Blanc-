// src/components/TaskManager.jsx
import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, CheckCircle, AlertCircle, Clock, Users, Edit } from 'lucide-react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

const TaskManager = ({ project, onClose, onUpdate }) => {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    startDate: '',
    endDate: '',
    resources: '',
    suppliers: []
  });
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    materials: ''
  });

  const handleAddTask = async () => {
    try {
      const response = await createTask(project.id, newTask);
      const updatedTasks = [...tasks, response.data];
      setTasks(updatedTasks);
      setShowAddTask(false);
      setNewTask({
        title: '',
        description: '',
        status: 'Pending',
        startDate: '',
        endDate: '',
        resources: '',
        suppliers: []
      });
      onUpdate({ ...project, tasks: updatedTasks });
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
      resources: task.resources,
      suppliers: task.suppliers
    });
    setShowAddTask(true);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      const response = await updateTask(editingTask.id, newTask);
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? response.data : task
      );
      setTasks(updatedTasks);
      setShowAddTask(false);
      setEditingTask(null);
      setNewTask({
        title: '',
        description: '',
        status: 'Pending',
        startDate: '',
        endDate: '',
        resources: '',
        suppliers: []
      });
      onUpdate({ ...project, tasks: updatedTasks });
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      onUpdate({ ...project, tasks: updatedTasks });
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleAddSupplier = (taskId) => {
    const supplier = {
      id: Date.now(),
      ...newSupplier
    };

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          suppliers: [...(task.suppliers || []), supplier]
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setNewSupplier({
      name: '',
      contact: '',
      materials: ''
    });

    onUpdate({ ...project, tasks: updatedTasks });
  };

  const handleRemoveSupplier = (taskId, supplierId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          suppliers: task.suppliers.filter(s => s.id !== supplierId)
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    onUpdate({ ...project, tasks: updatedTasks });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Task Manager - {project.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setShowAddTask(true);
          }}
          className="mb-6 bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>

        {/* Add/Edit Task Form */}
        {showAddTask && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">
              {editingTask ? 'Edit Task' : 'New Task'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTask.endDate}
                    onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resources</label>
                <input
                  type="text"
                  value={newTask.resources}
                  onChange={(e) => setNewTask({...newTask, resources: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter required resources"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={editingTask ? handleUpdateTask : handleAddTask}
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                <button
                  onClick={() => {
                    setShowAddTask(false);
                    setEditingTask(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white border rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Start: {task.startDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>End: {task.endDate}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mt-2">
                <Users className="w-4 h-4 mr-2" />
                <span>Resources: {task.resources}</span>
              </div>

              {/* Suppliers Section */}
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Suppliers</h4>
                <div className="space-y-2">
                  {task.suppliers?.map((supplier) => (
                    <div key={supplier.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-gray-600">{supplier.contact}</p>
                        <p className="text-sm text-gray-600">Materials: {supplier.materials}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveSupplier(task.id, supplier.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Supplier Form */}
                <div className="mt-4 p-3 border-t">
                  <h5 className="font-medium mb-2">Add Supplier</h5>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Supplier Name"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Contact Information"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Materials Provided"
                      value={newSupplier.materials}
                      onChange={(e) => setNewSupplier({...newSupplier, materials: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                    <button
                      onClick={() => handleAddSupplier(task.id)}
                      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                    >
                      Add Supplier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;