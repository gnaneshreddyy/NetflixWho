import { Bookmark, Play, Info } from 'lucide-react';
import { getImageUrl, getRatingColor } from '../utils/api';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ item, onShowDetails }) => {
  const { contentType, bookmarks, toggleBookmark } = useMovieContext();

  const isBookmarked = bookmarks.some(bookmark => 
    bookmark.id === item.id && bookmark.media_type === contentType
  );

  return (
    <div className="movie-card group cursor-pointer" onClick={() => onShowDetails(item)}>
      <div className="relative aspect-[2/3]">
        <img
          src={getImageUrl(item.poster_path, 'w500')}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
        
        {/* Rating Badge */}
        <div className={`rating-badge ${getRatingColor(item.vote_average)}`}>
          {item.vote_average.toFixed(1)}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(item);
          }}
          className="bookmark-btn"
          title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          <Bookmark 
            size={16} 
            className={isBookmarked ? 'fill-current text-netflix-red' : 'text-white'}
          />
        </button>

        {/* Overlay */}
        <div className="movie-overlay">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold mb-2 line-clamp-2">
              {item.title || item.name}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {item.overview}
            </p>
            <div className="flex items-center space-x-2">
              <button className="btn-primary flex items-center space-x-1 text-sm">
                <Play size={14} />
                <span>Play</span>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShowDetails(item);
                }}
                className="btn-secondary flex items-center space-x-1 text-sm"
              >
                <Info size={14} />
                <span>Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

