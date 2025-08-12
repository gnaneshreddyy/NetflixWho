import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorDisplay = ({ error, onRetry, className = '' }) => {
  const getErrorIcon = (errorMessage) => {
    if (errorMessage.includes('Network error')) {
      return '🌐';
    } else if (errorMessage.includes('authentication')) {
      return '🔐';
    } else if (errorMessage.includes('Too many requests')) {
      return '⏰';
    } else if (errorMessage.includes('Server error')) {
      return '🔧';
    }
    return '⚠️';
  };

  const getErrorTitle = (errorMessage) => {
    if (errorMessage.includes('Network error')) {
      return 'Connection Problem';
    } else if (errorMessage.includes('authentication')) {
      return 'Authentication Error';
    } else if (errorMessage.includes('Too many requests')) {
      return 'Rate Limited';
    } else if (errorMessage.includes('Server error')) {
      return 'Server Error';
    }
    return 'Something went wrong';
  };

  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 text-2xl">
          {getErrorIcon(error)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            {getErrorTitle(error)}
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors duration-200"
            >
              <RefreshCw size={16} />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;

