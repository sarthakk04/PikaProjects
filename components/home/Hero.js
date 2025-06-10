
"use client";
import React from 'react';
import DotGrid from './DotGrid';
import Image from 'next/image';
import 'animate.css';
import { useState } from "react";
import Head from 'next/head';
import NewlyAdded from './NewlyAdded';

  
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
     
      <NewlyAdded/>

      {/* Buy/Sell Section */}
<div className="relative h-96 max-w-full mx-auto overflow-hidden">
  <img 
    src="/assets/BuySellBg.png"
    alt="Background"
    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full object-cover object-center z-0"
  />

  <div className="relative z-10 flex h-full max-w-[1000px] mx-auto gap-x-12 px-4">
    <div className="w-1/2 flex items-center justify-center">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-400">Buy</h2>
    </div>
    <div className="w-1/2 flex items-center justify-center">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black">Sell</h2>
    </div>
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
