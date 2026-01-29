import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import FallbackImage from './FallbackImage';

const HeroSlider = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !items?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentSlide];

  return (
    <div className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] overflow-hidden group">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full">
          <FallbackImage
            src={currentItem.backdrop}
            alt={currentItem.title}
            fallbackText={currentItem.title}
            fallbackType="backdrop"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-hero-gradient"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="container">
            <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight text-shadow animate-slide-up">
                {currentItem.title}
              </h1>
              
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-sm sm:text-base animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-accent-gold font-semibold flex items-center gap-1">
                  ★ {currentItem.rating}
                </span>
                <span className="text-text-secondary">{currentItem.year}</span>
                <span className="text-text-secondary">
                  {currentItem.duration || `${currentItem.seasons} Season${currentItem.seasons > 1 ? 's' : ''}`}
                </span>
                {currentItem.likes && (
                  <span className="text-accent-red font-semibold flex items-center gap-1">
                    ♥ {currentItem.likes.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white mb-4 sm:mb-5 lg:mb-6 max-w-lg lg:max-w-xl text-shadow-sm line-clamp-3 sm:line-clamp-none animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {currentItem.description}
              </p>

              <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap animate-slide-up" style={{ animationDelay: '0.6s' }}>
                {currentItem.genre.slice(0, 3).map((genre, index) => (
                  <span key={index} className="bg-white/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-white backdrop-blur-sm border border-white/10 hover:bg-white/30 transition-all duration-300">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <Link 
                  to={`/watch/${currentItem.id}`} 
                  className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg justify-center hover:scale-105 transform transition-all duration-300"
                >
                  <Play size={18} className="sm:w-5 sm:h-5" fill="currentColor" />
                  Play Now
                </Link>
                
                <Link 
                  to={`/details/${currentItem.id}`} 
                  className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg justify-center hover:scale-105 transform transition-all duration-300"
                >
                  <Info size={18} className="sm:w-5 sm:h-5" />
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button 
          className="hidden lg:flex absolute top-1/2 left-4 xl:left-8 transform -translate-y-1/2 bg-black/60 text-white w-12 h-12 xl:w-15 xl:h-15 rounded-full items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 z-20 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} className="xl:w-8 xl:h-8" />
        </button>
        
        <button 
          className="hidden lg:flex absolute top-1/2 right-4 xl:right-8 transform -translate-y-1/2 bg-black/60 text-white w-12 h-12 xl:w-15 xl:h-15 rounded-full items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 z-20 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ChevronRight size={24} className="xl:w-8 xl:h-8" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white border-white scale-125' 
                  : 'bg-transparent border-white/50 hover:border-white hover:scale-110'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;