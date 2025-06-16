// "use client";

// import { 
//   Users, 
//   ShoppingCart, 
//   FolderOpen, 
//   DollarSign,
//   Calendar
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function AdminLayout({ children }) {
//   const pathname = usePathname();
  
//   const menuItems = [
//     { id: 'buyers', label: 'Buyers', icon: Users, href: '/admin/buyers' },
//     { id: 'sellers', label: 'Sellers', icon: ShoppingCart, href: '/admin/sellers' },
//     { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
//     { id: 'revenue', label: 'Revenue', icon: DollarSign, href: '/admin/revenue' }
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-xl">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-center">⚡ PokéMarket</h1>
//           <p className="text-indigo-200 text-center text-sm mt-2">Admin Dashboard</p>
//         </div>
        
//         <nav className="mt-8">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname.startsWith(item.href);
//             return (
//               <Link
//                 key={item.id}
//                 href={item.href}
//                 className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
//                   isActive
//                     ? 'bg-indigo-700 border-r-4 border-yellow-400' 
//                     : 'hover:bg-indigo-700'
//                 }`}
//               >
//                 <Icon className="w-5 h-5 mr-3" />
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
        
      
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-hidden">
//         <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Calendar className="w-5 h-5 text-gray-400" />
//               <span className="text-gray-600">Today: {new Date().toLocaleDateString()}</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="text-sm text-gray-600">
//                 Welcome back, <span className="font-medium text-indigo-600">Professor Oak</span>
//               </div>
//               <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                 <span className="text-indigo-600 font-medium text-sm">PO</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-6 overflow-y-auto h-full">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { 
  Users, 
  ShoppingCart, 
  FolderOpen, 
  DollarSign,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'buyers', label: 'Buyers', icon: Users, href: '/admin/buyers' },
    { id: 'sellers', label: 'Sellers', icon: ShoppingCart, href: '/admin/sellers' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, href: '/admin/revenue' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">⚡ PokéMarket</h1>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && isMobile && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          ></div>
          <div className="relative z-50 w-64 h-full bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-xl">
            <div className="p-6 flex justify-between items-center">
              <h1 className="text-xl font-bold">⚡ PokéMarket</h1>
              <button 
                onClick={toggleMobileMenu}
                className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="mt-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={toggleMobileMenu}
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
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white shadow-xl">
        <div className="w-full">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <span className="text-sm md:text-base text-gray-600">
                Today: {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="text-xs md:text-sm text-gray-600">
                Welcome back, <span className="font-medium text-indigo-600">Professor Oak</span>
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium text-xs md:text-sm">PO</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}