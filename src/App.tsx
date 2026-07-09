import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore, translations } from './store';
import Navigation from './components/Navigation';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
  const { isOffline, setOffline, language, user } = useStore();
  const t = translations[language];

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      // Simulate auto-sync
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
      <Navigation />
      <LoginModal />
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={(user?.role === 'rtrw' || user?.role === 'superadmin') ? <Dashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
