/* eslint-disable */

/* eslint-disable */
/* eslint-disable */

"use client";

import { useState, useEffect } from 'react';
import Navbar from './Navi';
import Image from 'next/image';

// Project Card Component
const ProjectCard = ({ project }) => {
  // Extract fields from the project data structure
  const {
    p_name: title = 'Untitled Project',
    p_category: category = 'General',
    p_info = {},
    p_price: price = '0'
  } = project;

  const { 
    Desc: description = 'No description available',
    techstack = [],
    media = {}
  } = p_info;

  const { image: imageUrl } = media;

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      {/* Subtle Border Animation */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
      
      <div className="relative">
        {/* Project Image */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden relative border border-gray-200">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-gray-600">🖼️</div>
            </div>
          )}
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${price}
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {category}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-blue-500">⚡</span>
              <span className="text-sm text-gray-600">
                {techstack.slice(0, 2).join(', ')}
                {techstack.length > 2 && '...'}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
            {title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {techstack.map((tech, index) => (
              <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shop Component
export default function PokemonShop() {
  // State variables
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [isClient, setIsClient] = useState(false);
 
  const categories = ['Web Apps', 'Mobile Apps', 'Games', 'AI/ML', 'E-commerce', 'Artificial Intelligence'];
  const technologies = ['React', 'Node.js', 'Python', 'Flutter', 'Unity', 'TensorFlow', 'PyTorch', 'NLP'];

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Invalid response format: ${text.substring(0, 100)}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        if (data.status !== 'success') {
          throw new Error(data.message || 'API returned unsuccessful status');
        }

        // Fixed: API returns data.data instead of data.projects
        setProjects(data.data || []);
        setNotification('Projects loaded successfully');
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter handlers
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
    setPriceRange([0, 5000]);
    setSearchTerm('');
  };

  // Filter logic - Fixed to work with the actual data structure
  const filteredProjects = projects.filter(project => {
    // Convert price to number for comparison
    const price = Number(project.p_price) || 0;
    
    const matchesSearch = 
      project.p_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.p_info?.Desc?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      (project.p_category && selectedCategories.includes(project.p_category));
    
    // Fixed: Check techstack inside p_info
    const projectTechstack = project.p_info?.techstack || [];
    const matchesTech = 
      selectedTechs.length === 0 || 
      projectTechstack.some(tech => selectedTechs.includes(tech));
    
    const matchesPrice = 
      price >= priceRange[0] && price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesTech && matchesPrice;
  });

  // Close notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Poké projects...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error loading projects</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
            {notification}
          </div>
        )}

        {/* Top Banner */}
        <div className="relative h-64 bg-white border-b border-gray-200 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            <div className="absolute top-20 right-20 w-60 h-60 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
            <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          </div>

          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <Image src="/assets/Shopbk.jpg" alt="Shop Background" height={300} width={1800} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <div className="w-full lg:w-80">
              <div className="bg-gradient-to-br from-yellow-300 via-yellow-200 to-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
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

                {/* Technologies filter */}
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

                {/* Price Range */}
                <div className="relative z-10 mb-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">💰</span>Price Range
                  </h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #fef08a 0%, #facc15 ${(priceRange[1]/5000)*100}%, #e5e7eb ${(priceRange[1]/5000)*100}%, #e5e7eb 100%)`,
                        WebkitAppearance: 'none',
                        outline: 'none'
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>$0</span>
                      <span className="font-semibold text-yellow-700">${priceRange[1]}</span>
                      <span>$5000+</span>
                    </div>
                  </div>
                </div>

                {/* Clear Button */}
                <button
                  onClick={clearFilters}
                  className="relative z-10 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Right Content - Project Cards */}
            <div className="flex-1">
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
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                  />
                ))}
              </div>

              {/* No Results */}
              {filteredProjects.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="text-8xl mb-4">😕</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                  <button 
                    onClick={clearFilters}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg"
                  >
                    Clear All Filters
                  </button>
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

// import { useState, useEffect } from 'react';
// import Navbar from './Navi';
// import Image from 'next/image';

// // Project Card Component
// const ProjectCard = ({ project }) => {
//   // Extract fields from the project data structure
//   const {
//     p_name: title = 'Untitled Project',
//     p_category: category = 'General',
//     p_info = {},
//     p_price: price = '0'
//   } = project;

//   const { 
//     Desc: description = 'No description available',
//     techstack = [],
//     media = {}
//   } = p_info;

//   const { image: imageUrl } = media;

//   return (
//     <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
//       {/* Subtle Border Animation */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
      
//       <div className="relative">
//         {/* Project Image */}
//         <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden relative border border-gray-200">
//           {imageUrl ? (
//             <Image 
//               src={imageUrl} 
//               alt={title}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-6xl text-gray-600">🖼️</div>
//             </div>
//           )}
//           {/* Price Badge */}
//           <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
//             ${price}
//           </div>
//         </div>

//         {/* Project Info */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//               {category}
//             </span>
//             <div className="flex items-center space-x-1">
//               <span className="text-blue-500">⚡</span>
//               <span className="text-sm text-gray-600">
//                 {techstack.slice(0, 2).join(', ')}
//                 {techstack.length > 2 && '...'}
//               </span>
//             </div>
//           </div>

//           <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
//             {title}
//           </h3>

//           <p className="text-gray-600 text-sm line-clamp-2">
//             {description}
//           </p>

//           {/* Tech Stack */}
//           <div className="flex flex-wrap gap-1">
//             {techstack.map((tech, index) => (
//               <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Shop Component
// export default function PokemonShop() {
//   // State variables
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTechs, setSelectedTechs] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [notification, setNotification] = useState(null);
 
//   const categories = ['Web Apps', 'Mobile Apps', 'Games', 'AI/ML', 'E-commerce', 'Artificial Intelligence'];
//   const technologies = ['React', 'Node.js', 'Python', 'Flutter', 'Unity', 'TensorFlow', 'PyTorch', 'NLP'];

//   // Fetch projects from API
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('/api/projects', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         // Check if response is JSON
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           const text = await response.text();
//           throw new Error(`Invalid response format: ${text.substring(0, 100)}`);
//         }

//         const data = await response.json();
//         console.log('Fetched data:', data);
        
//         if (!response.ok) {
//           throw new Error(data.message || `HTTP error! status: ${response.status}`);
//         }

//         if (data.status !== 'success') {
//           throw new Error(data.message || 'API returned unsuccessful status');
//         }

//         setProjects(data.data || []);
//         setNotification('Projects loaded successfully');
//       } catch (err) {
//         setError(err.message);
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Filter handlers
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

//   // Filter logic - Fixed to work with the actual data structure
//   const filteredProjects = projects.filter(project => {
//     // Convert price to number for comparison
//     const price = Number(project.p_price) || 0;
    
//     const matchesSearch = 
//       project.p_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.p_info?.Desc?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesCategory = 
//       selectedCategories.length === 0 || 
//       (project.p_category && selectedCategories.includes(project.p_category));
    
//     // Fixed: Check techstack inside p_info
//     const projectTechstack = project.p_info?.techstack || [];
//     const matchesTech = 
//       selectedTechs.length === 0 || 
//       projectTechstack.some(tech => selectedTechs.includes(tech));
    
//     const matchesPrice = 
//       price >= priceRange[0] && price <= priceRange[1];

//     // Debug logging
//     console.log('Filtering project:', {
//       project: project.p_name,
//       price,
//       priceRange,
//       matchesSearch,
//       matchesCategory,
//       matchesTech,
//       matchesPrice,
//       selectedCategories,
//       selectedTechs,
//       searchTerm,
//       projectCategory: project.p_category,
//       projectTechstack
//     });

//     return matchesSearch && matchesCategory && matchesTech && matchesPrice;
//   });

//   // Close notification after 3 seconds
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading Poké projects...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
//             <div className="text-4xl mb-3">⚠️</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Error loading projects</h3>
//             <p className="text-gray-600 mb-4">{error}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar/>
//       <div className="min-h-screen bg-gray-50">
//         {/* Notification */}
//         {notification && (
//           <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
//             {notification}
//           </div>
//         )}

//         {/* Top Banner */}
//         <div className="relative h-64 bg-white border-b border-gray-200 overflow-hidden">
//           <div className="absolute inset-0">
//             <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
//             <div className="absolute top-20 right-20 w-60 h-60 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
//             <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
//           </div>

//           <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
//             {/* <Image src="/assets/Shopbk.jpg" alt="Shop Background" height={300} width={1800} /> */}
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Left Sidebar - Filters */}
//             <div className="w-full lg:w-80">
//               <div className="bg-gradient-to-br from-yellow-300 via-yellow-200 to-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
//                 {/* Header */}
//                 <div className="relative z-10 flex items-center mb-6">
//                   <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-black mr-3 relative">
//                     <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div>
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">Poké Filters</h2>
//                 </div>

//                 {/* Search */}
//                 <div className="relative z-10 mb-5">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       placeholder="Search projects..."
//                       className="w-full p-3 bg-white/80 backdrop-blur-sm border-2 border-yellow-400 rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-300 shadow-inner"
//                     />
//                     <div className="absolute right-3 top-3 text-yellow-600">🔍</div>
//                   </div>
//                 </div>

//                 {/* Categories */}
//                 <div className="relative z-10 mb-5">
//                   <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
//                     <span className="mr-2">⚡</span>Categories
//                   </h3>
//                   <div className="space-y-2 max-h-32 overflow-y-auto">
//                     {categories.map(category => (
//                       <label key={category} className="flex items-center cursor-pointer group">
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             checked={selectedCategories.includes(category)}
//                             onChange={() => handleCategoryChange(category)}
//                             className="sr-only"
//                           />
//                           <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
//                             selectedCategories.includes(category)
//                               ? 'bg-yellow-500 border-yellow-600 shadow-inner'
//                               : 'bg-white border-gray-400 group-hover:border-yellow-400'
//                           }`}>
//                             {selectedCategories.includes(category) && (
//                               <div className="text-white text-xs flex items-center justify-center h-full">✓</div>
//                             )}
//                           </div>
//                         </div>
//                         <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
//                           {category}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Technologies filter */}
//                 <div className="relative z-10 mb-5">
//                   <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
//                     <span className="mr-2">🔧</span>Tech Stack
//                   </h3>
//                   <div className="space-y-2 max-h-32 overflow-y-auto">
//                     {technologies.map(tech => (
//                       <label key={tech} className="flex items-center cursor-pointer group">
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             checked={selectedTechs.includes(tech)}
//                             onChange={() => handleTechChange(tech)}
//                             className="sr-only"
//                           />
//                           <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
//                             selectedTechs.includes(tech)
//                               ? 'bg-yellow-500 border-yellow-600 shadow-inner'
//                               : 'bg-white border-gray-400 group-hover:border-yellow-400'
//                           }`}>
//                             {selectedTechs.includes(tech) && (
//                               <div className="text-white text-xs flex items-center justify-center h-full">✓</div>
//                             )}
//                           </div>
//                         </div>
//                         <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
//                           {tech}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Range */}
//                 <div className="relative z-10 mb-6">
//                   <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
//                     <span className="mr-2">💰</span>Price Range
//                   </h3>
//                   <div className="px-2">
//                     <input
//                       type="range"
//                       min="0"
//                       max="1000"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
//                       className="w-full h-2 rounded-lg appearance-none cursor-pointer"
//                       style={{
//                         background: `linear-gradient(to right, #fef08a 0%, #facc15 ${(priceRange[1]/1000)*100}%, #e5e7eb ${(priceRange[1]/1000)*100}%, #e5e7eb 100%)`,
//                         WebkitAppearance: 'none',
//                         outline: 'none'
//                       }}
//                     />
//                     <div className="flex justify-between text-xs text-gray-600 mt-1">
//                       <span>$0</span>
//                       <span className="font-semibold text-yellow-700">${priceRange[1]}</span>
//                       <span>$1000+</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Clear Button */}
//                 <button
//                   onClick={clearFilters}
//                   className="relative z-10 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>

//             {/* Right Content - Project Cards */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Found {filteredProjects.length} Projects
//                 </h2>
//                 <div className="flex items-center space-x-4">
//                   <select className="bg-white text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500">
//                     <option>Sort by: Featured</option>
//                     <option>Sort by: Price (Low to High)</option>
//                     <option>Sort by: Price (High to Low)</option>
//                     <option>Sort by: Name</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Project Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredProjects.map(project => (
//                   <ProjectCard 
//                     key={project.id} 
//                     project={project}
//                   />
//                 ))}
//               </div>

//               {/* No Results */}
//               {filteredProjects.length === 0 && !loading && (
//                 <div className="text-center py-12">
//                   <div className="text-8xl mb-4">😕</div>
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
//                   <p className="text-gray-600">Try adjusting your filters or search terms</p>
//                   <button 
//                     onClick={clearFilters}
//                     className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
