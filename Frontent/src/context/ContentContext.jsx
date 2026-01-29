import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Dummy data for movies and series (fallback when backend is not available)
const dummyContent = {
  movies: [
    {
      id: 1,
      title: "The Dark Knight",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
      genre: ["Action", "Crime", "Drama"],
      rating: 9.0,
      year: 2008,
      duration: "2h 32m",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: "Christopher Nolan",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      featured: true,
      trending: true,
      likes: 1250
    },
    {
      id: 2,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      genre: ["Action", "Sci-Fi", "Thriller"],
      rating: 8.8,
      year: 2010,
      duration: "2h 28m",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
      director: "Christopher Nolan",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      featured: true,
      popular: true,
      likes: 980
    },
    {
      id: 3,
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      genre: ["Adventure", "Drama", "Sci-Fi"],
      rating: 8.6,
      year: 2014,
      duration: "2h 49m",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      director: "Christopher Nolan",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      newRelease: true,
      topRated: true,
      likes: 1100
    },
    {
      id: 4,
      title: "Avengers: Endgame",
      poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      genre: ["Action", "Adventure", "Drama"],
      rating: 8.4,
      year: 2019,
      duration: "3h 1m",
      description: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.",
      cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
      director: "Anthony Russo, Joe Russo",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      popular: true,
      recommended: true,
      likes: 2100
    },
    {
      id: 5,
      title: "Parasite",
      poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/TU9NIjwzjoKPwQHoHshkBcQZzr.jpg",
      genre: ["Comedy", "Drama", "Thriller"],
      rating: 8.5,
      year: 2019,
      duration: "2h 12m",
      description: "A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.",
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
      director: "Bong Joon-ho",
      language: "Korean",
      trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
      topRated: true,
      recommended: true,
      likes: 850
    },
    {
      id: 6,
      title: "Spider-Man: No Way Home",
      poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
      genre: ["Action", "Adventure", "Fantasy"],
      rating: 8.2,
      year: 2021,
      duration: "2h 28m",
      description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
      cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
      director: "Jon Watts",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
      newRelease: true,
      popular: true,
      likes: 1800
    }
  ],
  series: [
    {
      id: 101,
      title: "Stranger Things",
      poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      genre: ["Drama", "Fantasy", "Horror"],
      rating: 8.7,
      year: 2016,
      seasons: 4,
      episodes: 34,
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
      creator: "The Duffer Brothers",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
      featured: true,
      trending: true,
      likes: 1500
    },
    {
      id: 102,
      title: "The Crown",
      poster: "https://image.tmdb.org/t/p/w500/1M876KQUEYvZ78GeZbpcTpyHtak.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg",
      genre: ["Biography", "Drama", "History"],
      rating: 8.6,
      year: 2016,
      seasons: 6,
      episodes: 60,
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
      cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
      creator: "Peter Morgan",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
      popular: true,
      topRated: true,
      likes: 920
    },
    {
      id: 103,
      title: "Money Heist",
      poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/xGexTKCJJVcKWJybYmghNnQfjKl.jpg",
      genre: ["Action", "Crime", "Mystery"],
      rating: 8.3,
      year: 2017,
      seasons: 5,
      episodes: 41,
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"],
      creator: "Álex Pina",
      language: "Spanish",
      trailer: "https://www.youtube.com/watch?v=_InqQJRqGW4",
      newRelease: true,
      recommended: true,
      likes: 1300
    },
    {
      id: 104,
      title: "Breaking Bad",
      poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
      genre: ["Crime", "Drama", "Thriller"],
      rating: 9.5,
      year: 2008,
      seasons: 5,
      episodes: 62,
      description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student.",
      cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
      creator: "Vince Gilligan",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=HhesaQXLuRY",
      topRated: true,
      recommended: true,
      likes: 2200
    },
    {
      id: 105,
      title: "The Witcher",
      poster: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
      genre: ["Action", "Adventure", "Fantasy"],
      rating: 8.2,
      year: 2019,
      seasons: 3,
      episodes: 24,
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
      creator: "Lauren Schmidt Hissrich",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
      popular: true,
      trending: true,
      likes: 1650
    },
    {
      id: 106,
      title: "House of Cards",
      poster: "https://image.tmdb.org/t/p/w500/hKWxWjFwnMvkWQawbhvC0Y7ygQ8.jpg",
      backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/b6IoW0iAkIbPXTJSBpKaqEKdvnz.jpg",
      genre: ["Drama", "Thriller"],
      rating: 8.7,
      year: 2013,
      seasons: 6,
      episodes: 73,
      description: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
      cast: ["Kevin Spacey", "Robin Wright", "Michael Kelly"],
      creator: "Beau Willimon",
      language: "English",
      trailer: "https://www.youtube.com/watch?v=ULwUzF1q5w4",
      topRated: true,
      recommended: true,
      likes: 1100
    }
  ]
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(dummyContent);
  const [watchHistory, setWatchHistory] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [likedContent, setLikedContent] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user data from localStorage as fallback
    const storedHistory = localStorage.getItem('watchHistory');
    const storedContinue = localStorage.getItem('continueWatching');
    const storedFavorites = localStorage.getItem('favorites');
    const storedLiked = localStorage.getItem('likedContent');

    if (storedHistory) setWatchHistory(JSON.parse(storedHistory));
    if (storedContinue) setContinueWatching(JSON.parse(storedContinue));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedLiked) setLikedContent(new Set(JSON.parse(storedLiked)));

    // Try to load data from backend if user is authenticated
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const [favoritesRes, historyRes, continueRes] = await Promise.allSettled([
        apiService.getFavorites(),
        apiService.getWatchHistory(),
        apiService.getContinueWatching()
      ]);

      if (favoritesRes.status === 'fulfilled') {
        setFavorites(favoritesRes.value);
      }
      if (historyRes.status === 'fulfilled') {
        setWatchHistory(historyRes.value);
      }
      if (continueRes.status === 'fulfilled') {
        setContinueWatching(continueRes.value);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const addToWatchHistory = async (item) => {
    const newHistory = [item, ...watchHistory.filter(h => h.id !== item.id)].slice(0, 20);
    setWatchHistory(newHistory);
    localStorage.setItem('watchHistory', JSON.stringify(newHistory));

    // Try to sync with backend
    try {
      await apiService.addToWatchHistory(item.id);
    } catch (error) {
      console.error('Error syncing watch history:', error);
    }
  };

  const addToContinueWatching = async (item, progress) => {
    const newContinue = [
      { ...item, progress, timestamp: Date.now() },
      ...continueWatching.filter(c => c.id !== item.id)
    ].slice(0, 10);
    setContinueWatching(newContinue);
    localStorage.setItem('continueWatching', JSON.stringify(newContinue));

    // Try to sync with backend
    try {
      await apiService.addToWatchHistory(item.id, progress);
    } catch (error) {
      console.error('Error syncing continue watching:', error);
    }
  };

  const toggleFavorite = async (item) => {
    const isFavorite = favorites.some(f => f.id === item.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(f => f.id !== item.id);
    } else {
      newFavorites = [...favorites, item];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    // Try to sync with backend
    try {
      await apiService.toggleFavorite(item.id);
    } catch (error) {
      console.error('Error syncing favorites:', error);
    }
  };

  const toggleLike = async (item) => {
    const isLiked = likedContent.has(item.id);
    const newLikedContent = new Set(likedContent);
    
    if (isLiked) {
      newLikedContent.delete(item.id);
      // Decrease like count in content
      updateContentLikes(item.id, -1);
    } else {
      newLikedContent.add(item.id);
      // Increase like count in content
      updateContentLikes(item.id, 1);
    }
    
    setLikedContent(newLikedContent);
    localStorage.setItem('likedContent', JSON.stringify([...newLikedContent]));

    // Try to sync with backend
    try {
      if (!isLiked) {
        await apiService.likeContent(item.id);
      }
    } catch (error) {
      console.error('Error syncing likes:', error);
    }
  };

  const updateContentLikes = (contentId, change) => {
    setContent(prevContent => ({
      movies: prevContent.movies.map(movie => 
        movie.id === contentId 
          ? { ...movie, likes: Math.max(0, (movie.likes || 0) + change) }
          : movie
      ),
      series: prevContent.series.map(series => 
        series.id === contentId 
          ? { ...series, likes: Math.max(0, (series.likes || 0) + change) }
          : series
      )
    }));
  };

  const searchContent = (query, filters = {}) => {
    const allContent = [...content.movies, ...content.series];
    
    return allContent.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                          item.genre.some(g => g.toLowerCase().includes(query.toLowerCase()));
      
      const matchesGenre = !filters.genre || item.genre.includes(filters.genre);
      const matchesLanguage = !filters.language || item.language === filters.language;
      const matchesYear = !filters.year || item.year.toString() === filters.year;
      
      return matchesQuery && matchesGenre && matchesLanguage && matchesYear;
    });
  };

  const getContentById = (id) => {
    return [...content.movies, ...content.series].find(item => item.id === parseInt(id));
  };

  const getFeaturedContent = () => {
    return [...content.movies, ...content.series].filter(item => item.featured);
  };

  const getTrendingContent = () => {
    return [...content.movies, ...content.series].filter(item => item.trending);
  };

  const getPopularContent = () => {
    return [...content.movies, ...content.series].filter(item => item.popular);
  };

  const getNewReleases = () => {
    return [...content.movies, ...content.series].filter(item => item.newRelease);
  };

  const getTopRated = () => {
    return [...content.movies, ...content.series].filter(item => item.topRated);
  };

  const getRecommended = () => {
    return [...content.movies, ...content.series].filter(item => item.recommended);
  };

  const value = {
    content,
    watchHistory,
    continueWatching,
    favorites,
    likedContent,
    loading,
    addToWatchHistory,
    addToContinueWatching,
    toggleFavorite,
    toggleLike,
    searchContent,
    getContentById,
    getFeaturedContent,
    getTrendingContent,
    getPopularContent,
    getNewReleases,
    getTopRated,
    getRecommended,
    loadUserData
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};