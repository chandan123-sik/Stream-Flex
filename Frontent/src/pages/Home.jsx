import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ContentRow from '../components/ContentRow';
import { useContent } from '../context/ContentContext';

const Home = () => {
  const {
    getFeaturedContent,
    getTrendingContent,
    getPopularContent,
    getNewReleases,
    getTopRated,
    getRecommended,
    continueWatching
  } = useContent();

  const featuredContent = getFeaturedContent();
  const trendingContent = getTrendingContent();
  const popularContent = getPopularContent();
  const newReleases = getNewReleases();
  const topRated = getTopRated();
  const recommended = getRecommended();

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden">
      {/* Hero Section */}
      <HeroSlider items={featuredContent} />

      {/* Content Sections */}
      <div className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-transparent via-primary-bg to-primary-bg -mt-32 sm:-mt-40 lg:-mt-48 relative z-10">
        {continueWatching.length > 0 && (
          <ContentRow 
            title="Continue Watching" 
            items={continueWatching} 
            size="medium"
          />
        )}

        <ContentRow 
          title="Trending Now" 
          items={trendingContent} 
          size="medium"
        />

        <ContentRow 
          title="Popular Movies & Shows" 
          items={popularContent} 
          size="medium"
        />

        <ContentRow 
          title="New Releases" 
          items={newReleases} 
          size="medium"
        />

        <ContentRow 
          title="Top Rated" 
          items={topRated} 
          size="medium"
        />

        <ContentRow 
          title="Recommended For You" 
          items={recommended} 
          size="medium"
        />
      </div>
    </div>
  );
};

export default Home;