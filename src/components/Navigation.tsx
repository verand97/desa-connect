import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Bell, UserCircle, Globe, Accessibility, Menu, X } from 'lucide-react';
import { useStore, translations } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { theme, toggleTheme, language, setLanguage, a11yHighContrast, toggleA11y, user, login, logout } = useStore();
  const t = translations[language];
  const location = useLocation();
  const [usernameInput, setUsernameInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (e: React.FormEvent, role: 'citizen' | 'official' = 'citizen') => {
    e.preventDefault();
    login(usernameInput, role);
    setUsernameInput('');
  };

  return (
    <header className="header p-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold flex items-center gap-1 tracking-tight">
            <span className="gradient-text">Desa</span>Connect
          </Link>
          
          <nav className="nav-links desktop-only">
            <Link to="/" className={location.pathname === '/' ? 'font-bold text-primary' : 'text-secondary'}>
              {t.home}
            </Link>
            {user?.role === 'official' && (
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'font-bold text-primary' : 'text-secondary'}>
                {t.dashboard}
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
            <form onSubmit={handleLogin} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Nama Samaran..." 
                className="input" 
                style={{padding: '0.25rem 0.5rem', width: '150px'}}
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                maxLength={30}
                aria-label="Masukkan Nama Samaran"
              />
              <button type="submit" className="btn btn-primary text-sm">Masuk Warga</button>
              <button type="button" onClick={(e) => handleLogin(e, 'official')} className="btn btn-secondary text-sm">Perangkat</button>
            </form>
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
               {user?.role === 'official' && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>{t.dashboard}</Link>}
            </nav>
            <div className="flex gap-4">
              <button onClick={toggleTheme}>{theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}</button>
              <button onClick={toggleA11y}>{t.highContrast}</button>
              <button onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}>{language === 'id' ? 'English' : 'Bahasa Indonesia'}</button>
            </div>
            {!user && (
               <form onSubmit={handleLogin} className="flex flex-col gap-2">
               <input 
                 type="text" 
                 placeholder="Nama Samaran..." 
                 className="input" 
                 value={usernameInput}
                 onChange={e => setUsernameInput(e.target.value)}
                 maxLength={30}
               />
               <button type="submit" className="btn btn-primary w-full">Masuk Warga</button>
             </form>
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
