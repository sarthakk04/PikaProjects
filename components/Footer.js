/* eslint-disable */



"use client";
import React from 'react';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#' },
      { name: 'Projects', href: '#projects' },
      { name: 'Categories', href: '#categories' },
      { name: 'About Us', href: '#about' }
    ],
    'Categories': [
      { name: 'Web Development', href: '#web' },
      { name: 'Mobile Apps', href: '#mobile' },
      { name: 'AI/ML Projects', href: '#ai' },
      { name: 'E-commerce', href: '#ecommerce' }
    ],
    'Support': [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Documentation', href: '#docs' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: '#', color: 'hover:text-gray-800' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#DDFDFE] via-[#DDFDFE] to-[#E5FFFE] py-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-red-400/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-400/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Pokemon elements floating */}
        <div className="absolute top-1/4 left-1/3 text-4xl opacity-10 animate-bounce">⚡</div>
        <div className="absolute top-1/2 right-1/4 text-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>🔥</div>
        <div className="absolute bottom-1/3 left-1/5 text-2xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>💧</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-3xl"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-7 h-7 text-white group-hover:animate-pulse" />
                </div>
                <span className="text-2xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300" style={{ fontFamily: 'pikachuBold' }}>
                  PikaProjects
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your ultimate destination for premium development projects. Join our community of developers and start building amazing things today! ⚡
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 hover:text-yellow-600 transition-colors duration-300 group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>hello@pikaprojects.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-yellow-600 transition-colors duration-300 group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-yellow-600 transition-colors duration-300 group">
                  <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-lg font-bold text-gray-800 mb-4 group cursor-default">
                  <span className="group-hover:text-yellow-600 transition-colors duration-300">{title}</span>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mt-1 group-hover:w-12 transition-all duration-300"></div>
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-yellow-600 transition-all duration-300 hover:translate-x-1 block group"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-600 mb-4 md:mb-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by PikaProjects Team © 2024. All rights reserved.</span>
            </div>

            {/* Social Links + Scroll To Top */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color} group`}
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
