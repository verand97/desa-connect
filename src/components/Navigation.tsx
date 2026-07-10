import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Bell, UserCircle, Globe, Accessibility, Menu, X, CheckCircle, Heart, Calendar } from 'lucide-react';
import { useStore, translations } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { theme, toggleTheme, language, setLanguage, a11yHighContrast, toggleA11y, user, setLoginModalOpen } = useStore();
  const t = translations[language];
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);
  const notifRef = useRef<HTMLDivElement>(null);

  // Tutup notif saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header p-4 relative z-50">
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
          <div className="relative" ref={notifRef}>
            <button 
              className="notification-bell" 
              aria-label="Notifikasi Real-time"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell size={20} />
              {notifCount > 0 && (
                <span className="notification-badge">{notifCount}</span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="modal-glass"
                  style={{ 
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 10px)',
                    width: '320px',
                    zIndex: 50,
                  }}
                >
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-bold text-sm">Notifikasi Baru</span>
                    {notifCount > 0 && (
                      <span style={{ backgroundColor: 'var(--accent-primary)', color: 'white', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{notifCount}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '350px', overflowY: 'auto' }}>
                    
                    {notifCount > 0 ? (
                      <>
                        {/* Item 1 */}
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ color: 'var(--success)' }}>
                            <CheckCircle size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Petisi Tembus Target!</div>
                            <div className="text-xs text-secondary mt-1" style={{ lineHeight: 1.5 }}>Petisi <b>"Perbaikan Lampu Jalan RT 03"</b> telah mencapai target 150 suara.</div>
                            <div style={{ fontSize: '10px', color: 'gray', marginTop: '0.5rem' }}>2 menit yang lalu</div>
                          </div>
                        </div>

                        {/* Item 2 */}
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ color: 'var(--danger)' }}>
                            <Heart size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Donasi Masuk (Rp 150.000)</div>
                            <div className="text-xs text-secondary mt-1" style={{ lineHeight: 1.5 }}>Hamba Allah baru saja berdonasi untuk <b>Renovasi Poskamling</b>.</div>
                            <div style={{ fontSize: '10px', color: 'gray', marginTop: '0.5rem' }}>1 jam yang lalu</div>
                          </div>
                        </div>

                        {/* Item 3 */}
                        <div style={{ padding: '1rem', cursor: 'pointer', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ color: 'var(--accent-primary)' }}>
                            <Calendar size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Acara Baru Mendatang</div>
                            <div className="text-xs text-secondary mt-1" style={{ lineHeight: 1.5 }}>Persiapkan dirimu, <b>"Kerja Bakti Akbar"</b> akan diadakan akhir pekan ini.</div>
                            <div style={{ fontSize: '10px', color: 'gray', marginTop: '0.5rem' }}>1 hari yang lalu</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ opacity: 0.3, marginBottom: '0.5rem' }}><Bell size={40} style={{ margin: '0 auto' }} /></div>
                        <div style={{ fontSize: '0.875rem' }}>Belum ada notifikasi baru</div>
                      </div>
                    )}

                  </div>
                  {notifCount > 0 && (
                    <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                      <button 
                        className="text-sm font-semibold gradient-text"
                        onClick={() => {
                          setNotifCount(0);
                        }}
                      >
                        Tandai semua dibaca
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            </div>
          ) : (
            <button onClick={() => setLoginModalOpen(true)} className="btn btn-primary text-sm px-6">
              {t.loginBtn}
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
                 {t.loginBtn}
               </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
