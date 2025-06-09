
"use client";
import React from 'react';
import DotGrid from './DotGrid';
import Image from 'next/image';
import 'animate.css';
import { useState } from "react";
import Head from 'next/head';


  
const Hero = () => {
const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    // Reset animation so it can run again
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };
  return (
    <>
    <div className="relative w-full h-[400px] overflow-hidden bg-black text-white">
      {/* Background dots */}
      <div style={{ width: '100%', height: '400px', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={2}
          gap={73}
          baseColor="#EEFF00"
          activeColor="#FA0000"
          proximity={500}
          shockRadius={360}
          shockStrength={20}
          resistance={500}
          returnDuration={2.6}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-10">
        {/* Left Image (fit height) */}
          <div className="relative h-[600px] w-[460px]">
          <Image
            src="/assets/left-image.png"
            alt="Left Icon"
            fill
          />
        </div>

        {/* Center Text */}
        <div className="text-center -ml-20 z-10">
          <h1 className="text-5xl font-bold z-6" style={{ fontFamily: 'pikachuBold' }}>Welcome to PikaProjects</h1>
          <p className="text-lg mt-4" style={{ fontFamily: 'pikachuNormal' }}>Claim your project now..!</p>
        </div>

        {/* Right Image (fit height) */}
       
  <div
      className={`relative h-full w-[360px] mt-44 ${
        isAnimating ? "animate__animated animate__bounceInUp" : ""
      }`}
      onMouseEnter={handleMouseEnter}
    >
      <Image src="/assets/pikachu.png" alt="Pikachu" fill />
    </div>

      </div>
    </div>

    {/* // next section */}

<div className="min-h-screen bg-[#E5FFFE]">
      <Head>
        <title>Pokemon Cards Section</title>
        <style>{`
          .parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
        `}</style>
      </Head>

      {/* Arrow pointing down */}
      <div className="flex justify-center py-4">
        <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Newly Added Header */}
      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-black">Newly Added</h2>
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Cards Section with Parallax Background */}
      <div className="parallax min-h-16 py-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Card 1 */}
            <div className="bg-yellow-400 border-4 border-black rounded-lg p-4 w-64 shadow-lg">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mb-2">Hotel Management</div>
              <div className="bg-yellow-300 text-black px-2 py-1 rounded text-xs font-bold mb-2 inline-block">NEW</div>
              
              {/* Card Image Area */}
              <div className="bg-white rounded p-4 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold mb-2">Hotel Booking Management</div>
                  <div className="bg-gray-200 h-16 rounded mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Hotel Image</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black"></div>
                  <span className="text-sm font-bold">#webDevelopment</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <span className="text-yellow-600 text-lg">★</span>
                  <span className="text-xs ml-1">MERIT STACK</span>
                </div>
              </div>
              
              <div className="text-right mt-2">
                <span className="text-sm font-bold">300 INR</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-yellow-400 border-4 border-black rounded-lg p-4 w-64 shadow-lg">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mb-2">Hotel Management</div>
              <div className="bg-yellow-300 text-black px-2 py-1 rounded text-xs font-bold mb-2 inline-block">NEW</div>
              
              {/* Card Image Area */}
              <div className="bg-white rounded p-4 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold mb-2">Hotel Booking Management</div>
                  <div className="bg-gray-200 h-16 rounded mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Hotel Image</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black"></div>
                  <span className="text-sm font-bold">#webDevelopment</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <span className="text-yellow-600 text-lg">★</span>
                  <span className="text-xs ml-1">MERIT STACK</span>
                </div>
              </div>
              
              <div className="text-right mt-2">
                <span className="text-sm font-bold">300 INR</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-yellow-400 border-4 border-black rounded-lg p-4 w-64 shadow-lg">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mb-2">Hotel Management</div>
              <div className="bg-yellow-300 text-black px-2 py-1 rounded text-xs font-bold mb-2 inline-block">NEW</div>
              
              {/* Card Image Area */}
              <div className="bg-white rounded p-4 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold mb-2">Hotel Booking Management</div>
                  <div className="bg-gray-200 h-16 rounded mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Hotel Image</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black"></div>
                  <span className="text-sm font-bold">#webDevelopment</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <span className="text-yellow-600 text-lg">★</span>
                  <span className="text-xs ml-1">MERIT STACK</span>
                </div>
              </div>
              
              <div className="text-right mt-2">
                <span className="text-sm font-bold">300 INR</span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Buy/Sell Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Pokemon Characters" 
          className="w-full h-full object-cover"
        />
        
        {/* Red overlay for Buy */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-red-500 bg-opacity-80 flex items-center justify-center">
          <h2 className="text-6xl font-bold text-yellow-300">Buy</h2>
        </div>
        
        {/* Yellow overlay for Sell */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400 bg-opacity-80 flex items-center justify-center">
          <h2 className="text-6xl font-bold text-black">Sell</h2>
        </div>
      </div>

      {/* Bottom Pokemon Characters Section */}
      <div 
        className="relative h-64" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-between px-8 pb-4">
            {/* Web Development */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🐷</span>
              </div>
              <div className="bg-green-400 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-black">WebDevelopment</span>
              </div>
            </div>
            
            {/* AI/ML */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🦎</span>
              </div>
              <div className="bg-yellow-400 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-black">AI/ML</span>
              </div>
            </div>
            
            {/* Third Category */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🦊</span>
              </div>
              <div className="bg-yellow-400 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-black">Category</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default Hero;
