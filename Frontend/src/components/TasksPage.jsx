// src/pages/TasksPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { X, Plus, Trash2, Calendar, CheckCircle, AlertCircle, Clock, Users, Edit } from 'lucide-react';
import { getTasks } from '../api';
import { toast, Toaster } from 'react-hot-toast';

const TasksPage = () => {
  const { projectId } = useParams(); // الحصول على معرف المشروع من الرابط
  const [tasks, setTasks] = useState([]);

  // جلب المهام من الخادم
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(projectId);
        setTasks(response.data);
      } catch (error) {
        toast.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div className="min-h-screen w-full pt-20 bg-cyan-900">
      <Toaster /> {/* لإظهار الإشعارات */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Tasks for Project {projectId}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white border rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {task.status === 'Completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : task.status === 'Pending' ? (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-500" />
                    )}
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>End: {new Date(task.endDate).toLocaleDateString()}</span>
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
                  {task.suppliers.map((supplier) => (
                    <div key={supplier._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-gray-600">{supplier.contact}</p>
                        <p className="text-sm text-gray-600">Materials: {supplier.materials}</p>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;