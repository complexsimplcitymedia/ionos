import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import GalleryPage from './components/GalleryPage';
import CarCarePage from './components/CarCarePage';
import FAQPage from './components/FAQPage';
import FAQAIPage from './components/FAQAIPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ThemeToggle from './components/ThemeToggle';
import AppointmentModal from './components/AppointmentModal';
import Logo from './components/Logo';
import WrapBrands from './components/WrapBrands';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const getPageTitle = (page: string) => {
    if (page === 'faq') return 'FAQ';
    if (page === 'faqai') return 'AI Assistant';
    if (page === 'wrap-brands') return 'Wrap Brands';
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  useEffect(() => {
    const handleNavigation = (e: CustomEvent) => {
      setCurrentPage(e.detail);
    };
    window.addEventListener('navigate' as any, handleNavigation);
    return () => window.removeEventListener('navigate' as any, handleNavigation);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
      
      <header className="fixed w-full z-50">
        <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10">
          <div className="flex justify-center items-center py-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <img 
                src="https://lh3.googleusercontent.com/JrfHUooYKBIw5QMd7Zb1v9PB8uqBqVv5mwpFUtGWjDRCcFAK96--l8RTgnBsVF53IlkVG7F0psXTIXKwz6aGlgkau5wMULIov-E-rHM=s192"
                alt="Kustom Auto Wrx Logo"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-white">
                Kustom Auto Wrx | Gainesville Auto Customization Experts
              </h1>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="hidden lg:flex items-center space-x-6 py-4">
                {['home', 'services', 'wrap-brands', 'pricing', 'car-care', 'gallery', 'faq', 'faqai', 'about', 'contact'].map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`text-white font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-lg ${
                      currentPage === page ? 'bg-blue-600' : 'hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getPageTitle(page)}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAppointmentOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </motion.button>
              </div>

              <button
                className="lg:hidden p-4"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className="px-4 pt-2 pb-4 space-y-2">
              {['home', 'services', 'wrap-brands', 'pricing', 'car-care', 'gallery', 'faq', 'faqai', 'about', 'contact'].map((page) => (
                <motion.button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-white font-medium px-3 py-2 rounded-lg ${
                    currentPage === page ? 'bg-blue-600' : 'hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {getPageTitle(page)}
                </motion.button>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsAppointmentOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      <main className="min-h-screen pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <Hero onOpenAppointment={() => setIsAppointmentOpen(true)} />}
            {currentPage === 'services' && <ServicesPage onOpenAppointment={() => setIsAppointmentOpen(true)} />}
            {currentPage === 'wrap-brands' && <WrapBrands />}
            {currentPage === 'pricing' && <PricingPage onOpenAppointment={() => setIsAppointmentOpen(true)} />}
            {currentPage === 'car-care' && <CarCarePage />}
            {currentPage === 'gallery' && <GalleryPage />}
            {currentPage === 'faq' && <FAQPage />}
            {currentPage === 'faqai' && <FAQAIPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </div>
  );
}

export default App;