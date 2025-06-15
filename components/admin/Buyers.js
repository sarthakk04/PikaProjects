"use client";

import { 
  Users, 
  Edit, 
  Trash2, 
  Plus, 
  Eye,
  Search
} from 'lucide-react';

export default function BuyersPage() {
  const dummyBuyers = [
    { id: 1, name: 'Ash Ketchum', email: 'ash@pokemon.com', totalSpent: 1250, joinDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Misty Waterflower', email: 'misty@cerulean.com', totalSpent: 890, joinDate: '2024-02-20', status: 'Active' },
    { id: 3, name: 'Brock Harrison', email: 'brock@pewter.com', totalSpent: 2100, joinDate: '2023-12-10', status: 'Inactive' },
    { id: 4, name: 'Team Rocket', email: 'rocket@evil.com', totalSpent: 450, joinDate: '2024-03-01', status: 'Suspended' }
  ];

  return (
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
}