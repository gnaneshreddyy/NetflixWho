import { useState } from 'react';
import { MovieProvider } from './context/MovieContext';
import { 
  Navbar, 
  Hero, 
  GenreFilter, 
  ContentGrid, 
  MovieModal, 
  Footer 
} from './components';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <MovieProvider>
      <div className="min-h-screen bg-white dark:bg-netflix-black">
        <Navbar />
        
        <main className="pt-20">
          <Hero 
            onShowDetails={handleShowDetails}
          />
          <GenreFilter />
          <ContentGrid onShowDetails={handleShowDetails} />
        </main>

        <Footer />

        {/* Modal for Item Details */}
        {selectedItem && (
          <MovieModal 
            item={selectedItem} 
            onClose={handleCloseModal}
          />
        )}
      </div>
    </MovieProvider>
  );
}

export default App;
