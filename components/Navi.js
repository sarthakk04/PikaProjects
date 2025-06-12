



"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShoppingCart, Zap } from 'lucide-react';

const Navi = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/shop' },
    { name: 'Categories', href: '#categories' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
          isScrolled ? 'bg-white/15' : 'bg-white/10'
        }`}>
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-2xl"></div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-orange-400/20 p-[1px]">
            <div className="w-full h-full bg-transparent rounded-2xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-6 h-6 text-white group-hover:animate-pulse" />
              </div>
              <span className="text-xl font-bold text-yellow-400 group-hover:text-yellow-600 transition-colors duration-300" style={{ fontFamily: 'pikachuBold' }}>
                PikaProjects
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group relative bg-gradient-to-br from-yellow-400 to-orange-500 text-black hover:text-yellow-500 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
                  style={{fontFamily:'pikachuBold'}}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="group p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <Search className="w-5 h-5 text-yellow-400 group-hover:text-yellow-600 transition-colors duration-300" />
              </button>
              <button className="group p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 relative">
                <ShoppingCart className="w-5 h-5 text-yellow-400 group-hover:text-yellow-600 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  3
                </span>
              </button>
              <button className="group flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium">
                <User className="w-4 h-4 group-hover:animate-pulse" />
                <span style={{fontFamily:"pikachuBold"}}>Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-6 py-4 border-t border-white/20">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/20">
                  <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navi;





