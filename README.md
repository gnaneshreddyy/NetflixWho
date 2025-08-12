# MovieVault 🎬

A Netflix-style movie and TV show dashboard built with React, Tailwind CSS, and TMDb API. Discover trending content, search by name or genre, and bookmark your favorites.

## ✨ Features

- **🎭 Netflix-style UI**: Modern, responsive design with dark/light theme toggle
- **🔍 Search & Filter**: Search movies/TV shows by name or filter by genre
- **⭐ Trending Content**: View the latest trending movies and TV shows
- **🔖 Bookmark System**: Save your favorite content for easy access
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark/Light Mode**: Toggle between dark and light themes
- **🎬 Content Details**: View detailed information, ratings, and descriptions
- **⚡ Real-time Data**: Fetches live data from TMDb API
- **🎨 Smooth Animations**: Hover effects and smooth transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movieVault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **TMDb API** - Movie and TV show data

## 📱 Features in Detail

### Search & Discovery
- Search for movies and TV shows by title
- Filter content by genre (Action, Comedy, Drama, etc.)
- Switch between Movies and TV Shows
- View trending content on the homepage

### Bookmark System
- Click the bookmark icon to save content
- Bookmarks are stored locally in your browser
- View bookmark count in the header
- Access your saved content anytime

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth scrolling and navigation

### Theme Toggle
- Dark mode (default) for Netflix-like experience
- Light mode for daytime viewing
- Theme preference is maintained across sessions

## 🎨 UI Components

- **Hero Section**: Featured trending content with backdrop image
- **Content Grid**: Responsive grid layout for movies/shows
- **Genre Filter**: Easy-to-use genre selection
- **Search Bar**: Real-time search functionality
- **Modal Details**: Detailed view with ratings and descriptions
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🔧 API Integration

The app uses the TMDb (The Movie Database) API to fetch:
- Trending movies and TV shows
- Search results
- Genre-based filtering
- Movie/show details and ratings

## 📁 Project Structure

```
movieVault/
├── public/
│   └── placeholder-movie.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Tailwind CSS and custom styles
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## 🎯 Usage

1. **Browse Trending**: View the latest trending content on the homepage
2. **Search**: Use the search bar to find specific movies or TV shows
3. **Filter by Genre**: Click on genre tags to filter content
4. **Switch Content Type**: Toggle between Movies and TV Shows
5. **Bookmark**: Click the bookmark icon to save content
6. **View Details**: Click "More Info" to see detailed information
7. **Toggle Theme**: Use the sun/moon icon to switch themes

## 🚀 Deployment

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie and TV show data
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [React](https://reactjs.org/) for the powerful frontend framework

---

Made with ❤️ for movie and TV show enthusiasts!
