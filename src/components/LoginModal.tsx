import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

const LoginModal = () => {
  const { loginModalOpen, setLoginModalOpen, login } = useStore();
  const [activeTab, setActiveTab] = useState<'citizen' | 'rtrw' | 'superadmin'>('citizen');
  
  const [username, setUsername] = useState('');
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setLoginModalOpen(false);
    setUsername('');
    setNik('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'citizen') {
      login(username, 'citizen', nik);
    } else {
      if (password === 'admin123') {
        login(username || (activeTab === 'rtrw' ? 'Admin RT/RW' : 'Superadmin Desa'), activeTab);
      } else {
        alert('Password salah! (Gunakan: admin123)');
      }
    }
  };

  if (!loginModalOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card"
        style={{ width: '100%', maxWidth: '450px', position: 'relative', padding: '2rem' }}
      >
        <button onClick={handleClose} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}>
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Masuk ke Sistem</h2>
        
        {/* Tabs */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <button 
            style={{ flex: 1, padding: '0.75rem 0.5rem', fontSize: '0.875rem', fontWeight: 600, backgroundColor: activeTab === 'citizen' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'citizen' ? '#fff' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('citizen')}
          >
            Warga
          </button>
          <button 
            style={{ flex: 1, padding: '0.75rem 0.5rem', fontSize: '0.875rem', fontWeight: 600, backgroundColor: activeTab === 'rtrw' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'rtrw' ? '#fff' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('rtrw')}
          >
            RT/RW
          </button>
          <button 
            style={{ flex: 1, padding: '0.75rem 0.5rem', fontSize: '0.875rem', fontWeight: 600, backgroundColor: activeTab === 'superadmin' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'superadmin' ? '#fff' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('superadmin')}
          >
            Perangkat
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeTab === 'citizen' ? (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Nama Samaran (Opsional)</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Contoh: Warga_01" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>NIK (Opsional)</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="16 Digit NIK" 
                  maxLength={16}
                  value={nik}
                  onChange={e => setNik(e.target.value)}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Jika diisi lengkap 16 digit, Anda otomatis menjadi Warga Terverifikasi.</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>ID / Username Petugas</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Masukkan ID Petugas" 
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Kata Sandi</label>
                <input 
                  type="password" 
                  className="input" 
                  placeholder="Gunakan: admin123" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', fontSize: '1.125rem', padding: '0.875rem' }}>
            Masuk
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginModal;
