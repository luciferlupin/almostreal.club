import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CustomCursor } from './components/CustomCursor';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { motion, AnimatePresence } from 'framer-motion';

import { HomePage } from './pages/HomePage';
import { ObjectsPage } from './pages/ObjectsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PerfumeExperiencePage } from './pages/PerfumeExperiencePage';
import { ArchivePage } from './pages/ArchivePage';
import { ClubPage } from './pages/ClubPage';
import { PrivateRoomPage } from './pages/PrivateRoomPage';
import { CampaignPage } from './pages/CampaignPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainContent: React.FC = () => {
  const { hasEnteredClub, currentRoute } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'new-reality':
        return <CampaignPage />;
      case 'objects':
        return <ObjectsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'perfume-experience':
        return <PerfumeExperiencePage />;
      case 'archive':
        return <ArchivePage />;
      case 'club':
        return <ClubPage />;
      case 'private-room':
        return <PrivateRoomPage />;
      case 'campaign':
        return <CampaignPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F2F0EA] selection:bg-[#F2F0EA] selection:text-[#080808]">
      <div className="noise-overlay" />
      <CustomCursor />
      {!hasEnteredClub && <IntroScreen />}
      <Navbar />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BagDrawer />
      <SearchOverlay />

      {currentRoute !== 'private-room' && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
