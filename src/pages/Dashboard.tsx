import { useStore } from '../store';
import { Users, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

const CitizenDashboard = () => (
  <div className="flex-col gap-6 mt-8">
    <div className="card" style={{ borderColor: 'var(--accent-primary)' }}>
      <h3 className="font-bold mb-4 text-xl flex items-center gap-2"><User size={24} className="text-accent-primary"/> Aktivitas Saya</h3>
      <div className="grid md-grid-cols-1 grid-cols-2 gap-4">
        <div className="p-4 border rounded-md" style={{ borderColor: 'var(--border)' }}>
          <div className="text-sm text-secondary">Petisi yang Dibuat</div>
          <div className="text-2xl font-bold mt-1">2</div>
        </div>
        <div className="p-4 border rounded-md" style={{ borderColor: 'var(--border)' }}>
          <div className="text-sm text-secondary">Total Donasi Anda</div>
          <div className="text-2xl font-bold mt-1 text-success">Rp 150.000</div>
        </div>
      </div>
    </div>
  </div>
);

const RTRWDashboard = () => (
  <div className="flex-col gap-6 mt-8">
    <h3 className="font-bold mb-4 text-xl flex items-center gap-2"><Users size={24} className="text-warning"/> Pantauan Wilayah RT/RW</h3>
    <div className="grid md-grid-cols-1 grid-cols-3 gap-4 mb-6">
      <div className="card p-4">
        <div className="text-sm text-secondary">Laporan Masuk</div>
        <div className="text-2xl font-bold mt-1">14</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Dalam Proses</div>
        <div className="text-2xl font-bold mt-1 text-warning">5</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Selesai</div>
        <div className="text-2xl font-bold mt-1 text-success">9</div>
      </div>
    </div>
    
    <div className="card">
      <h4 className="font-bold mb-4">Perlu Tindakan Segera</h4>
      <ul className="flex flex-col gap-3">
        <li className="flex justify-between items-center p-3 border rounded-md" style={{borderColor: 'var(--border)'}}>
          <div>
            <div className="font-medium">Perbaikan Pompa Air RW 02</div>
            <div className="text-sm text-secondary">Dilaporkan 2 hari lalu</div>
          </div>
          <button className="btn btn-primary text-sm">Verifikasi Lokasi</button>
        </li>
      </ul>
    </div>
  </div>
);

const SuperadminDashboard = () => (
  <div className="flex-col gap-6 mt-8">
    <h3 className="font-bold mb-4 text-xl flex items-center gap-2"><Shield size={24} className="text-danger"/> Dasbor Utama Desa</h3>
    <div className="grid md-grid-cols-1 grid-cols-4 gap-4 mb-6">
      <div className="card p-4">
        <div className="text-sm text-secondary">Total Penduduk Terdaftar</div>
        <div className="text-2xl font-bold mt-1">3,450</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Dana Desa Terkelola</div>
        <div className="text-2xl font-bold mt-1 text-success">Rp 45M</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Server Uptime</div>
        <div className="text-2xl font-bold mt-1 text-accent-primary">99.9%</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Log Keamanan</div>
        <div className="text-2xl font-bold mt-1">Aman</div>
      </div>
    </div>

    <div className="card">
      <h3 className="font-bold mb-4">Status Integrasi Sistem</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Enkripsi Database (AES-256)</span>
          <span className="badge badge-success">Aktif</span>
        </div>
        <div className="flex items-center justify-between">
          <span>API Dukcapil (Cek NIK)</span>
          <span className="badge badge-success">Terhubung</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Sistem Sinkronisasi Offline</span>
          <span className="badge badge-success">Berjalan</span>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useStore();

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-4"
    >
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold">Selamat datang, {user.name}</h1>
        <p className="text-secondary mt-2">
          Anda masuk sebagai: <span className="font-bold text-accent-primary capitalize">{user.role === 'rtrw' ? 'Pengurus RT/RW' : user.role === 'superadmin' ? 'Perangkat Desa' : 'Warga'}</span>
          {user.verified && <span className="badge badge-success ml-2">Terverifikasi</span>}
        </p>
      </div>

      {user.role === 'citizen' && <CitizenDashboard />}
      {user.role === 'rtrw' && <RTRWDashboard />}
      {user.role === 'superadmin' && <SuperadminDashboard />}
    </motion.div>
  );
};

export default Dashboard;
