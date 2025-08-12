import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchTrending, searchContent, filterByGenre } from '../utils/api';
import { STORAGE_KEYS } from '../utils/constants';

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [contentType, setContentType] = useState('movie');
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useLocalStorage(STORAGE_KEYS.BOOKMARKS, []);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Fetch trending content
  const fetchTrendingContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchTrending(contentType);
      setTrending(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  // Search content
  const searchContentHandler = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchContent(searchQuery, contentType);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Real-time search with debouncing
  const debouncedSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchContent(query, contentType);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  // Filter by genre
  const filterByGenreHandler = async (genreId) => {
    if (!genreId) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await filterByGenre(genreId, contentType);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Toggle bookmark
  const toggleBookmark = (item) => {
    const isBookmarked = bookmarks.some(bookmark => 
      bookmark.id === item.id && bookmark.media_type === contentType
    );

    if (isBookmarked) {
      setBookmarks(bookmarks.filter(bookmark => 
        !(bookmark.id === item.id && bookmark.media_type === contentType)
      ));
    } else {
      setBookmarks([...bookmarks, { ...item, media_type: contentType }]);
    }
  };

  // Handle content type change
  const handleContentTypeChange = (type) => {
    setContentType(type);
    setSelectedGenre('');
    setSearchResults([]);
    setSearchQuery('');
    setShowBookmarks(false);
    setError(null); // Clear any existing errors when switching content type
  };

  // Handle genre selection
  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setError(null); // Clear any existing errors when selecting genre
    filterByGenreHandler(genreId);
  };

  // Load trending content on mount and content type change
  useEffect(() => {
    fetchTrendingContent();
  }, [fetchTrendingContent]);

  // Real-time search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        setShowBookmarks(false);
        setError(null); // Clear any existing errors when searching
        debouncedSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, debouncedSearch]);

  const value = {
    contentType,
    trending,
    searchResults,
    selectedGenre,
    searchQuery,
    loading,
    error,
    bookmarks,
    showBookmarks,
    setSearchQuery,
    setSelectedGenre,
    setShowBookmarks,
    fetchTrendingContent,
    searchContentHandler,
    debouncedSearch,
    filterByGenreHandler,
    toggleBookmark,
    handleContentTypeChange,
    handleGenreSelect,
    clearError
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

