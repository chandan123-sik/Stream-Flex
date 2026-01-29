import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Info, Star, Heart } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import FallbackImage from './FallbackImage';

const ContentCard = ({ item, size = 'medium' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, toggleFavorite, likedContent, toggleLike } = useContent();
  
  const isFavorite = favorites.some(fav => fav.id === item.id);
  const isLiked = likedContent.has(item.id);
  const isMovie = !item.seasons;

  const handlePlayClick = (e) => {
    e.preventDefault();
    window.location.href = `/watch/${item.id}`;
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item);
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(item);
  };

  const sizeClasses = {
    small: 'w-32 sm:w-40 lg:w-44',
    medium: 'w-48 sm:w-56 lg:w-64',
    large: 'w-56 sm:w-64 lg:w-72'
  };

  return (
    <div 
      className={`relative rounded-lg overflow-hidden transition-all duration-500 bg-primary-card cursor-pointer group flex-shrink-0 ${sizeClasses[size]} hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-accent-red/20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/details/${item.id}`} className="block text-inherit">
        <div className="relative aspect-[2/3] overflow-hidden">
          <FallbackImage
            src={item.poster}
            alt={item.title}
            fallbackText={item.title}
            fallbackType="poster"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {isHovered && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/30 via-black/70 to-black/70 flex flex-col justify-between p-3 animate-fade-in">
              <div className="flex gap-2 self-end">
                <button 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-accent-red hover:border-accent-red hover:scale-110 transform"
                  onClick={handlePlayClick}
                  title="Play"
                >
                  <Play size={14} className="sm:w-4 sm:h-4" fill="currentColor" />
                </button>
                
                <button 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 transform ${
                    isFavorite ? 'bg-accent-blue border-accent-blue' : 'hover:bg-white/20 hover:border-white'
                  }`}
                  onClick={handleFavoriteClick}
                  title={isFavorite ? 'Remove from My List' : 'Add to My List'}
                >
                  <Plus size={14} className="sm:w-4 sm:h-4" />
                </button>
                
                <button 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 transform ${
                    isLiked ? 'bg-accent-red border-accent-red' : 'hover:bg-white/20 hover:border-white'
                  }`}
                  onClick={handleLikeClick}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart size={14} className={`sm:w-4 sm:h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <Link 
                  to={`/details/${item.id}`} 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-110 transform"
                  title="More Info"
                >
                  <Info size={14} className="sm:w-4 sm:h-4" />
                </Link>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-accent-gold font-semibold text-xs sm:text-sm">
                  <Star size={10} className="sm:w-3 sm:h-3" fill="currentColor" />
                  <span>{item.rating}</span>
                </div>
                
                <div className="flex gap-2 sm:gap-3 text-xs text-text-secondary">
                  <span>{item.year}</span>
                  <span>
                    {isMovie ? item.duration : `${item.seasons} Season${item.seasons > 1 ? 's' : ''}`}
                  </span>
                </div>
                
                <div className="flex gap-1 sm:gap-1.5 flex-wrap">
                  {item.genre.slice(0, 2).map((genre, index) => (
                    <span key={index} className="bg-white/20 px-2 py-0.5 rounded-xl text-xs text-white backdrop-blur-sm">
                      {genre}
                    </span>
                  ))}
                </div>

                {item.likes && (
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Heart size={10} className="text-accent-red" fill="currentColor" />
                    <span>{item.likes.toLocaleString()} likes</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-2 sm:p-3">
          <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-1 leading-tight line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1 text-accent-gold">
              <Star size={10} className="sm:w-3 sm:h-3" fill="currentColor" />
              {item.rating}
            </span>
            <span>{item.year}</span>
            {item.likes && (
              <span className="flex items-center gap-1">
                <Heart size={10} className="text-accent-red" fill="currentColor" />
                {item.likes > 999 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;