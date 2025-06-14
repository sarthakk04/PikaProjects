"use client";

import React, { useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  FolderOpen, 
  DollarSign, 
  Edit, 
  Trash2, 
  Plus, 
  Eye,
  TrendingUp,
  Star,
  Calendar,
  Search
} from 'lucide-react';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('buyers');

  // Dummy data
  const dummyBuyers = [
    { id: 1, name: 'Ash Ketchum', email: 'ash@pokemon.com', totalSpent: 1250, joinDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Misty Waterflower', email: 'misty@cerulean.com', totalSpent: 890, joinDate: '2024-02-20', status: 'Active' },
    { id: 3, name: 'Brock Harrison', email: 'brock@pewter.com', totalSpent: 2100, joinDate: '2023-12-10', status: 'Inactive' },
    { id: 4, name: 'Team Rocket', email: 'rocket@evil.com', totalSpent: 450, joinDate: '2024-03-01', status: 'Suspended' }
  ];

  const dummySellers = [
    { id: 1, name: 'Professor Oak', email: 'oak@research.com', totalEarnings: 5600, projectsCount: 12, rating: 4.9, status: 'Verified' },
    { id: 2, name: 'Nurse Joy', email: 'joy@pokecenter.com', totalEarnings: 3200, projectsCount: 8, rating: 4.7, status: 'Verified' },
    { id: 3, name: 'Officer Jenny', email: 'jenny@police.com', totalEarnings: 1800, projectsCount: 5, rating: 4.2, status: 'Pending' },
    { id: 4, name: 'Giovanni', email: 'boss@teamrocket.com', totalEarnings: 890, projectsCount: 3, rating: 3.1, status: 'Under Review' }
  ];

  const dummyProjects = [
    { id: 1, title: 'Pokedex Mobile App', seller: 'Professor Oak', price: 299, category: 'Mobile App', status: 'Active', sales: 45 },
    { id: 2, title: 'Pokemon Battle Simulator', seller: 'Ash Ketchum', price: 199, category: 'Web Game', status: 'Active', sales: 32 },
    { id: 3, title: 'Gym Management System', seller: 'Brock Harrison', price: 449, category: 'Web App', status: 'Pending', sales: 18 },
    { id: 4, title: 'Pokemon Trading Bot', seller: 'Team Rocket', price: 99, category: 'Bot', status: 'Rejected', sales: 5 }
  ];

  const revenueData = {
    totalRevenue: 28450,
    monthlyRevenue: 4200,
    totalTransactions: 156,
    avgOrderValue: 182,
    topCategories: [
      { name: 'Mobile Apps', revenue: 12500, percentage: 44 },
      { name: 'Web Games', revenue: 8900, percentage: 31 },
      { name: 'Bots', revenue: 4200, percentage: 15 },
      { name: 'Web Apps', revenue: 2850, percentage: 10 }
    ]
  };

  const menuItems = [
    { id: 'buyers', label: 'Buyers', icon: Users },
    { id: 'sellers', label: 'Sellers', icon: ShoppingCart },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'revenue', label: 'Revenue', icon: DollarSign }
  ];

  const renderBuyers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Buyer Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search buyers..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Buyer</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyBuyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{buyer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${buyer.totalSpent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      buyer.status === 'Active' ? 'bg-green-100 text-green-800' :
                      buyer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {buyer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-yellow-600 hover:text-yellow-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSellers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Seller Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search sellers..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Seller</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummySellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${seller.totalEarnings}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.projectsCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {seller.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      seller.status === 'Verified' ? 'bg-green-100 text-green-800' :
                      seller.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-yellow-600 hover:text-yellow-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyProjects.map((project) => (
                <tr key={project.id} className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.seller}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${project.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">{project.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-yellow-600 hover:text-yellow-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Revenue Analytics</h2>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">${revenueData.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold">${revenueData.monthlyRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold">{revenueData.totalTransactions}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Order Value</p>
              <p className="text-2xl font-bold">${revenueData.avgOrderValue}</p>
            </div>
            <Star className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h3>
        <div className="space-y-4">
          {revenueData.topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
                <span className="text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-medium">${category.revenue.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'buyers': return renderBuyers();
      case 'sellers': return renderSellers();
      case 'projects': return renderProjects();
      case 'revenue': return renderRevenue();
      default: return renderBuyers();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center">⚡ PokéMarket</h1>
          <p className="text-indigo-200 text-center text-sm mt-2">Admin Dashboard</p>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeSection === item.id 
                    ? 'bg-indigo-700 border-r-4 border-yellow-400' 
                    : 'hover:bg-indigo-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-indigo-700 rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-sm text-indigo-200">Gotta manage 'em all!</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">Today: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back, <span className="font-medium text-indigo-600">Professor Oak</span>
              </div>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium text-sm">PO</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;