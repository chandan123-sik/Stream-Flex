import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';

const ContentRow = ({ title, items, size = 'medium' }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-10 lg:mb-12 w-full">
      {/* Title Section - Centered */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{title}</h2>
      </div>
      
      {/* Cards Container - Centered with proper overflow handling */}
      <div className="relative w-full max-w-7xl mx-auto group">
        {/* Left Scroll Button */}
        <button 
          className="hidden lg:flex absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-black/80 text-white items-center justify-center z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/90 hover:scale-110"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="xl:w-6 xl:h-6" />
        </button>

        {/* Scrollable Cards Container */}
        <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
          <div 
            className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide py-2"
            ref={scrollContainerRef}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((item) => (
              <div key={item.id} style={{ scrollSnapAlign: 'start' }} className="flex-shrink-0">
                <ContentCard 
                  item={item} 
                  size={size}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button 
          className="hidden lg:flex absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-black/80 text-white items-center justify-center z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/90 hover:scale-110"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="xl:w-6 xl:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ContentRow;