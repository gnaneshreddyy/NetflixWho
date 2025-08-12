import { Sun, Moon, Search, Bookmark } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { 
    contentType, 
    searchQuery, 
    setSearchQuery, 
    handleContentTypeChange,
    bookmarks,
    showBookmarks,
    setShowBookmarks
  } = useMovieContext();
  
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-netflix-red">MovieVault</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => handleContentTypeChange('movie')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  contentType === 'movie' 
                    ? 'bg-netflix-red text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => handleContentTypeChange('tv')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  contentType === 'tv' 
                    ? 'bg-netflix-red text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                TV Shows
              </button>
            </div>
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Search ${contentType === 'movie' ? 'movies' : 'TV shows'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <span className="text-white">×</span>
                </button>
              )}
            </div>
            
            {/* Bookmarks Button */}
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showBookmarks 
                  ? 'bg-netflix-red text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Bookmark size={16} />
              <span>Your Bookmarks ({bookmarks.length})</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

