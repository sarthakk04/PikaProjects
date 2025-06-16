/* eslint-disable */



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
                  <a href='/login'><button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                  </a>
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





// import React, { useState, useEffect } from 'react';

// const GooeyNav = ({ items, particleCount, particleDistances, particleR, initialActiveIndex, animationTime, timeVariance, colors }) => {
//   const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     // Generate particles
//     const newParticles = Array.from({ length: particleCount }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 4 + 2,
//       speedX: (Math.random() - 0.5) * 0.5,
//       speedY: (Math.random() - 0.5) * 0.5,
//       color: colors[i % colors.length]
//     }));
//     setParticles(newParticles);
//   }, [particleCount, colors]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setParticles(prev => prev.map(particle => ({
//         ...particle,
//         x: (particle.x + particle.speedX + 100) % 100,
//         y: (particle.y + particle.speedY + 100) % 100
//       })));
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   const getColorFromIndex = (colorIndex) => {
//     const colorMap = {
//       1: '#FFD700', // Gold yellow
//       2: '#FF5722'  // Red-orange
//     };
//     return colorMap[colorIndex] || '#FFD700';
//   };

//   return (
//     <div className="relative w-full h-full overflow-hidden bg-transparent">
//       {/* Animated particles background */}
//       <div className="absolute inset-0">
//         {particles.map(particle => (
//           <div
//             key={particle.id}
//             className="absolute rounded-full opacity-30 animate-pulse"
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               backgroundColor: getColorFromIndex(particle.color),
//               transform: 'translate(-50%, -50%)',
//               filter: 'blur(1px)'
//             }}
//           />
//         ))}
//       </div>

//       {/* Gooey blob effect */}
//       <div className="absolute inset-0">
//         <svg width="100%" height="100%" className="absolute inset-0">
//           <defs>
//             <filter id="gooey">
//               <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
//               <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="gooey" />
//               <feBlend in="SourceGraphic" in2="gooey" />
//             </filter>
//           </defs>
//         </svg>
//       </div>

//       {/* Navigation */}
//       <nav className="relative z-10 flex items-center justify-between px-8 py-6 h-full">
//         <div className="flex items-center space-x-8">
//           {items.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveIndex(index)}
//               className={`
//                 relative px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-105
//                 ${activeIndex === index 
//                   ? 'bg-yellow-400 text-white shadow-lg scale-105' 
//                   : 'bg-white/70 text-gray-800 hover:bg-yellow-100'
//                 }
//                 backdrop-blur-sm border border-yellow-200/50
//               `}
//               style={{
//                 filter: activeIndex === index ? 'url(#gooey)' : 'none',
//                 transition: `all ${animationTime}ms ease-in-out`
//               }}
//             >
//               <span className="relative z-10 font-medium">{item.label}</span>
//               {activeIndex === index && (
//                 <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Login Button */}
//         <button className="
//           relative px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 
//           text-white font-semibold shadow-lg transform transition-all duration-300 
//           hover:scale-105 hover:shadow-xl hover:from-yellow-500 hover:to-red-500
//           backdrop-blur-sm border border-yellow-300/50
//         ">
//           <span className="relative z-10">Login</span>
//           <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
//         </button>
//       </nav>

//       {/* Floating gooey elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full opacity-20 animate-bounce"
//             style={{
//               left: `${20 + i * 15}%`,
//               top: `${30 + (i % 2) * 40}%`,
//               width: `${20 + i * 5}px`,
//               height: `${20 + i * 5}px`,
//               backgroundColor: getColorFromIndex(colors[i % colors.length]),
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: `${2 + i * 0.5}s`,
//               filter: 'blur(2px)'
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Navbar = () => {
//   const items = [
//     { label: "Home", href: "#" },
//     { label: "About", href: "#" },
//     { label: "Contact", href: "#" },
//   ];

//   return (
//     <div 
//       className="mt-4 flex justify-center items-center"
//       style={{ height: '50px', background: 'transparent', position: 'relative' }}
//     >
//       <GooeyNav
//         items={items}
//         particleCount={15}
//         particleDistances={[90, 10]}
//         particleR={100}
//         initialActiveIndex={0}
//         animationTime={600}
//         timeVariance={300}
//         colors={[1, 2, 1, 2, 1, 2]}
//       />
//     </div>
//   );
// };

// export default Navbar;