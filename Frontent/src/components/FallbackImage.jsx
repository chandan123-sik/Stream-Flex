import React, { useState } from 'react';

const FallbackImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackText = '',
  fallbackType = 'poster', // 'poster', 'backdrop', 'avatar'
  onError,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getFallbackDimensions = () => {
    switch (fallbackType) {
      case 'poster':
        return '400x600';
      case 'backdrop':
        return '1920x1080';
      case 'avatar':
        return '120x120';
      default:
        return '400x600';
    }
  };

  const getFallbackUrl = () => {
    const dimensions = getFallbackDimensions();
    const text = fallbackText || alt || 'Image';
    const encodedText = encodeURIComponent(text.substring(0, 20));
    return `https://via.placeholder.com/${dimensions}/1a1a1a/ffffff?text=${encodedText}`;
  };

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
      if (onError) onError(e);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-primary-card animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent-red border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={hasError ? getFallbackUrl() : src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default FallbackImage;