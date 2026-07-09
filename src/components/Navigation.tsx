import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Bell, UserCircle, Globe, Accessibility, Menu, X } from 'lucide-react';
import { useStore, translations } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { theme, toggleTheme, language, setLanguage, a11yHighContrast, toggleA11y, user, logout, setLoginModalOpen } = useStore();
  const t = translations[language];
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header p-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold flex items-center gap-1 tracking-tight">
            <span className="gradient-text">Desa</span>Connect
          </Link>
          
          <nav className="nav-links desktop-only">
            <Link to="/" className={location.pathname === '/' ? 'font-bold text-accent-primary' : 'text-secondary'}>
              {t.home}
            </Link>
            <Link to="/app" className={location.pathname === '/app' ? 'font-bold text-accent-primary' : 'text-secondary'}>
              {t.community}
            </Link>
            {user && (
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'font-bold text-accent-primary' : 'text-secondary'}>
                {user.role === 'citizen' ? 'Dasbor Saya' : user.role === 'rtrw' ? 'Dasbor RT/RW' : 'Dasbor Utama'}
              </Link>
            )}
          </nav>
        </div>

        <div className="desktop-only items-center gap-4">
          {/* Notifications */}
          <button className="notification-bell" aria-label="Notifikasi Real-time">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          {/* Accessibility */}
          <button onClick={toggleA11y} title={t.highContrast} aria-label={t.highContrast} className={a11yHighContrast ? 'text-accent-primary' : ''}>
            <Accessibility size={20} />
          </button>

          {/* Theme */}
          <button onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Language */}
          <button onClick={() => setLanguage(language === 'id' ? 'en' : 'id')} aria-label="Ganti Bahasa" className="font-bold flex items-center gap-1">
            <Globe size={16} /> {language.toUpperCase()}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="badge badge-success flex items-center gap-1"><UserCircle size={14}/> {user.name}</span>
              <button onClick={logout} className="text-sm text-secondary hover:text-danger">{t.logout}</button>
            </div>
          ) : (
            <button onClick={() => setLoginModalOpen(true)} className="btn btn-primary text-sm px-6">
              Masuk / Daftar
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mobile-menu-container mt-4 flex flex-col gap-4 overflow-hidden"
          >
            {/* Same controls for mobile, simplified */}
            <nav className="flex flex-col gap-2">
               <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t.home}</Link>
               <Link to="/app" onClick={() => setMobileMenuOpen(false)}>{t.community}</Link>
               {user && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>{user.role === 'citizen' ? 'Dasbor Saya' : user.role === 'rtrw' ? 'Dasbor RT/RW' : 'Dasbor Utama'}</Link>}
            </nav>
            <div className="flex gap-4">
              <button onClick={toggleTheme}>{theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}</button>
              <button onClick={toggleA11y}>{t.highContrast}</button>
              <button onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}>{language === 'id' ? 'English' : 'Bahasa Indonesia'}</button>
            </div>
            {!user && (
               <button onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }} className="btn btn-primary w-full">
                 Masuk / Daftar
               </button>
            )}
            {user && (
              <button onClick={logout} className="btn btn-secondary">{t.logout}</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
