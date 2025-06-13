/* eslint-disable */


"use client";

import { useState } from 'react';
import Navbar from './Navi';

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      {/* Subtle Border Animation */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
      
      <div className="relative">
        {/* Project Image */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden relative border border-gray-200">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-gray-600">{project.icon}</div>
          </div>
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${project.price}
          </div>
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-blue-500">⚡</span>
              <span className="text-sm text-gray-600">{project.tech}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {project.features.map((feature, index) => (
              <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              🛒Cart
            </button>
            <button className="bg-yellow-100 hover:bg-red-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200">
              👁️ Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shop Component
export default function PokemonShop() {
  // Fixed state variables
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
 
  const categories = ['Web Apps', 'Mobile Apps', 'Games', 'AI/ML', 'E-commerce'];
  const technologies = ['React', 'Node.js', 'Python', 'Flutter', 'Unity'];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTechChange = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTechs([]);
    setPriceRange([0, 1000]);
    setSearchTerm('');
  };

  // Projects Data
  const projects = [
    {
      id: 1,
      title: "Pokemon Battle Arena",
      description: "Full-stack battle system with real-time multiplayer functionality and stunning animations.",
      price: 299,
      category: "Web Apps",
      tech: "React",
      icon: "⚔️",
      featured: true,
      features: ["Real-time", "Multiplayer", "Animations"]
    },
    {
      id: 2,
      title: "Pokedex Mobile App",
      description: "Beautiful mobile app with Pokemon data, search functionality, and offline support.",
      price: 199,
      category: "Mobile Apps",
      tech: "Flutter",
      icon: "📱",
      featured: false,
      features: ["Offline", "Search", "Responsive"]
    },
    {
      id: 3,
      title: "Trading Card Game",
      description: "Complete trading card game with deck builder, battle system, and card marketplace.",
      price: 399,
      category: "Games",
      tech: "Unity",
      icon: "🃏",
      featured: true,
      features: ["Marketplace", "Battle", "Deck Builder"]
    },
    {
      id: 4,
      title: "Pokemon Dashboard",
      description: "Admin dashboard for managing Pokemon data with analytics and user management.",
      price: 149,
      category: "Web Apps",
      tech: "React",
      icon: "📊",
      featured: false,
      features: ["Analytics", "Admin", "Charts"]
    },
    {
      id: 5,
      title: "Pokemon Chat Bot",
      description: "AI-powered chatbot that can answer questions about Pokemon and provide recommendations.",
      price: 249,
      category: "AI/ML",
      tech: "Python",
      icon: "🤖",
      featured: false,
      features: ["AI", "Chat", "Recommendations"]
    },
    {
      id: 6,
      title: "Pokemon E-commerce",
      description: "Complete e-commerce platform for Pokemon merchandise with payment integration.",
      price: 499,
      category: "E-commerce",
      tech: "Node.js",
      icon: "🛍️",
      featured: true,
      features: ["Payment", "Cart", "Inventory"]
    }
  ];

  // Filter logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category);
    
    const matchesTech = selectedTechs.length === 0 || selectedTechs.includes(project.tech);
    
    const matchesPrice = project.price >= priceRange[0] && project.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesTech && matchesPrice;
  });

  return (
<>
<Navbar/>
    <div className="min-h-screen bg-gray-50">

      {/* Top Banner */}
      <div className="relative h-64 bg-white border-b border-gray-200 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
          <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl mr-3">⚡</div>
              <h1 className="text-4xl font-bold text-gray-800">
                Pokemon <span className="text-yellow-600">Projects</span> Shop
              </h1>
              <div className="text-4xl ml-3">🔥</div>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Discover amazing Pokemon-themed projects built with cutting-edge technology
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 border border-gray-200">
                <span className="font-medium">{projects.length}</span> Projects Available
              </div>
              <div className="bg-yellow-50/80 backdrop-blur-sm px-4 py-2 rounded-full text-yellow-700 border border-yellow-200">
                🏆 Premium Quality
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Pokemon Filters */}
          <div className="w-full lg:w-80">
            <div className="bg-gradient-to-br from-yellow-300 via-yellow-200 to-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
              {/* Shiny overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-black mr-3 relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Poké Filters</h2>
              </div>

              {/* Search */}
              <div className="relative z-10 mb-5">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full p-3 bg-white/80 backdrop-blur-sm border-2 border-yellow-400 rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-300 shadow-inner"
                  />
                  <div className="absolute right-3 top-3 text-yellow-600">🔍</div>
                </div>
              </div>

              {/* Categories */}
              <div className="relative z-10 mb-5">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">⚡</span>Categories
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          selectedCategories.includes(category)
                            ? 'bg-yellow-500 border-yellow-600 shadow-inner'
                            : 'bg-white border-gray-400 group-hover:border-yellow-400'
                        }`}>
                          {selectedCategories.includes(category) && (
                            <div className="text-white text-xs flex items-center justify-center h-full">✓</div>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="relative z-10 mb-5">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">🔧</span>Tech Stack
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {technologies.map(tech => (
                    <label key={tech} className="flex items-center cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedTechs.includes(tech)}
                          onChange={() => handleTechChange(tech)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          selectedTechs.includes(tech)
                            ? 'bg-yellow-500 border-yellow-600 shadow-inner'
                            : 'bg-white border-gray-400 group-hover:border-yellow-400'
                        }`}>
                          {selectedTechs.includes(tech) && (
                            <div className="text-white text-xs flex items-center justify-center h-full">✓</div>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {tech}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="relative z-10 mb-6">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">💰</span>Price Range
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #fef08a 0%, #facc15 ${(priceRange[1]/1000)*100}%, #e5e7eb ${(priceRange[1]/1000)*100}%, #e5e7eb 100%)`,
                      WebkitAppearance: 'none',
                      outline: 'none'
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>$0</span>
                    <span className="font-semibold text-yellow-700">${priceRange[1]}</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </div>

              {/* Clear Button */}
              <button
                onClick={clearFilters}
                className="relative z-10 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <div className="w-5 h-5 bg-white rounded-full border border-gray-300 mr-2 relative">
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0.5 left-0.5"></div>
                </div>
                Reset Filters
              </button>

              {/* Decorative Pokeball corners */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-full border border-black opacity-30">
                <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full border border-black opacity-20">
                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </div>

          {/* Right Content - Project Cards */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Found {filteredProjects.length} Projects
              </h2>
              <div className="flex items-center space-x-4">
                <select className="bg-white text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option>Sort by: Featured</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Name</option>
                </select>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-8xl mb-4">😕</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
// "use client";

// import { useState } from 'react';

// // Project Card Component
// const ProjectCard = ({ project }) => {
//   return (
//     <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
//       {/* Subtle Border Animation */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
      
//       <div className="relative">
//         {/* Project Image */}
//         <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden relative border border-gray-200">
//           <div className="absolute inset-0 bg-white/10"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-6xl text-gray-600">{project.icon}</div>
//           </div>
//           {/* Price Badge */}
//           <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
//             ${project.price}
//           </div>
//           {/* Featured Badge */}
//           {project.featured && (
//             <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//               ⭐ Featured
//             </div>
//           )}
//         </div>

//         {/* Project Info */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//               {project.category}
//             </span>
//             <div className="flex items-center space-x-1">
//               <span className="text-blue-500">⚡</span>
//               <span className="text-sm text-gray-600">{project.tech}</span>
//             </div>
//           </div>

//           <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
//             {project.title}
//           </h3>

//           <p className="text-gray-600 text-sm line-clamp-2">
//             {project.description}
//           </p>

//           {/* Features */}
//           <div className="flex flex-wrap gap-1">
//             {project.features.map((feature, index) => (
//               <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
//                 {feature}
//               </span>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-2 pt-2">
//             <button className="flex-1 bg-yellow-400 hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
//               🛒Cart
//             </button>
//             <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200">
//               👁️ Preview
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Shop Component
// export default function PokemonShop() {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedTech, setSelectedTech] = useState('All');
//   const [priceRange, setPriceRange] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
 
//     const categories = ['Web Apps', 'Mobile Apps', 'Games', 'AI/ML', 'E-commerce'];
//   const technologies = ['React', 'Node.js', 'Python', 'Flutter', 'Unity'];

//   const handleCategoryChange = (category) => {
//     setSelectedCategories(prev => 
//       prev.includes(category) 
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const handleTechChange = (tech) => {
//     setSelectedTechs(prev => 
//       prev.includes(tech) 
//         ? prev.filter(t => t !== tech)
//         : [...prev, tech]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTechs([]);
//     setPriceRange([0, 1000]);
//     setSearchTerm('');
//   };

//   // Projects Data
//   const projects = [
//     {
//       id: 1,
//       title: "Pokemon Battle Arena",
//       description: "Full-stack battle system with real-time multiplayer functionality and stunning animations.",
//       price: 299,
//       category: "Full Stack",
//       tech: "React",
//       icon: "⚔️",
//       featured: true,
//       features: ["Real-time", "Multiplayer", "Animations"]
//     },
//     {
//       id: 2,
//       title: "Pokedex Mobile App",
//       description: "Beautiful mobile app with Pokemon data, search functionality, and offline support.",
//       price: 199,
//       category: "Mobile",
//       tech: "React Native",
//       icon: "📱",
//       featured: false,
//       features: ["Offline", "Search", "Responsive"]
//     },
//     {
//       id: 3,
//       title: "Trading Card Game",
//       description: "Complete trading card game with deck builder, battle system, and card marketplace.",
//       price: 399,
//       category: "Game",
//       tech: "Vue.js",
//       icon: "🃏",
//       featured: true,
//       features: ["Marketplace", "Battle", "Deck Builder"]
//     },
//     {
//       id: 4,
//       title: "Pokemon Dashboard",
//       description: "Admin dashboard for managing Pokemon data with analytics and user management.",
//       price: 149,
//       category: "Dashboard",
//       tech: "Next.js",
//       icon: "📊",
//       featured: false,
//       features: ["Analytics", "Admin", "Charts"]
//     },
//     {
//       id: 5,
//       title: "Pokemon Chat Bot",
//       description: "AI-powered chatbot that can answer questions about Pokemon and provide recommendations.",
//       price: 249,
//       category: "AI/ML",
//       tech: "Python",
//       icon: "🤖",
//       featured: false,
//       features: ["AI", "Chat", "Recommendations"]
//     },
//     {
//       id: 6,
//       title: "Pokemon E-commerce",
//       description: "Complete e-commerce platform for Pokemon merchandise with payment integration.",
//       price: 499,
//       category: "E-commerce",
//       tech: "React",
//       icon: "🛍️",
//       featured: true,
//       features: ["Payment", "Cart", "Inventory"]
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Banner */}
//       <div className="relative h-64 bg-white border-b border-gray-200 overflow-hidden">
//         {/* Subtle Background */}
//         <div className="absolute inset-0">
//           <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
//           <div className="absolute top-20 right-20 w-60 h-60 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
//           <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
//         </div>

//         {/* Banner Content */}
//         <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
//           <div>
//             <div className="flex items-center justify-center mb-4">
//               <div className="text-4xl mr-3 text-blue-500">⚡</div>
//               <h1 className="text-4xl font-bold text-gray-800">
//                 Professional <span className="text-gray-900">Projects</span> Shop
//               </h1>
//               <div className="text-4xl ml-3 text-red-500">🔥</div>
//             </div>
//             <p className="text-lg text-gray-600 mb-6">
//               Discover amazing projects built with cutting-edge technology
//             </p>
//             <div className="flex items-center justify-center space-x-4">
//               <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 border border-gray-200">
//                 <span className="font-medium">{projects.length}</span> Projects Available
//               </div>
//               <div className="bg-blue-50/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700 border border-blue-200">
//                 🏆 Premium Quality
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Sidebar - Filters */}
//           <div className="w-80">
//       <div className="bg-gradient-to-br from-yellow-300 via-yellow-200 to-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
//         {/* Shiny overlay effect */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
        
//         {/* Header */}
//         <div className="relative z-10 flex items-center mb-6">
//           <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-black mr-3 relative">
//             <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Poké Filters</h2>
//         </div>

//         {/* Search */}
//         <div className="relative z-10 mb-5">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search projects..."
//               className="w-full p-3 bg-white/80 backdrop-blur-sm border-2 border-yellow-400 rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-300 shadow-inner"
//             />
//             <div className="absolute right-3 top-3 text-yellow-600">🔍</div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="relative z-10 mb-5">
//           <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
//             <span className="mr-2">⚡</span>Categories
//           </h3>
//           <div className="space-y-2 max-h-32 overflow-y-auto">
//             {categories.map(category => (
//               <label key={category} className="flex items-center cursor-pointer group">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(category)}
//                     onChange={() => handleCategoryChange(category)}
//                     className="sr-only"
//                   />
//                   <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
//                     selectedCategories.includes(category)
//                       ? 'bg-yellow-500 border-yellow-600 shadow-inner'
//                       : 'bg-white border-gray-400 group-hover:border-yellow-400'
//                   }`}>
//                     {selectedCategories.includes(category) && (
//                       <div className="text-white text-xs flex items-center justify-center h-full">✓</div>
//                     )}
//                   </div>
//                 </div>
//                 <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
//                   {category}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Technologies */}
//         <div className="relative z-10 mb-5">
//           <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
//             <span className="mr-2">🔧</span>Tech Stack
//           </h3>
//           <div className="space-y-2 max-h-32 overflow-y-auto">
//             {technologies.map(tech => (
//               <label key={tech} className="flex items-center cursor-pointer group">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     checked={selectedTechs.includes(tech)}
//                     onChange={() => handleTechChange(tech)}
//                     className="sr-only"
//                   />
//                   <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
//                     selectedTechs.includes(tech)
//                       ? 'bg-yellow-500 border-yellow-600 shadow-inner'
//                       : 'bg-white border-gray-400 group-hover:border-yellow-400'
//                   }`}>
//                     {selectedTechs.includes(tech) && (
//                       <div className="text-white text-xs flex items-center justify-center h-full">✓</div>
//                     )}
//                   </div>
//                 </div>
//                 <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
//                   {tech}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Price Range Slider */}
//         <div className="relative z-10 mb-6">
//           <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
//             <span className="mr-2">💰</span>Price Range
//           </h3>
//           <div className="px-2">
//             <input
//               type="range"
//               min="0"
//               max="1000"
//               value={priceRange[1]}
//               onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
//               className="w-full h-2 rounded-lg appearance-none cursor-pointer"
//               style={{
//                 background: `linear-gradient(to right, #fef08a 0%, #facc15 ${(priceRange[1]/1000)*100}%, #e5e7eb ${(priceRange[1]/1000)*100}%, #e5e7eb 100%)`,
//                 WebkitAppearance: 'none',
//                 outline: 'none'
//               }}
//             />
//             <div className="flex justify-between text-xs text-gray-600 mt-1">
//               <span>$0</span>
//               <span className="font-semibold text-yellow-700">${priceRange[1]}</span>
//               <span>$1000+</span>
//             </div>
//           </div>
//         </div>

//         {/* Clear Button */}
//         <button
//           onClick={clearFilters}
//           className="relative z-10 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
//         >
//           <div className="w-5 h-5 bg-white rounded-full border border-gray-300 mr-2 relative">
//             <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0.5 left-0.5"></div>
//           </div>
//           Reset Filters
//         </button>

//         {/* Decorative Pokeball corners */}
//         <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-full border border-black opacity-30">
//           <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5"></div>
//         </div>
//         <div className="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full border border-black opacity-20">
//           <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
//         </div>
//       </div>


//     </div>
//           {/* Right Content - Project Cards */}
//           <div className="lg:w-3/4">
//             {/* Results Header */}
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Found {filteredProjects.length} Projects
//               </h2>
//               <div className="flex items-center space-x-4">
//                 <select className="bg-white text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option>Sort by: Featured</option>
//                   <option>Sort by: Price (Low to High)</option>
//                   <option>Sort by: Price (High to Low)</option>
//                   <option>Sort by: Name</option>
//                 </select>
//               </div>
//             </div>

//             {/* Project Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredProjects.map(project => (
//                 <ProjectCard key={project.id} project={project} />
//               ))}
//             </div>

//             {/* No Results */}
//             {filteredProjects.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-8xl mb-4">😕</div>
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
//                 <p className="text-gray-600">Try adjusting your filters or search terms</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .animation-delay-1000 {
//           animation-delay: 1s;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }
// import { useState } from 'react';

// // ChromaGrid Component
// const ChromaGrid = ({ items, radius = 300, damping = 0.45, fadeOut = 0.6, ease = "power3.out" }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
    
//     setMousePosition({
//       x: (e.clientX - centerX) * damping,
//       y: (e.clientY - centerY) * damping
//     });
//   };

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//       style={{
//         background: 'linear-gradient(135deg, #FEF3C7, #FCD34D, #F59E0B)',
//         borderRadius: '20px'
//       }}
//     >
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Grid Items */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="grid grid-cols-3 gap-8 p-8">
//           {items.map((item, index) => {
//             const angle = (index * (360 / items.length)) * (Math.PI / 180);
//             const distance = isHovering ? radius * 0.3 : 0;
            
//             const x = Math.cos(angle) * distance + mousePosition.x * 0.1;
//             const y = Math.sin(angle) * distance + mousePosition.y * 0.1;
            
//             return (
//               <div
//                 key={index}
//                 className="relative group cursor-pointer"
//                 style={{
//                   transform: `translate(${x}px, ${y}px)`,
//                   transition: `transform 0.3s ${ease}`,
//                   opacity: isHovering ? fadeOut + 0.4 : 1
//                 }}
//               >
//                 <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
//                   <div 
//                     className="absolute inset-0"
//                     style={{ background: item.gradient }}
//                   />
//                   <div className="absolute inset-1 bg-gray-900 rounded-xl flex items-center justify-center">
//                     <div className="text-4xl">{item.icon}</div>
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 text-center">
//                     <div className="text-xs font-semibold">{item.title}</div>
//                     <div className="text-xs opacity-80">{item.subtitle}</div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Central Pokemon Logo */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="text-6xl animate-bounce">⚡</div>
//       </div>
//     </div>
//   );
// };

// // Project Card Component
// const ProjectCard = ({ project }) => {
//   return (
//     <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
//       {/* Subtle Border Animation */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
      
//       <div className="relative">
//         {/* Project Image */}
//         <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl mb-4 overflow-hidden relative border border-yellow-200">
//           <div className="absolute inset-0 bg-white/10"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-6xl text-gray-700">{project.icon}</div>
//           </div>
//           {/* Price Badge */}
//           <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
//             ${project.price}
//           </div>
//           {/* Featured Badge */}
//           {project.featured && (
//             <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//               ⭐ Featured
//             </div>
//           )}
//         </div>

//         {/* Project Info */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-medium text-gray-600 bg-yellow-100 px-3 py-1 rounded-full">
//               {project.category}
//             </span>
//             <div className="flex items-center space-x-1">
//               <span className="text-yellow-500">⚡</span>
//               <span className="text-sm text-gray-600">{project.tech}</span>
//             </div>
//           </div>

//           <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
//             {project.title}
//           </h3>

//           <p className="text-gray-600 text-sm line-clamp-2">
//             {project.description}
//           </p>

//           {/* Features */}
//           <div className="flex flex-wrap gap-1">
//             {project.features.map((feature, index) => (
//               <span key={index} className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
//                 {feature}
//               </span>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-2 pt-2">
//             <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
//               🛒 Cart
//             </button>
//             <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200">
//               👁️ Preview
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Shop Component
// export default function PokemonShop() {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedTech, setSelectedTech] = useState('All');
//   const [priceRange, setPriceRange] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Pokemon-themed ChromaGrid items
//   const pokemonItems = [
//     {
//       icon: "🔴",
//       title: "Pokeball",
//       subtitle: "Classic",
//       gradient: "linear-gradient(145deg, #FCD34D, #EF4444)",
//       borderColor: "#EF4444"
//     },
//     {
//       icon: "🔵",
//       title: "Great Ball",
//       subtitle: "Enhanced",
//       gradient: "linear-gradient(145deg, #FCD34D, #3B82F6)",
//       borderColor: "#3B82F6"
//     },
//     {
//       icon: "⚫",
//       title: "Ultra Ball",
//       subtitle: "Premium",
//       gradient: "linear-gradient(145deg, #FCD34D, #1F2937)",
//       borderColor: "#1F2937"
//     },
//     {
//       icon: "🟡",
//       title: "Master Ball",
//       subtitle: "Legendary",
//       gradient: "linear-gradient(145deg, #FCD34D, #8B5CF6)",
//       borderColor: "#8B5CF6"
//     },
//     {
//       icon: "⚡",
//       title: "Thunder Stone",
//       subtitle: "Electric",
//       gradient: "linear-gradient(145deg, #FCD34D, #F59E0B)",
//       borderColor: "#F59E0B"
//     },
//     {
//       icon: "🔥",
//       title: "Fire Stone",
//       subtitle: "Fire Type",
//       gradient: "linear-gradient(145deg, #FCD34D, #DC2626)",
//       borderColor: "#DC2626"
//     },
//     {
//       icon: "💧",
//       title: "Water Stone",
//       subtitle: "Water Type",
//       gradient: "linear-gradient(145deg, #FCD34D, #0EA5E9)",
//       borderColor: "#0EA5E9"
//     },
//     {
//       icon: "🍃",
//       title: "Leaf Stone",
//       subtitle: "Grass Type",
//       gradient: "linear-gradient(145deg, #FCD34D, #059669)",
//       borderColor: "#059669"
//     },
//     {
//       icon: "🌙",
//       title: "Moon Stone",
//       subtitle: "Rare Item",
//       gradient: "linear-gradient(145deg, #FCD34D, #6366F1)",
//       borderColor: "#6366F1"
//     }
//   ];

//   // Projects Data
//   const projects = [
//     {
//       id: 1,
//       title: "Pokemon Battle Arena",
//       description: "Full-stack battle system with real-time multiplayer functionality and stunning animations.",
//       price: 299,
//       category: "Full Stack",
//       tech: "React",
//       icon: "⚔️",
//       featured: true,
//       features: ["Real-time", "Multiplayer", "Animations"]
//     },
//     {
//       id: 2,
//       title: "Pokedex Mobile App",
//       description: "Beautiful mobile app with Pokemon data, search functionality, and offline support.",
//       price: 199,
//       category: "Mobile",
//       tech: "React Native",
//       icon: "📱",
//       featured: false,
//       features: ["Offline", "Search", "Responsive"]
//     },
//     {
//       id: 3,
//       title: "Trading Card Game",
//       description: "Complete trading card game with deck builder, battle system, and card marketplace.",
//       price: 399,
//       category: "Game",
//       tech: "Vue.js",
//       icon: "🃏",
//       featured: true,
//       features: ["Marketplace", "Battle", "Deck Builder"]
//     },
//     {
//       id: 4,
//       title: "Pokemon Dashboard",
//       description: "Admin dashboard for managing Pokemon data with analytics and user management.",
//       price: 149,
//       category: "Dashboard",
//       tech: "Next.js",
//       icon: "📊",
//       featured: false,
//       features: ["Analytics", "Admin", "Charts"]
//     },
//     {
//       id: 5,
//       title: "Pokemon Chat Bot",
//       description: "AI-powered chatbot that can answer questions about Pokemon and provide recommendations.",
//       price: 249,
//       category: "AI/ML",
//       tech: "Python",
//       icon: "🤖",
//       featured: false,
//       features: ["AI", "Chat", "Recommendations"]
//     },
//     {
//       id: 6,
//       title: "Pokemon E-commerce",
//       description: "Complete e-commerce platform for Pokemon merchandise with payment integration.",
//       price: 499,
//       category: "E-commerce",
//       tech: "React",
//       icon: "🛍️",
//       featured: true,
//       features: ["Payment", "Cart", "Inventory"]
//     }
//   ];

//   const categories = ['All', 'Full Stack', 'Mobile', 'Game', 'Dashboard', 'AI/ML', 'E-commerce'];
//   const technologies = ['All', 'React', 'Vue.js', 'Next.js', 'React Native', 'Python'];
//   const priceRanges = ['All', 'Under $200', '$200-$300', 'Over $300'];

//   // Filter projects
//   const filteredProjects = projects.filter(project => {
//     const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
//     const matchesTech = selectedTech === 'All' || project.tech === selectedTech;
//     const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
//     let matchesPrice = true;
//     if (priceRange === 'Under $200') matchesPrice = project.price < 200;
//     else if (priceRange === '$200-$300') matchesPrice = project.price >= 200 && project.price <= 300;
//     else if (priceRange === 'Over $300') matchesPrice = project.price > 300;

//     return matchesCategory && matchesTech && matchesPrice && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
//       {/* Top Banner with ChromaGrid */}
//       <div className="relative h-96 bg-white border-b border-yellow-200 overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0">
//           <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
//           <div className="absolute top-20 right-20 w-60 h-60 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
//           <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
//         </div>

//         {/* Banner Content */}
//         <div className="relative z-10 h-full">
//           <div className="flex items-center justify-center pt-8 mb-4">
//             <div className="text-4xl mr-3 text-yellow-500">⚡</div>
//             <h1 className="text-4xl font-bold text-gray-800">
//               Pokemon <span className="text-yellow-600">Projects</span> Shop
//             </h1>
//             <div className="text-4xl ml-3 text-red-500">🔥</div>
//           </div>
//           <p className="text-center text-lg text-gray-600 mb-6">
//             Discover amazing Pokemon-themed projects with interactive features
//           </p>
          
//           {/* ChromaGrid Integration */}
//           <div style={{ height: '200px', position: 'relative', margin: '0 auto', maxWidth: '800px' }}>
//             <ChromaGrid 
//               items={pokemonItems}
//               radius={150}
//               damping={0.45}
//               fadeOut={0.6}
//               ease="power3.out"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Sidebar - Filters */}
//           <div className="lg:w-1/4">
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200 sticky top-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <span className="mr-2">🔍</span>
//                 Filters
//               </h2>

//               {/* Search */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search projects..."
//                   className="w-full p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
//                 <div className="space-y-2">
//                   {categories.map(category => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
//                         selectedCategory === category
//                           ? 'bg-yellow-400 text-gray-900 shadow-md font-medium'
//                           : 'bg-yellow-50 text-gray-700 hover:bg-yellow-100'
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Technology Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Technology</label>
//                 <div className="space-y-2">
//                   {technologies.map(tech => (
//                     <button
//                       key={tech}
//                       onClick={() => setSelectedTech(tech)}
//                       className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
//                         selectedTech === tech
//                           ? 'bg-yellow-400 text-gray-900 shadow-md font-medium'
//                           : 'bg-yellow-50 text-gray-700 hover:bg-yellow-100'
//                       }`}
//                     >
//                       {tech}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
//                 <div className="space-y-2">
//                   {priceRanges.map(range => (
//                     <button
//                       key={range}
//                       onClick={() => setPriceRange(range)}
//                       className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
//                         priceRange === range
//                           ? 'bg-yellow-400 text-gray-900 shadow-md font-medium'
//                           : 'bg-yellow-50 text-gray-700 hover:bg-yellow-100'
//                       }`}
//                     >
//                       {range}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Clear Filters */}
//               <button
//                 onClick={() => {
//                   setSelectedCategory('All');
//                   setSelectedTech('All');
//                   setPriceRange('All');
//                   setSearchTerm('');
//                 }}
//                 className="w-full bg-yellow-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-yellow-200 transition-all duration-200"
//               >
//                 🔄 Clear All Filters
//               </button>
//             </div>
//           </div>

//           {/* Right Content - Project Cards */}
//           <div className="lg:w-3/4">
//             {/* Results Header */}
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Found {filteredProjects.length} Projects
//               </h2>
//               <div className="flex items-center space-x-4">
//                 <select className="bg-white text-gray-700 font-medium px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
//                   <option>Sort by: Featured</option>
//                   <option>Sort by: Price (Low to High)</option>
//                   <option>Sort by: Price (High to Low)</option>
//                   <option>Sort by: Name</option>
//                 </select>
//               </div>
//             </div>

//             {/* Project Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredProjects.map(project => (
//                 <ProjectCard key={project.id} project={project} />
//               ))}
//             </div>

//             {/* No Results */}
//             {filteredProjects.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-8xl mb-4">😕</div>
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
//                 <p className="text-gray-600">Try adjusting your filters or search terms</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// }