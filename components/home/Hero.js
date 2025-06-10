
"use client";
import React, { useState, useRef, useEffect } from 'react';
import DotGrid from './DotGrid';
import Image from 'next/image';
import 'animate.css';
import Head from 'next/head';
import NewlyAdded from './NewlyAdded';
import Navbar from '../Navi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// GLTF/GLB Model Component
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Pokeball3D({ mousePosition }) {
  const meshRef = useRef();
  const scale = 2; 
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mousePosition.x * 0.2;
      meshRef.current.rotation.x = mousePosition.y * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]}>
      <Model url="/models/pokeball.glb" />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

const Hero = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const faqs = [
    {
      id: 1,
      question: "What is Pokémon GO?",
      answer: "Pokémon GO is a mobile game that uses augmented reality to let you catch Pokémon in the real world using your phone's camera and GPS."
    },
    {
      id: 2,
      question: "How do I catch Pokémon?",
      answer: "When you encounter a Pokémon, tap on it, then flick Poké Balls at it by swiping up on your screen. Aim for the colored circle to increase your chances of success."
    },
    {
      id: 3,
      question: "What are PokéStops?",
      answer: "PokéStops are real-world locations where you can collect items like Poké Balls, potions, and eggs. They're usually located at interesting places like monuments, art installations, and historical markers."
    },
    {
      id: 4,
      question: "How do I evolve my Pokémon?",
      answer: "You can evolve Pokémon by collecting enough candies specific to that Pokémon species. Tap on the Pokémon and look for the 'Evolve' button if you have enough candies."
    },
    {
      id: 5,
      question: "What are Gyms?",
      answer: "Gyms are locations where you can battle other trainers' Pokémon. You can also leave your own Pokémon to defend a Gym for your team."
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;
        
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleMouseEnter = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-yellow text-white">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }} className='bg-yellow'>
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
            className='bg-yellow'
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 md:px-10">
          <div className="text-center md:text-left z-10 mt-8 md:mt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold z-6" style={{ fontFamily: 'pikachuBold' }}>
              Welcome to PikaProjects
            </h1>
            <p className="text-base md:text-lg mt-2 md:mt-4" style={{ fontFamily: 'pikachuNormal' }}>
              Claim your project now..!
            </p>
          </div>

          <div
            className={`relative h-48 w-48 md:h-[360px] md:w-[360px] mt-4 md:mt-44 ${
              isAnimating ? "animate__animated animate__bounceInUp" : ""
            }`}
            onMouseEnter={handleMouseEnter}
          >
            <Image 
              src="/assets/pikachu.png" 
              alt="Pikachu" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      </div>

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

        <div className="flex justify-center py-4">
          <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <NewlyAdded />

        <div className="relative h-64 sm:h-80 md:h-96 max-w-full mx-auto overflow-hidden">
          <img 
            src="/assets/BuySellBg.png"
            alt="Background"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full object-cover object-center z-0"
          />

          <div className="relative z-10 flex h-full max-w-[1000px] mx-auto gap-x-4 sm:gap-x-8 md:gap-x-12 px-4">
            <div className="w-1/2 flex items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400">Buy</h2>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">Sell</h2>
            </div>
          </div>
        </div>

        {/* <div 
          className="relative h-48 sm:h-56 md:h-64" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex justify-between px-4 sm:px-6 md:px-8 pb-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pink-300 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <span className="text-xl sm:text-2xl">🐷</span>
                </div>
                <div className="bg-green-400 px-2 py-1 sm:px-3 rounded-full">
                  <span className="text-xs font-bold text-black">WebDevelopment</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-400 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <span className="text-xl sm:text-2xl">🦎</span>
                </div>
                <div className="bg-yellow-400 px-2 py-1 sm:px-3 rounded-full">
                  <span className="text-xs font-bold text-black">AI/ML</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-300 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <span className="text-xl sm:text-2xl">🦊</span>
                </div>
                <div className="bg-yellow-400 px-2 py-1 sm:px-3 rounded-full">
                  <span className="text-xs font-bold text-black">Category</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* FAQ section */}
        <div className="min-h-[70vh] bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Left side - GLB Pokéball */}
              {!isMobile && (
                <div className="flex justify-center items-center h-[300px] w-full lg:w-1/2" ref={containerRef}>
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Pokeball3D mousePosition={mousePosition} />
                    <OrbitControls enableZoom={false} />
                  </Canvas>
                </div>
              )}

              {/* Right side - FAQ Section */}
              <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
                <div className="text-center lg:text-left mb-6 sm:mb-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">FAQ's</h1>
                  <p className="text-lg sm:text-xl text-gray-700">Everything you need to know about Pokémon</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-4 py-3 sm:px-6 sm:py-4 text-left flex justify-between items-center bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
                      >
                        <span className="font-semibold text-sm sm:text-base md:text-lg">{faq.question}</span>
                        <div className="transition-transform duration-300">
                          {openFAQ === faq.id ? (
                            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                          ) : (
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                          )}
                        </div>
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-4 sm:p-6 text-gray-700 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
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