import { Bookmark } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

const ContentGrid = ({ onShowDetails }) => {
  const { 
    contentType, 
    trending, 
    searchResults, 
    searchQuery, 
    selectedGenre, 
    loading, 
    error, 
    bookmarks,
    showBookmarks,
    setSearchQuery,
    setSelectedGenre,
    setShowBookmarks,
    fetchTrendingContent,
    debouncedSearch,
    filterByGenreHandler
  } = useMovieContext();

  const displayItems = showBookmarks 
    ? bookmarks.filter(bookmark => bookmark.media_type === contentType)
    : searchQuery || selectedGenre ? searchResults : trending;

  const handleRetry = () => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else if (selectedGenre) {
      filterByGenreHandler(selectedGenre);
    } else {
      fetchTrendingContent();
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        message={
          searchQuery ? `Searching for "${searchQuery}"...` :
          selectedGenre ? 'Filtering by genre...' :
          showBookmarks ? 'Loading bookmarks...' :
          `Loading trending ${contentType === 'movie' ? 'movies' : 'TV shows'}...`
        }
        size="large"
      />
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorDisplay 
          error={error} 
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">
              {showBookmarks ? `Your Bookmarks` :
               searchQuery ? `Search Results for "${searchQuery}"` : 
               selectedGenre ? `Filtered by Genre` : 
               `Trending ${contentType === 'movie' ? 'Movies' : 'TV Shows'}`}
            </h2>
            
            {(searchQuery || selectedGenre || showBookmarks) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('');
                  setShowBookmarks(false);
                }}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          {/* Bookmarks Count */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Bookmark size={16} />
            <span>{bookmarks.length} bookmarked</span>
          </div>
        </div>

        {/* Content Grid */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayItems.map((item) => (
              <MovieCard 
                key={`${item.id}-${contentType}`} 
                item={item} 
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              {showBookmarks ? '📚' : '🎬'}
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {showBookmarks ? 'No bookmarks yet' :
               searchQuery ? `No results found for "${searchQuery}"` :
               selectedGenre ? 'No content found for this genre' :
               'No content available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {showBookmarks ? 'Start bookmarking your favorite movies and TV shows!' :
               searchQuery ? 'Try a different search term' :
               selectedGenre ? 'Try selecting a different genre' :
               'Check back later for new content'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentGrid;

