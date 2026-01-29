import React from 'react';
import ContentRow from '../components/ContentRow';
import { useContent } from '../context/ContentContext';

const Movies = () => {
  const { content } = useContent();

  // Filter only movies
  const allMovies = content.movies;
  const actionMovies = allMovies.filter(movie => movie.genre.includes('Action'));
  const dramaMovies = allMovies.filter(movie => movie.genre.includes('Drama'));
  const comedyMovies = allMovies.filter(movie => movie.genre.includes('Comedy'));
  const sciFiMovies = allMovies.filter(movie => movie.genre.includes('Sci-Fi'));
  const thrillerMovies = allMovies.filter(movie => movie.genre.includes('Thriller'));

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden pt-20 sm:pt-24">
      {/* Hero Section for Movies */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow">
            Movies
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Discover amazing movies from every genre. From blockbuster action to heartfelt dramas.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="pb-8 sm:pb-12">
        <ContentRow 
          title="All Movies" 
          items={allMovies} 
          size="medium"
        />

        {actionMovies.length > 0 && (
          <ContentRow 
            title="Action Movies" 
            items={actionMovies} 
            size="medium"
          />
        )}

        {dramaMovies.length > 0 && (
          <ContentRow 
            title="Drama Movies" 
            items={dramaMovies} 
            size="medium"
          />
        )}

        {sciFiMovies.length > 0 && (
          <ContentRow 
            title="Sci-Fi Movies" 
            items={sciFiMovies} 
            size="medium"
          />
        )}

        {thrillerMovies.length > 0 && (
          <ContentRow 
            title="Thriller Movies" 
            items={thrillerMovies} 
            size="medium"
          />
        )}

        {comedyMovies.length > 0 && (
          <ContentRow 
            title="Comedy Movies" 
            items={comedyMovies} 
            size="medium"
          />
        )}
      </div>
    </div>
  );
};

export default Movies;