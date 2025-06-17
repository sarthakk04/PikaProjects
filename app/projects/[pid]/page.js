// app/projects/[pid]/page.js

import { notFound } from 'next/navigation';
import Navbar from "../../../components/Navi";

async function getProjectDetails(pid) {
  const res = await fetch(`http://localhost:3000/api/projects/${pid}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProjectDetails({ params }) {
  const { pid } = params;
  const data = await getProjectDetails(pid);

  if (!data || data.status !== 'success') {
    return notFound();
  }

  const project = data.project;
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Project Image */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                    <div className="text-6xl text-gray-400">🖼️</div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {category}
                  </span>
                  <div className="text-2xl font-bold text-gray-900">
                    ${price}
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-600">{description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {techstack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Contact Developer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span className="text-gray-600">Responsive Design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span className="text-gray-600">Cross-browser Compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    <span className="text-gray-600">SEO Optimized</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-600">Modern Web Browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600">Node.js (for development)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}