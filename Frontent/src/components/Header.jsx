import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FallbackImage from './FallbackImage';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-sm' 
        : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center gap-6 lg:gap-10">
            <Link to="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-accent-red tracking-tight">StreamFlix</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link 
                to="/" 
                className={`text-white font-medium transition-colors duration-300 relative hover:text-white ${
                  isActive('/') ? 'text-white after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-red' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`text-white font-medium transition-colors duration-300 relative hover:text-white ${
                  isActive('/movies') ? 'text-white after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-red' : ''
                }`}
              >
                Movies
              </Link>
              <Link 
                to="/series" 
                className={`text-white font-medium transition-colors duration-300 relative hover:text-white ${
                  isActive('/series') ? 'text-white after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-red' : ''
                }`}
              >
                TV Shows
              </Link>
              <Link 
                to="/my-list" 
                className={`text-white font-medium transition-colors duration-300 relative hover:text-white ${
                  isActive('/my-list') ? 'text-white after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-red' : ''
                }`}
              >
                My List
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/search" className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
              <Search size={18} className="sm:w-5 sm:h-5" />
            </Link>
            
            {user ? (
              <>
                <button className="hidden sm:block text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                  <Bell size={18} className="sm:w-5 sm:h-5" />
                </button>
                
                <div className="relative">
                  <button 
                    className="rounded-full overflow-hidden border-2 border-transparent hover:border-white/30 transition-colors duration-300"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <FallbackImage
                      src={user.avatar}
                      alt={user.name}
                      fallbackText={user.name}
                      fallbackType="avatar"
                      className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-full"
                    />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-primary-card border border-border-color rounded-lg p-2 min-w-[180px] shadow-xl z-50">
                      <Link to="/profile" className="flex items-center gap-2 w-full p-3 text-white hover:bg-hover-bg rounded transition-colors duration-300 text-sm">
                        <User size={16} />
                        Profile
                      </Link>
                      <Link to="/subscription" className="flex items-center gap-2 w-full p-3 text-white hover:bg-hover-bg rounded transition-colors duration-300 text-sm">
                        Subscription
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-2 w-full p-3 text-white hover:bg-hover-bg rounded transition-colors duration-300 text-sm">
                          Admin Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full p-3 text-white hover:bg-hover-bg rounded transition-colors duration-300 text-sm">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex gap-3">
                <Link 
                  to="/register" 
                  className="text-white font-medium px-4 py-2 rounded-md transition-all duration-300 hover:bg-white/10 hover:scale-105 transform text-sm"
                >
                  Sign Up
                </Link>
                <Link 
                  to="/login" 
                  className="btn-primary text-sm px-4 py-2 hover:scale-105 transform"
                >
                  Sign In
                </Link>
              </div>
            )}

            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary-secondary/95 backdrop-blur-sm border-t border-border-color">
          <div className="container">
            <nav className="flex flex-col py-4">
              <Link 
                to="/" 
                className="text-white py-3 px-2 border-b border-border-color/50 hover:text-accent-red transition-colors duration-300" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className="text-white py-3 px-2 border-b border-border-color/50 hover:text-accent-red transition-colors duration-300" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/series" 
                className="text-white py-3 px-2 border-b border-border-color/50 hover:text-accent-red transition-colors duration-300" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TV Shows
              </Link>
              <Link 
                to="/my-list" 
                className="text-white py-3 px-2 border-b border-border-color/50 hover:text-accent-red transition-colors duration-300" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My List
              </Link>
              {!user && (
                <>
                  <Link 
                    to="/register" 
                    className="text-white py-3 px-2 border-b border-border-color/50 hover:text-accent-red transition-colors duration-300" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-white py-3 px-2 hover:text-accent-red transition-colors duration-300" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;