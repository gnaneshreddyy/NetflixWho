import { X, User } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { fetchCast, getImageUrl } from '../utils/api';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

const CastModal = ({ item, contentType, onClose }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCast = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchCast(item.id, contentType);
      setCast(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [item.id, contentType]);

  useEffect(() => {
    if (item) {
      loadCast();
    }
  }, [item, loadCast]);

  const closeModal = () => {
    onClose();
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-netflix-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Cast - {item.title || item.name}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <LoadingSpinner message="Loading cast..." />
          ) : error ? (
            <ErrorDisplay 
              error={error} 
              onRetry={loadCast}
            />
          ) : cast.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Top cast members for this {contentType === 'movie' ? 'movie' : 'TV show'}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cast.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {member.profile_path ? (
                        <img
                          src={getImageUrl(member.profile_path, 'w185')}
                          alt={member.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {member.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <User size={48} />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No cast information available
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Cast information for this {contentType === 'movie' ? 'movie' : 'TV show'} is not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastModal;
