import { useStore } from '../store';
import { Users, Shield, User, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return dateString;
};

const CitizenDashboard = ({ petitions }: { petitions: any[] }) => (
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

    <div className="mt-8">
      <h3 className="font-bold mb-4 text-xl">Petisi Terbaru</h3>
      <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
        {petitions.slice(0, 2).map((p, i) => (
          <div key={i} className="card flex-col gap-4 p-6">
            {p.image_url ? (
              <img src={p.image_url} alt={p.title} className="card-image-cover" />
            ) : (
              <div className="card-image-cover bg-gray-100 flex items-center justify-center text-secondary">
                <ImageIcon size={32} opacity={0.5} />
              </div>
            )}
            <h4 className="font-bold text-lg">{p.title}</h4>
            <div className="text-sm text-secondary">Status: {p.status}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RTRWDashboard = ({ events }: { events: any[] }) => (
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
    
    <div className="mt-8">
      <h4 className="font-bold mb-4 text-xl">Acara Lokal Mendatang</h4>
      <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
        {events.slice(0, 2).map((e, i) => (
          <div key={i} className="card flex-col gap-4 p-6">
            {e.image_url ? (
              <img src={e.image_url} alt={e.title} className="card-image-cover" />
            ) : (
              <div className="card-image-cover bg-gray-100 flex items-center justify-center text-secondary">
                <ImageIcon size={32} opacity={0.5} />
              </div>
            )}
            <h4 className="font-bold text-lg">{e.title}</h4>
            <div className="text-sm text-secondary">{formatDate(e.date)} • {e.location}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SuperadminDashboard = ({ funds }: { funds: any[] }) => (
  <div className="flex-col gap-6 mt-8">
    <h3 className="font-bold mb-4 text-xl flex items-center gap-2"><Shield size={24} className="text-danger"/> Dasbor Utama Desa</h3>
    <div className="grid md-grid-cols-1 grid-cols-4 gap-4 mb-6">
      <div className="card p-4">
        <div className="text-sm text-secondary">Total Penduduk</div>
        <div className="text-2xl font-bold mt-1">3,450</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Dana Desa</div>
        <div className="text-2xl font-bold mt-1 text-success">Rp 45M</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Uptime</div>
        <div className="text-2xl font-bold mt-1 text-accent-primary">99.9%</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-secondary">Keamanan</div>
        <div className="text-2xl font-bold mt-1">Aman</div>
      </div>
    </div>

    <div className="mt-8">
      <h3 className="font-bold mb-4 text-xl">Galang Dana Aktif</h3>
      <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
        {funds.slice(0, 2).map((f, i) => (
          <div key={i} className="card flex-col gap-4 p-6">
            {f.image_url ? (
              <img src={f.image_url} alt={f.title} className="card-image-cover" />
            ) : (
              <div className="card-image-cover bg-gray-100 flex items-center justify-center text-secondary">
                <ImageIcon size={32} opacity={0.5} />
              </div>
            )}
            <h4 className="font-bold text-lg">{f.title}</h4>
            <div className="text-sm text-secondary">Rp {(f.collected).toLocaleString('id-ID')} / Rp {(f.target).toLocaleString('id-ID')}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, petitions, events, funds } = useStore();

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

      {user.role === 'citizen' && <CitizenDashboard petitions={petitions} />}
      {user.role === 'rtrw' && <RTRWDashboard events={events} />}
      {user.role === 'superadmin' && <SuperadminDashboard funds={funds} />}
    </motion.div>
  );
};

export default Dashboard;
