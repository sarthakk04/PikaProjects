"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw } from 'lucide-react';
import Navi from './Navi';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data
  const product = {
    id: 1,
    name: "Hotel Management in NOSQL",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    stockCount: 15,
    images: [
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500"
    ],
    variants: ['Standard', 'Large', 'Extra Large'],
    description: "Authentic Pikachu plush toy crafted with premium materials. Perfect for collectors and Pokemon enthusiasts of all ages.",
    features: [
      "Premium soft fabric construction",
      "Officially licensed Pokemon merchandise",
      "Safe for children 3+ years",
      "Machine washable",
      "Collectible quality"
    ],
    specifications: {
      "Domain": "Web Development",
      "FrontEnd": "Next js , Tailwind CSS",
      "Backend": "MOngoDB",
      "Certificated/Prices ": "NAN",
    //   "Brand": "Pokemon Official"
    }
  };

  const Pokeball = () => (
    <div className="w-6 h-6 relative">
      <div className="w-6 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-600 relative overflow-hidden">
        <div className="absolute bottom-0 w-full h-3 bg-white"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border-2 border-gray-800"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800"></div>
      </div>
    </div>
  );

  return (
    <>
   <Navi/>
    <div className="min-h-screen bg-gradient-to-b from-[#B5F6FF] to-yellow-200">
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
              <div className="aspect-square relative mb-4 bg-yellow-50 rounded-xl overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart 
                    className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                  />
                </button>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-yellow-400 ring-2 ring-yellow-200' 
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Product ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Pokeball />
                <span className="text-sm text-gray-600 font-medium "  style={{ fontFamily: 'pikachuBold' }}>PikaProjects Official</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-red-600">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  25% OFF
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">In Stock</span>
                    {/* <span className="text-gray-600">({product.stockCount} available)</span> */}
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Variants */}
              {/* <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Size:</h3>
                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedVariant === variant
                          ? 'border-yellow-400 bg-yellow-50 text-yellow-800'
                          : 'border-gray-200 hover:border-yellow-300 text-gray-700'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Quantity */}
              {/* <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Quantity:</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x-2 border-gray-200 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-yellow-600" />
              SetUp Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full text-black"></div>
                  <span className='text-red-300'>Works on windows and MAC OS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className='text-red-300'>Compatible across all browsers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className='text-red-300'>Not for Linux </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Pokeball />
                  Product Description
                </h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="border-t border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Guarantee</h4>
                  <p className="text-sm text-gray-600">100% authentic project</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Free Guidance Throughout</h4>
                  <p className="text-sm text-gray-600">All device friendly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">No return policy</h4>
                  <p className="text-sm text-gray-600">No returns accepted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </>
  );
};

export default ProductDetails;