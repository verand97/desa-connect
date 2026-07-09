import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

const LoginModal = () => {
  const { loginModalOpen, setLoginModalOpen, login } = useStore();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nik, setNik] = useState('');

  const [isRegister, setIsRegister] = useState(false);

  const handleClose = () => {
    setLoginModalOpen(false);
    setUsername('');
    setPassword('');
    setNik('');
    setIsRegister(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Cek admin
    if (password === 'admin123') {
      if (username.toLowerCase() === 'rtrw') {
        login('Admin RT/RW', 'rtrw');
      } else {
        login(username || 'Superadmin Desa', 'superadmin');
      }
      return;
    }

    // 2. Warga (Kredensial disimulasikan diterima)
    if (nik) {
      if (/^\d{16}$/.test(nik)) {
        login(username, 'citizen', nik);
      } else {
        alert('NIK harus berupa 16 digit angka!');
      }
    } else {
      // Warga Anonim
      login(username, 'citizen');
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
        style={{ width: '100%', maxWidth: '400px', position: 'relative', padding: '2rem' }}
      >
        <button onClick={handleClose} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}>
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-center">{isRegister ? 'Daftar Akun Warga' : 'Masuk ke Sistem'}</h2>
        <p className="text-secondary text-sm text-center mb-6">
          {isRegister ? 'Buat identitas anonim Anda sekarang' : 'Gunakan satu pintu untuk semua akses'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
              {isRegister ? 'Nama Samaran / Email' : 'ID Akun / Nama Samaran'}
            </label>
            <input 
              type="text" 
              className="input" 
              placeholder={isRegister ? "Pilih nama samaran Anda" : "Masukkan identitas Anda"} 
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
              placeholder={isRegister ? "Buat kata sandi yang kuat" : "Masukkan kata sandi"} 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <hr style={{ flex: 1, borderColor: 'var(--border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pilihan Tambahan</span>
            <hr style={{ flex: 1, borderColor: 'var(--border)' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Verifikasi NIK (Opsional)</label>
            <input 
              type="text" 
              className="input" 
              placeholder="16 Digit NIK khusus Warga"
              maxLength={16}
              value={nik}
              onChange={e => setNik(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', fontSize: '1.125rem', padding: '0.875rem' }}>
            {isRegister ? 'Daftar Sekarang' : 'Masuk'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {isRegister ? (
            <>
              Sudah punya akun?{' '}
              <button onClick={() => setIsRegister(false)} style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'underline' }}>
                Masuk di sini
              </button>
            </>
          ) : (
            <>
              Warga baru?{' '}
              <button onClick={() => setIsRegister(true)} style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'underline' }}>
                Daftar akun
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
