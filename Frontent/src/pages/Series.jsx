import React from 'react';
import ContentRow from '../components/ContentRow';
import { useContent } from '../context/ContentContext';

const Series = () => {
  const { content } = useContent();

  // Filter only series
  const allSeries = content.series;
  const dramaSeries = allSeries.filter(series => series.genre.includes('Drama'));
  const actionSeries = allSeries.filter(series => series.genre.includes('Action'));
  const comedySeries = allSeries.filter(series => series.genre.includes('Comedy'));
  const crimeSeries = allSeries.filter(series => series.genre.includes('Crime'));
  const fantasySeries = allSeries.filter(series => series.genre.includes('Fantasy'));

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden pt-20 sm:pt-24">
      {/* Hero Section for TV Shows */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow">
            TV Shows
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Binge-watch the best TV series from around the world. From gripping dramas to thrilling mysteries.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="pb-8 sm:pb-12">
        <ContentRow 
          title="All TV Shows" 
          items={allSeries} 
          size="medium"
        />

        {dramaSeries.length > 0 && (
          <ContentRow 
            title="Drama Series" 
            items={dramaSeries} 
            size="medium"
          />
        )}

        {actionSeries.length > 0 && (
          <ContentRow 
            title="Action Series" 
            items={actionSeries} 
            size="medium"
          />
        )}

        {crimeSeries.length > 0 && (
          <ContentRow 
            title="Crime Series" 
            items={crimeSeries} 
            size="medium"
          />
        )}

        {fantasySeries.length > 0 && (
          <ContentRow 
            title="Fantasy Series" 
            items={fantasySeries} 
            size="medium"
          />
        )}

        {comedySeries.length > 0 && (
          <ContentRow 
            title="Comedy Series" 
            items={comedySeries} 
            size="medium"
          />
        )}
      </div>
    </div>
  );
};

export default Series;