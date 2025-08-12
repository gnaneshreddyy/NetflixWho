const Footer = () => {
  return (
    <footer className="bg-netflix-black text-gray-400 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-netflix-red mb-1">MovieVault </h3>
            <p className="text-xs text-yellow-400 mb-1">Netflix who!!!!!</p>
            <p className="text-sm mb-4">
              Hey there! This is my project for ADG Round 2 selection. I built this movie app using React and Tailwind CSS. 
              
            </p>
            <div className="bg-gray-800 p-3 rounded-lg mb-4">
              <p className="text-xs text-yellow-400 mb-1">Built for ADG Round 2 Selection</p>
              <p className="text-xs">
                Tech Stack: React + Vite + Tailwind CSS + TMDb API
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">What I Built</h4>
            <ul className="space-y-2 text-sm">
              <li>Trending Movies & TV Shows</li>
              <li>Search & Filter by Genre</li>
              <li>Bookmark Your Favorites</li>
              <li>Watch Trailers</li>
              <li>Cast Information</li>
              <li>Dark/Light Theme</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p className="mb-2">
            <span className="text-yellow-400">ADG Round 2 Project</span> 
            
          </p>
          <p className="text-xs text-gray-500 mb-2">
            This is a demo project - not a real streaming service!
          </p>
          <p className="text-xs">
            Movie data from{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-netflix-red hover:underline"
            >
              TMDb
            </a>
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

