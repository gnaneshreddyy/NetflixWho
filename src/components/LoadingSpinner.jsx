import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 'default', 
  className = '',
  showMessage = true 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size] || sizeClasses.default}`}></div>
      {showMessage && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

