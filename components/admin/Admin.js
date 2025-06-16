"use client";

import { 
  Users, 
  ShoppingCart, 
  FolderOpen, 
  DollarSign,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  const menuItems = [
    { id: 'buyers', label: 'Buyers', icon: Users, href: '/admin/buyers' },
    { id: 'sellers', label: 'Sellers', icon: ShoppingCart, href: '/admin/sellers' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, href: '/admin/revenue' }
  ];

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
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  isActive
                    ? 'bg-indigo-700 border-r-4 border-yellow-400' 
                    : 'hover:bg-indigo-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
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
          {children}
        </div>
      </div>
    </div>
  );
}