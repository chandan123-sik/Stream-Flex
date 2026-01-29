import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Heart, Share, Star, Calendar, Clock, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import ContentRow from '../components/ContentRow';
import FallbackImage from '../components/FallbackImage';

const ContentDetails = () => {
  const { id } = useParams();
  const { getContentById, toggleFavorite, favorites, getRecommended, toggleLike, likedContent } = useContent();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const item = getContentById(id);
    setContent(item);
    setLoading(false);
  }, [id, getContentById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center pt-20">
        <div className="text-text-secondary text-lg">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center pt-20">
        <div className="text-accent-red text-lg">Content not found</div>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === content.id);
  const isLiked = likedContent.has(content.id);
  const isMovie = !content.seasons;
  const recommended = getRecommended().filter(item => item.id !== content.id);

  const handleFavoriteClick = () => {
    toggleFavorite(content);
  };

  const handleLikeClick = () => {
    toggleLike(content);
  };

  const handleShareClick = async () => {
    const shareData = {
      title: content.title,
      text: `Check out ${content.title} - ${content.description.substring(0, 100)}...`,
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // Show success message
        const button = document.activeElement;
        const originalText = button.innerHTML;
        button.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Copied!';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback: Show the URL
      prompt('Copy this link:', window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <FallbackImage
            src={content.backdrop}
            alt={content.title}
            fallbackText={content.title}
            fallbackType="backdrop"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/90 to-transparent"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center pt-20 sm:pt-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Content Info */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight text-shadow animate-slide-up">
                  {content.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-base animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-1 text-accent-gold font-semibold">
                    <Star size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
                    <span>{content.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Calendar size={16} className="sm:w-5 sm:h-5" />
                    <span>{content.year}</span>
                  </div>
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Clock size={16} className="sm:w-5 sm:h-5" />
                    <span>
                      {isMovie ? content.duration : `${content.seasons} Season${content.seasons > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  {content.language && (
                    <span className="bg-white/20 px-2 py-1 rounded text-xs sm:text-sm text-white backdrop-blur-sm">
                      {content.language}
                    </span>
                  )}
                  {content.likes && (
                    <div className="flex items-center gap-1 text-accent-red font-semibold">
                      <Heart size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
                      <span>{content.likes.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  {content.genre.map((genre, index) => (
                    <span key={index} className="bg-accent-red/20 border border-accent-red/30 px-3 py-1 rounded-full text-xs sm:text-sm text-white backdrop-blur-sm hover:bg-accent-red/30 transition-all duration-300">
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white mb-6 sm:mb-8 max-w-2xl text-shadow-sm animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  {content.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                  <Link 
                    to={`/watch/${content.id}`} 
                    className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg justify-center hover:scale-105 transform transition-all duration-300"
                  >
                    <Play size={18} className="sm:w-5 sm:h-5" fill="currentColor" />
                    Play Now
                  </Link>
                  
                  <button 
                    className={`btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg justify-center hover:scale-105 transform transition-all duration-300 ${
                      isFavorite ? 'bg-accent-blue/20 border-accent-blue' : ''
                    }`}
                    onClick={handleFavoriteClick}
                  >
                    <Plus size={18} className="sm:w-5 sm:h-5" />
                    {isFavorite ? 'Remove from List' : 'Add to My List'}
                  </button>

                  <button 
                    className={`btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg justify-center hover:scale-105 transform transition-all duration-300 ${
                      isLiked ? 'bg-accent-red/20 border-accent-red' : ''
                    }`}
                    onClick={handleLikeClick}
                  >
                    <Heart size={18} className={`sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Unlike' : 'Like'}
                  </button>

                  <button 
                    className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg justify-center hover:scale-105 transform transition-all duration-300"
                    onClick={handleShareClick}
                  >
                    <Share size={18} className="sm:w-5 sm:h-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Poster */}
              <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '1s' }}>
                <div className="w-64 sm:w-72 lg:w-80 xl:w-96 rounded-lg overflow-hidden shadow-2xl hover:scale-105 transform transition-all duration-500">
                  <FallbackImage
                    src={content.poster}
                    alt={content.title}
                    fallbackText={content.title}
                    fallbackType="poster"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-primary-bg py-8 sm:py-12 lg:py-16 -mt-32 sm:-mt-40 lg:-mt-48 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 sm:mb-12">
            {/* Cast & Crew */}
            <div className="bg-primary-card rounded-lg p-6 sm:p-8 hover:bg-hover-bg transition-all duration-300 hover:scale-105 transform">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Cast & Crew</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users size={20} className="text-accent-red mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-text-secondary text-sm mb-1">Cast</div>
                    <div className="text-white">{content.cast.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users size={20} className="text-accent-red mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-text-secondary text-sm mb-1">{isMovie ? 'Director' : 'Creator'}</div>
                    <div className="text-white">{content.director || content.creator}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-primary-card rounded-lg p-6 sm:p-8 hover:bg-hover-bg transition-all duration-300 hover:scale-105 transform">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-text-secondary text-sm mb-1">Rating</div>
                  <div className="flex items-center gap-1 text-accent-gold font-semibold">
                    <Star size={14} fill="currentColor" />
                    {content.rating}/10
                  </div>
                </div>
                <div>
                  <div className="text-text-secondary text-sm mb-1">Release Year</div>
                  <div className="text-white">{content.year}</div>
                </div>
                <div>
                  <div className="text-text-secondary text-sm mb-1">Language</div>
                  <div className="text-white">{content.language}</div>
                </div>
                <div>
                  <div className="text-text-secondary text-sm mb-1">Duration</div>
                  <div className="text-white">
                    {isMovie ? content.duration : `${content.seasons} Season${content.seasons > 1 ? 's' : ''}`}
                  </div>
                </div>
                {!isMovie && (
                  <>
                    <div>
                      <div className="text-text-secondary text-sm mb-1">Seasons</div>
                      <div className="text-white">{content.seasons}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary text-sm mb-1">Episodes</div>
                      <div className="text-white">{content.episodes}</div>
                    </div>
                  </>
                )}
                {content.likes && (
                  <div>
                    <div className="text-text-secondary text-sm mb-1">Likes</div>
                    <div className="flex items-center gap-1 text-accent-red font-semibold">
                      <Heart size={14} fill="currentColor" />
                      {content.likes.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trailer Section */}
          {content.trailer && (
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Trailer</h3>
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video bg-primary-card rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-500">
                  <iframe
                    src={content.trailer.replace('watch?v=', 'embed/')}
                    title={`${content.title} Trailer`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommended.length > 0 && (
        <div className="pb-8 sm:pb-12">
          <ContentRow 
            title="More Like This" 
            items={recommended} 
            size="medium"
          />
        </div>
      )}
    </div>
  );
};

export default ContentDetails;