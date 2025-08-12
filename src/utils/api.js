import axios from 'axios';

// API Configuration
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTA1MTE3MzJlYjIyNjA3OTM2NjgwZWMxNDQ3OTM1OSIsIm5iZiI6MTc0MDgwMjY3My41MDg5OTk4LCJzdWIiOiI2N2MyOGE3MWJmNjYwNzc0ODk2ZGQxYzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oC2XyJlU0aybfBkeeHIi5a3sqeVQMzeeQ_UTVdhQ9IQ';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'accept': 'application/json'
  },
});

// API functions
export const fetchTrending = async (contentType = 'movie') => {
  try {
    const response = await api.get(`/trending/${contentType}/week`);
    return response.data.results;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check your credentials.');
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch trending content. Please try again.');
    }
  }
};

export const searchContent = async (query, contentType = 'movie') => {
  try {
    const response = await api.get(`/search/${contentType}`, {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check your credentials.');
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to search content. Please try again.');
    }
  }
};

export const filterByGenre = async (genreId, contentType = 'movie') => {
  try {
    const response = await api.get(`/discover/${contentType}`, {
      params: { with_genres: genreId },
    });
    return response.data.results;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check your credentials.');
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to filter by genre. Please try again.');
    }
  }
};

// Fetch movie/TV show trailers
export const fetchTrailers = async (contentId, contentType = 'movie') => {
  try {
    const response = await api.get(`/${contentType}/${contentId}/videos`);
    return response.data.results;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check your credentials.');
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch trailers. Please try again.');
    }
  }
};

// Fetch movie/TV show cast
export const fetchCast = async (contentId, contentType = 'movie') => {
  try {
    const response = await api.get(`/${contentType}/${contentId}/credits`);
    return response.data.cast.slice(0, 10); // Return top 10 cast members
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check your credentials.');
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Failed to fetch cast. Please try again.');
    }
  }
};

// Image URL helper
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Rating color helper
export const getRatingColor = (rating) => {
  if (rating >= 8) return 'bg-green-500';
  if (rating >= 6) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default api;

