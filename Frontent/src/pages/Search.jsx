import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import ContentCard from '../components/ContentCard';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    year: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const { searchContent, content } = useContent();

  const genres = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];
  const languages = ['English', 'Spanish', 'Korean', 'French', 'German', 'Japanese'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

  useEffect(() => {
    if (query.trim() || Object.values(filters).some(filter => filter)) {
      setLoading(true);
      const searchResults = searchContent(query, filters);
      setResults(searchResults);
      setLoading(false);
    } else {
      setResults([]);
    }
  }, [query, filters, searchContent]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      language: '',
      year: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter);

  return (
    <div className="search-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <div className="search-input-container">
            <SearchIcon className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search movies, TV shows, genres..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            {query && (
              <button 
                className="clear-search"
                onClick={() => setQuery('')}
              >
                <X size={20} />
              </button>
            )}
          </div>

          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
            {hasActiveFilters && <span className="filter-indicator"></span>}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>Filters</h3>
              {hasActiveFilters && (
                <button className="clear-filters" onClick={clearFilters}>
                  Clear All
                </button>
              )}
            </div>

            <div className="filters-grid">
              <div className="filter-group">
                <label>Genre</label>
                <div className="filter-options">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      className={`filter-option ${filters.genre === genre ? 'active' : ''}`}
                      onClick={() => handleFilterChange('genre', genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Language</label>
                <div className="filter-options">
                  {languages.map(language => (
                    <button
                      key={language}
                      className={`filter-option ${filters.language === language ? 'active' : ''}`}
                      onClick={() => handleFilterChange('language', language)}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Release Year</label>
                <div className="filter-options">
                  {years.map(year => (
                    <button
                      key={year}
                      className={`filter-option ${filters.year === year ? 'active' : ''}`}
                      onClick={() => handleFilterChange('year', year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="search-results">
          {loading ? (
            <div className="loading">Searching...</div>
          ) : query || hasActiveFilters ? (
            <>
              <div className="results-header">
                <h2>
                  {results.length > 0 
                    ? `Found ${results.length} result${results.length !== 1 ? 's' : ''}`
                    : 'No results found'
                  }
                  {query && ` for "${query}"`}
                </h2>
              </div>

              {results.length > 0 ? (
                <div className="results-grid">
                  {results.map(item => (
                    <ContentCard key={item.id} item={item} size="medium" />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <SearchIcon size={64} />
                  <h3>No results found</h3>
                  <p>Try adjusting your search terms or filters</p>
                </div>
              )}
            </>
          ) : (
            <div className="search-suggestions">
              <h2>Popular Searches</h2>
              <div className="suggestions-grid">
                {content.movies.slice(0, 6).map(item => (
                  <ContentCard key={item.id} item={item} size="medium" />
                ))}
              </div>

              <h2>Trending TV Shows</h2>
              <div className="suggestions-grid">
                {content.series.slice(0, 6).map(item => (
                  <ContentCard key={item.id} item={item} size="medium" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;