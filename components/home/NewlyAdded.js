

import React, { useEffect } from 'react';

// Cards data array with Pokemon-themed projects
const cardsData = [
  {
    id: 1,
    category: "PokeMart System",
    title: "Pokemon Shop Management",
    iconColor: "bg-red-500",
    iconLabel: "PokeMart",
    tag: "#pokemon",
    price: "500 PokeCoins",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png" // Snorlax
  },
  {
    id: 2,
    category: "PokeCenter CRM",
    title: "Pokemon Healing System",
    iconColor: "bg-pink-500",
    iconLabel: "PokeCenter",
    tag: "#pokemon",
    price: "400 PokeCoins",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png" // Chansey
  },
  {
    id: 3,
    category: "Gym Leader POS",
    title: "Battle Revenue System",
    iconColor: "bg-yellow-500",
    iconLabel: "Gym System",
    tag: "#pokemon",
    price: "600 PokeCoins",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png" // Machamp
  },
  {
    id: 4,
    category: "Pokedex Pro",
    title: "Pokemon Encyclopedia",
    iconColor: "bg-blue-500",
    iconLabel: "Pokedex",
    tag: "#pokemon",
    price: "700 PokeCoins",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" // Pikachu
  },
  {
    id: 5,
    category: "Team Rocket CRM",
    title: "Villain Management",
    iconColor: "bg-purple-500",
    iconLabel: "Rocket System",
    tag: "#pokemon",
    price: "450 PokeCoins",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png" // Meowth
  },
  {
    id: 6,
    category: "Pokeball Factory",
    title: "Inventory System",
    iconColor: "bg-green-500",
    iconLabel: "Factory System",
    tag: "#pokemon",
    price: "550 PokeCoins",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png" // Magnemite
  }
];

// Individual Card Component with funky Pokemon style
const Card = ({ card }) => (
  <div className="px-3">
    <div className="bg-yellow-300 border-4 border-black rounded-lg p-6 w-80 h-96 mx-auto shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:rotate-1 hover:scale-105 relative overflow-hidden">
      {/* Funky diagonal stripe */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 transform rotate-45 translate-x-16 -translate-y-8 opacity-20"></div>
      
      {/* Category and NEW badge with pokeball style */}
      <div className="flex items-start justify-between mb-3">
        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-flex items-center border-2 border-black">
          <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
          {card.category}
        </div>
        <div className="bg-white text-black px-2 py-1 rounded-full text-xs font-bold inline-flex items-center border-2 border-black">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
          NEW
        </div>
      </div>
      
      {/* Card Image Area with Pokemon image */}
      <div className="bg-white rounded-lg p-4 mb-4 h-48 border-2 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-100 opacity-20"></div>
        <div className="text-center relative z-10 h-full flex flex-col">
          <div className="text-lg font-bold mb-2 text-black">{card.title}</div>
          <div className="flex-grow flex items-center justify-center">
            <img 
              src={card.image} 
              alt={card.title}
              className="h-32 w-32 object-contain animate-bounce-slow"
            />
          </div>
          <div className="text-sm text-gray-600 font-bold">{card.iconLabel}</div>
        </div>
      </div>

      {/* Bottom Section with funky elements */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
          </div>
          <span className="text-sm font-bold text-black">{card.tag}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-600 text-lg">★</span>
          <span className="text-xs ml-1 font-bold text-black">POKE STACK</span>
        </div>
        <span className="text-sm font-bold bg-black text-yellow-300 px-2 py-1 rounded-full border border-yellow-300">
          {card.price}
        </span>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-red-500 rounded-full border border-black"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-blue-500 rounded-full border border-black"></div>
    </div>
  </div>
);

// Carousel Component
const NewlyAddedCards = () => {
  useEffect(() => {
    // Load jQuery and Slick Carousel
    const loadScripts = async () => {
      // Load jQuery
      if (!window.jQuery) {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        jqueryScript.onload = () => {
          // Load Slick after jQuery is loaded
          const slickScript = document.createElement('script');
          slickScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
          slickScript.onload = () => {
            initializeSlick();
          };
          document.head.appendChild(slickScript);
        };
        document.head.appendChild(jqueryScript);
      } else {
        initializeSlick();
      }
    };

    const initializeSlick = () => {
      if (window.jQuery && window.jQuery.fn.slick) {
        window.jQuery('.cards-carousel').slick({
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          centerMode: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
        });
      }
    };

    // Load CSS files
    const slickCSS = document.createElement('link');
    slickCSS.rel = 'stylesheet';
    slickCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css';
    document.head.appendChild(slickCSS);

    const slickThemeCSS = document.createElement('link');
    slickThemeCSS.rel = 'stylesheet';
    slickThemeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css';
    document.head.appendChild(slickThemeCSS);

    loadScripts();

    // Cleanup
    return () => {
      if (window.jQuery && window.jQuery.fn.slick) {
        window.jQuery('.cards-carousel').slick('unslick');
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Custom styles for Slick Carousel */}
      <style jsx>{`
        .slick-dots {
          bottom: -50px !important;
        }
        
        .slick-dots li button:before {
          color: #000 !important;
          font-size: 12px !important;
        }
        
        .slick-dots li.slick-active button:before {
          color: #ff0000 !important;
        }
        
        .slick-prev:before,
        .slick-next:before {
          color: #ff0000 !important;
          font-size: 30px !important;
          text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
        }
        
        .slick-prev {
          left: -50px !important;
        }
        
        .slick-next {
          right: -50px !important;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
      
      <div className="cards-carousel">
        {cardsData.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

// Main Component
const NewlyAdded = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-400 to-#E5FFFE min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Newly Added Header with Pokeball theme */}
        <div className="flex justify-center items-center mb-12 relative">
          {/* Pokeball divider left */}
          <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-1/4 h-1 bg-black"></div>
          <div className="hidden md:block absolute left-1/4 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-4 border-black">
              <div className="w-4 h-4 bg-white rounded-full border border-black"></div>
            </div>
          </div>
          
          {/* Main title */}
          <div className="relative">
            <h2 className="text-4xl font-bold text-black px-6 py-2 bg-white rounded-full border-4 border-black shadow-lg transform rotate-1">
              <span className="text-red-500">NEWLY</span> <span className="text-blue-500">ADDED</span>
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-yellow-400 rounded-full border border-black"></div>
          </div>
          
          {/* Pokeball divider right */}
          <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1/4 h-1 bg-black"></div>
          <div className="hidden md:block absolute right-1/4 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-4 border-black">
              <div className="w-4 h-4 bg-white rounded-full border border-black"></div>
            </div>
          </div>
        </div>

        {/* Parallax Background with Cards */}
        <div className="relative mb-20">
          {/* Pokeball pattern background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pokeball.png')] opacity-20"></div>
          
          {/* Cards Container */}
          <div className="relative z-10 pt-10 pb-20">
            <NewlyAddedCards />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 left-0 w-16 h-16 bg-red-500 rounded-full border-4 border-black opacity-20"></div>
          <div className="absolute -top-10 right-0 w-16 h-16 bg-blue-500 rounded-full border-4 border-black opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default NewlyAdded;