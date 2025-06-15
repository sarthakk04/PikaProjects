

"use client";

import { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Edit, 
  Trash2, 
  Plus, 
  Eye,
  Search,
  Save,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    p_name: '',
    p_price: '',
    p_category: '',
    p_info: {
      Desc: '',
      techstack: [],
      media: {
        image: '',
        video: ''
      }
    }
  });

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.status === 'success') {
          setProjects(data.data);
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Reset form
  const resetForm = () => {
    setEditForm({
      p_name: '',
      p_price: '',
      p_category: '',
      p_info: {
        Desc: '',
        techstack: [],
        media: {
          image: '',
          video: ''
        }
      }
    });
  };

  // Handle edit click
  const handleEdit = (project) => {
    const projectId = project.id || project.pid; // Handle both id and pid
    setEditingId(projectId);
    setEditForm({
      p_name: project.p_name,
      p_price: project.p_price,
      p_category: project.p_category,
      p_info: {
        Desc: project.p_info?.Desc || '',
        techstack: [...(project.p_info?.techstack || [])],
        media: {
          image: project.p_info?.media?.image || '',
          video: project.p_info?.media?.video || ''
        }
      }
    });
  };

  // Handle add project click
  const handleAddProject = () => {
    resetForm();
    setShowAddForm(true);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'p_info' && child === 'media') {
        return; // Handle media separately
      }
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle media change
  const handleMediaChange = (e) => {
    const { name, value } = e.target;
    const mediaField = name.split('.')[2]; // p_info.media.image -> image
    
    setEditForm(prev => ({
      ...prev,
      p_info: {
        ...prev.p_info,
        media: {
          ...prev.p_info.media,
          [mediaField]: value
        }
      }
    }));
  };

  // Handle techstack change
  const handleTechstackChange = (index, value) => {
    const newTechstack = [...editForm.p_info.techstack];
    newTechstack[index] = value;
    setEditForm(prev => ({
      ...prev,
      p_info: {
        ...prev.p_info,
        techstack: newTechstack
      }
    }));
  };

  // Add new techstack item
  const addTechstack = () => {
    setEditForm(prev => ({
      ...prev,
      p_info: {
        ...prev.p_info,
        techstack: [...prev.p_info.techstack, '']
      }
    }));
  };

  // Remove techstack item
  const removeTechstack = (index) => {
    const newTechstack = editForm.p_info.techstack.filter((_, i) => i !== index);
    setEditForm(prev => ({
      ...prev,
      p_info: {
        ...prev.p_info,
        techstack: newTechstack
      }
    }));
  };

  // Save edits
  const saveEdit = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setProjects(projects.map(project => {
          const id = project.id || project.pid;
          return id === projectId ? { ...project, ...editForm } : project;
        }));
        setEditingId(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new project
  const addProject = async () => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setProjects([...projects, data.data]);
        setShowAddForm(false);
        resetForm();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete project
  const deleteProject = async (project) => {
    const projectId = project.id || project.pid; // Handle both id and pid
    const projectName = project.p_name;
    
    if (!confirm(`Are you sure you want to delete "${projectName}"?`)) return;
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.status === 'success') {
        setProjects(projects.filter(p => {
          const id = p.id || p.pid;
          return id !== projectId;
        }));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Render form modal
  const renderFormModal = (isEdit = false) => {
    const title = isEdit ? 'Edit Project' : 'Add New Project';
    const saveAction = isEdit ? () => saveEdit(editingId) : addProject;
    const closeAction = isEdit ? () => setEditingId(null) : () => setShowAddForm(false);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={closeAction} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                name="p_name"
                value={editForm.p_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Enter project name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="p_category"
                  value={editForm.p_category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black "
                  placeholder="e.g., Web Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  name="p_price"
                  value={editForm.p_price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="e.g., 2500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="p_info.Desc"
                value={editForm.p_info.Desc}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Enter project description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
              <div className="space-y-2">
                {editForm.p_info.techstack.map((tech, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechstackChange(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., React"
                    />
                    <button 
                      onClick={() => removeTechstack(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTechstack}
                  className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Technology</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="p_info.media.image"
                  value={editForm.p_info.media.image}
                  onChange={handleMediaChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  type="url"
                  name="p_info.media.video"
                  value={editForm.p_info.media.video}
                  onChange={handleMediaChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={closeAction}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={saveAction}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEdit ? 'Update' : 'Add'} Project</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-8">Loading projects...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Project Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={handleAddProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tech Stack</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => {
                const projectId = project.id || project.pid; // Handle both id and pid
                return (
                  <tr key={projectId} className="hover:bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.p_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.p_category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      ${project.p_price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {project.p_info?.Desc || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {project.p_info?.techstack?.slice(0, 3).map((tech, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.p_info?.techstack?.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{project.p_info.techstack.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(project)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteProject(project)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link 
                          href={`/admin/projects/${projectId}`}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render modals */}
      {showAddForm && renderFormModal(false)}
      {editingId && renderFormModal(true)}
    </div>
  );
}

