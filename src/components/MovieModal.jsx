import { Play, Bookmark, Youtube, Users } from 'lucide-react';
import { getImageUrl, getRatingColor } from '../utils/api';
import { useMovieContext } from '../context/MovieContext';
import { useState } from 'react';
import TrailerModal from './TrailerModal';
import CastModal from './CastModal';

const MovieModal = ({ item, onClose }) => {
  const { contentType, bookmarks, toggleBookmark } = useMovieContext();
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);

  if (!item) return null;

  const isBookmarked = bookmarks.some(bookmark => 
    bookmark.id === item.id && bookmark.media_type === contentType
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-netflix-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={getImageUrl(item.backdrop_path, 'w1280')}
            alt={item.title || item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 dark:bg-black/50 rounded-full text-white hover:bg-black/70 dark:hover:bg-black/70"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold">{item.title || item.name}</h2>
            <div className={`rating-badge ${getRatingColor(item.vote_average)}`}>
              {item.vote_average.toFixed(1)}
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {item.overview}
          </p>
          
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            <button className="btn-primary flex items-center space-x-2">
              <Play size={20} />
              <span>Play</span>
            </button>
            <button 
              onClick={() => setShowTrailerModal(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Youtube size={20} />
              <span>Trailer</span>
            </button>
            <button 
              onClick={() => setShowCastModal(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Users size={20} />
              <span>Cast</span>
            </button>
            <button 
              onClick={() => toggleBookmark(item)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Bookmark 
                size={20} 
                className={isBookmarked ? 'fill-current text-netflix-red' : ''}
              />
              <span>Bookmark</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {showTrailerModal && (
        <TrailerModal
          item={item}
          contentType={contentType}
          onClose={() => setShowTrailerModal(false)}
        />
      )}

      {/* Cast Modal */}
      {showCastModal && (
        <CastModal
          item={item}
          contentType={contentType}
          onClose={() => setShowCastModal(false)}
        />
      )}
    </div>
  );
};

export default MovieModal;

