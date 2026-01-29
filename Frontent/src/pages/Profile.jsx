import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Edit3, Settings, Crown, Clock, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import ContentCard from '../components/ContentCard';
import FallbackImage from '../components/FallbackImage';

const Profile = () => {
  const { user } = useAuth();
  const { watchHistory, continueWatching, favorites } = useContent();
  const [activeTab, setActiveTab] = useState('continue');

  if (!user) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center pt-20">
        <div className="text-accent-red text-lg">Please log in to view your profile</div>
      </div>
    );
  }

  const getSubscriptionColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case 'premium': return 'text-accent-gold';
      case 'standard': return 'text-accent-blue';
      default: return 'text-text-secondary';
    }
  };

  const tabs = [
    { id: 'continue', label: 'Continue Watching', icon: Clock, count: continueWatching.length },
    { id: 'favorites', label: 'My List', icon: Heart, count: favorites.length },
    { id: 'history', label: 'Watch History', icon: User, count: watchHistory.length }
  ];

  const renderContent = () => {
    let items = [];
    switch (activeTab) {
      case 'continue':
        items = continueWatching;
        break;
      case 'favorites':
        items = favorites;
        break;
      case 'history':
        items = watchHistory;
        break;
      default:
        items = [];
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-text-secondary mb-6">
            {activeTab === 'continue' && <Clock size={64} />}
            {activeTab === 'favorites' && <Heart size={64} />}
            {activeTab === 'history' && <User size={64} />}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Nothing here yet</h3>
          <p className="text-text-secondary mb-6 max-w-md">
            {activeTab === 'continue' && 'Start watching something to see it here'}
            {activeTab === 'favorites' && 'Add movies and shows to your list'}
            {activeTab === 'history' && 'Your watch history will appear here'}
          </p>
          <Link to="/" className="btn-primary">
            Browse Content
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <ContentCard item={item} size="small" />
            {activeTab === 'continue' && item.progress && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-card rounded-b-lg overflow-hidden">
                <div 
                  className="h-full bg-accent-red transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-primary-bg pt-20 sm:pt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Header */}
        <div className="bg-primary-card rounded-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-accent-red">
                <FallbackImage
                  src={user.avatar}
                  alt={user.name}
                  fallbackText={user.name}
                  fallbackType="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{user.name}</h1>
                <p className="text-text-secondary mb-3">{user.email}</p>
                <div className={`flex items-center gap-2 justify-center sm:justify-start ${getSubscriptionColor(user.subscription)}`}>
                  <Crown size={16} />
                  <span className="font-semibold">{user.subscription} Plan</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto">
              <button className="btn-secondary">
                <Edit3 size={16} />
                Edit Profile
              </button>
              <Link to="/subscription" className="btn-secondary">
                <Settings size={16} />
                Manage Plan
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-primary-card rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-red mb-2">{watchHistory.length}</div>
            <div className="text-text-secondary text-sm sm:text-base">Movies & Shows Watched</div>
          </div>
          <div className="bg-primary-card rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-blue mb-2">{favorites.length}</div>
            <div className="text-text-secondary text-sm sm:text-base">In My List</div>
          </div>
          <div className="bg-primary-card rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-gold mb-2">{continueWatching.length}</div>
            <div className="text-text-secondary text-sm sm:text-base">Continue Watching</div>
          </div>
          <div className="bg-primary-card rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {Math.floor(Math.random() * 100) + 50}h
            </div>
            <div className="text-text-secondary text-sm sm:text-base">Total Watch Time</div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-primary-card rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b border-border-color">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-4 transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-accent-red text-white border-b-2 border-accent-red' 
                      : 'text-text-secondary hover:text-white hover:bg-hover-bg'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-accent-red text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;