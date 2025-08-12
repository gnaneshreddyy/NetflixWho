import { useMovieContext } from '../context/MovieContext';
import { GENRES } from '../utils/constants';

const GenreFilter = () => {
  const { contentType, selectedGenre, handleGenreSelect } = useMovieContext();

  return (
    <section className="py-8 bg-gray-50 dark:bg-netflix-black/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Genres</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleGenreSelect('')}
            className={`genre-tag ${!selectedGenre ? 'bg-netflix-red text-white' : ''}`}
          >
            All
          </button>
          {GENRES[contentType].map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreSelect(genre.id)}
              className={`genre-tag ${selectedGenre === genre.id ? 'bg-netflix-red text-white' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreFilter;

