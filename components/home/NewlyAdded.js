
import React, { useEffect } from 'react';

// Cards data array
const cardsData = [
  {
    id: 1,
    category: "Hotel Management",
    title: "Hotel Booking Management",
    iconColor: "bg-blue-500",
    iconLabel: "Hotel System",
    tag: "#webDevelopment",
    price: "300 INR"
  },
  {
    id: 2,
    category: "Hotel Management",
    title: "Hotel Booking Management",
    iconColor: "bg-green-500",
    iconLabel: "Booking System",
    tag: "#webDevelopment",
    price: "300 INR"
  },
  {
    id: 3,
    category: "Hotel Management",
    title: "Hotel Booking Management",
    iconColor: "bg-purple-500",
    iconLabel: "Management Portal",
    tag: "#webDevelopment",
    price: "300 INR"
  },
  {
    id: 4,
    category: "Restaurant Management",
    title: "Restaurant POS System",
    iconColor: "bg-red-500",
    iconLabel: "POS System",
    tag: "#webDevelopment",
    price: "450 INR"
  },
  {
    id: 5,
    category: "E-commerce",
    title: "Shopping Cart System",
    iconColor: "bg-orange-500",
    iconLabel: "Shopping Cart",
    tag: "#webDevelopment",
    price: "500 INR"
  },
  {
    id: 6,
    category: "CRM System",
    title: "Customer Management",
    iconColor: "bg-indigo-500",
    iconLabel: "CRM Portal",
    tag: "#webDevelopment",
    price: "400 INR"
  }
];

// Individual Card Component
const Card = ({ card }) => (
  <div className="px-3">
    <div className="bg-yellow-400 border-4 border-black rounded-lg p-6 w-80 h-96 mx-auto shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
        {card.category}
      </div>
      <div className="bg-yellow-300 text-black px-2 py-1 rounded text-xs font-bold mb-4 inline-block">
        NEW
      </div>
      
      {/* Card Image Area */}
      <div className="bg-white rounded p-4 mb-4 h-48">
        <div className="text-center">
          <div className="text-lg font-bold mb-3">{card.title}</div>
          <div className="bg-gray-200 h-24 rounded mb-3 flex items-center justify-center">
            <div className="text-center">
              <div className={`w-10 h-10 ${card.iconColor} rounded-full mx-auto mb-2`}></div>
              <span className="text-sm text-gray-600">{card.iconLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded"></div>
          <span className="text-sm font-bold">{card.tag}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-600 text-lg">★</span>
          <span className="text-xs ml-1 font-bold">MERIT STACK</span>
        </div>
        <span className="text-sm font-bold">{card.price}</span>
      </div>
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
          color: #000 !important;
        }
        
        .slick-prev:before,
        .slick-next:before {
          color: #000 !important;
          font-size: 20px !important;
        }
        
        .slick-prev {
          left: -50px !important;
        }
        
        .slick-next {
          right: -50px !important;
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
    <div className="bg-[#E5FFFE] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* Newly Added Header */}
       
        <div className="flex justify-center items-center mb-8">
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-black">
      <div className="w-4 h-4 bg-white rounded-full"></div>
    </div>
    
    {/* Wrap text to add border */}
    <h2 className="text-3xl font-bold text-black border-b-4 border-red-500 pb-1">
      Newly Added
    </h2>
    
    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-black">
      <div className="w-4 h-4 bg-white rounded-full"></div>
    </div>
  </div>
</div>


        {/* Parallax Background with Cards positioned 4px over it */}
        <div className="relative">
          {/* Parallax Image */}
         <div className="relative min-h-[160px] bg-fixed bg-center bg-cover bg-no-repeat" 
     style={{ 
       backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80ff523f-ff84-457d-a547-464588d3a3d3/debj0k1-d37b9a16-294a-4673-a148-15a8d4b4e86b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwZmY1MjNmLWZmODQtNDU3ZC1hNTQ3LTQ2NDU4OGQzYTNkM1wvZGViajBrMS1kMzdiOWExNi0yOTRhLTQ2NzMtYTE0OC0xNWE4ZDRiNGU4NmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zjEyzCPSHELKL44UPO_YxcEZ4uFWhl6C01LrKv4jmfI')" 
     }}>
  <div className="absolute inset-0 bg-black/60"></div>
</div>

          
          {/* Cards Container - Positioned 4px over the image */}
          <div className="relative -top-13 z-10">
            <NewlyAddedCards />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NewlyAdded;