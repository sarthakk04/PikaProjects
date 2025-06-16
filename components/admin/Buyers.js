"use client";

import { useEffect, useState } from 'react';
import { Users, Edit, Trash2, Plus, Eye, Search } from 'lucide-react';

export default function BuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await fetch('/api/users/buyers/login');
        if (!response.ok) {
          throw new Error('Failed to fetch buyers');
        }
        const data = await response.json();
        setBuyers(data.data || []);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);
  const filteredBuyers = buyers.filter(buyer => 
    buyer.b_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.b_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredBuyers.length > 0 ? (
                filteredBuyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{buyer.b_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.b_email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${buyer.totalSpent || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {buyer.joinDate || new Date(buyer.createdAt?.toDate()).toLocaleDateString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        buyer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        buyer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {buyer.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                      <button className="text-yellow-600 hover:text-yellow-900"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    {buyers.length === 0 ? 'No buyers found' : 'No matching buyers found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}