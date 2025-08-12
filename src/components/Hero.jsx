import { Play, Info } from 'lucide-react';
import { getImageUrl } from '../utils/api';
import { useMovieContext } from '../context/MovieContext';

const Hero = ({ onShowDetails }) => {
  const { trending, searchQuery, selectedGenre, showBookmarks } = useMovieContext();
  
  const item = trending[0];
  
  if (!item || searchQuery || selectedGenre || showBookmarks) return null;

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(item.backdrop_path, 'w1280')}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 text-white">
            {item.title || item.name}
          </h1>
          <p className="text-lg text-gray-300 mb-6 line-clamp-3">
            {item.overview}
          </p>
          <div className="flex items-center space-x-4">
            <button className="btn-primary flex items-center space-x-2">
              <Play size={20} />
              <span>Play</span>
            </button>
            <button 
              onClick={() => onShowDetails(item)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Info size={20} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
