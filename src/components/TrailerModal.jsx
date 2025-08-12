import { X, Play, AlertCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { fetchTrailers } from '../utils/api';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

const TrailerModal = ({ item, contentType, onClose }) => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const loadTrailers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchTrailers(item.id, contentType);
      // Filter for official trailers and teasers
      const officialTrailers = results.filter(video => 
        video.type === 'Trailer' && 
        (video.name.toLowerCase().includes('official') || 
         video.name.toLowerCase().includes('teaser') ||
         video.name.toLowerCase().includes('trailer'))
      );
      setTrailers(officialTrailers.length > 0 ? officialTrailers : results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [item.id, contentType]);

  useEffect(() => {
    if (item) {
      loadTrailers();
    }
  }, [item, contentType, loadTrailers]);

  const handleTrailerSelect = (trailer) => {
    setSelectedTrailer(trailer);
  };

  const closeModal = () => {
    setSelectedTrailer(null);
    onClose();
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">
            {selectedTrailer ? 'Watch Trailer' : 'Trailers'} - {item.title || item.name}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <LoadingSpinner message="Loading trailers..." />
          ) : error ? (
            <ErrorDisplay 
              error={error} 
              onRetry={loadTrailers}
            />
          ) : selectedTrailer ? (
            /* Selected Trailer View */
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
                  title={selectedTrailer.name}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedTrailer.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {selectedTrailer.type} • {new Date(selectedTrailer.published_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedTrailer(null)}
                className="btn-secondary"
              >
                ← Back to All Trailers
              </button>
            </div>
          ) : trailers.length > 0 ? (
            /* Trailer List View */
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Select a trailer to watch:
              </p>
              <div className="grid gap-4">
                {trailers.map((trailer) => (
                  <div
                    key={trailer.key}
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => handleTrailerSelect(trailer)}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`}
                        alt={trailer.name}
                        className="w-32 h-20 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{trailer.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {trailer.type} • {new Date(trailer.published_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Play size={20} className="text-netflix-red" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No trailers available for this {contentType === 'movie' ? 'movie' : 'TV show'}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
