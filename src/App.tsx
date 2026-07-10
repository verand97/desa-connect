import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore, translations } from './store';
import Navigation from './components/Navigation';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

// Komponen internal untuk Toast
const ToastContainer = () => {
  const { toasts, removeToast } = useStore();
  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.5rem', pointerEvents: 'none' }}>
      <AnimatePresence>
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.2)' : isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                color: isSuccess ? '#047857' : isError ? '#b91c1c' : '#1d4ed8',
                backdropFilter: 'blur(12px)',
                width: '320px'
              }}
            >
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {isSuccess ? <CheckCircle size={18} /> : 
                 isError ? <AlertTriangle size={18} /> : 
                 <Info size={18} />}
              </div>
              <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, paddingRight: '1rem' }}>{toast.message}</div>
              <button 
                onClick={() => removeToast(toast.id)} 
                style={{ opacity: 0.5, cursor: 'pointer', background: 'transparent', border: 'none', color: 'inherit' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const { isOffline, setOffline, language, user, fetchData } = useStore();
  const t = translations[language];

  useEffect(() => {
    fetchData();

    const handleOnline = () => {
      setOffline(false);
      console.log('Online: Syncing data securely...');
    };
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline]);

  return (
    <BrowserRouter>
      {isOffline && (
        <div className="offline-banner" role="alert" aria-live="assertive">
          {t.offline}
        </div>
      )}
      <ToastContainer />
      <Navigation />
      <LoginModal />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
