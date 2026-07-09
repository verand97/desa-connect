import React from 'react';
import { useStore, translations } from '../store';
import { Users, FileText, CheckCircle, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { language } = useStore();
  const t = translations[language];

  // Mock Analytics Data
  const stats = [
    { label: 'Total Warga Terverifikasi', value: '1,245', icon: Users, color: 'var(--accent-primary)' },
    { label: 'Petisi Aktif', value: '8', icon: FileText, color: 'var(--warning)' },
    { label: 'Perbaikan Selesai', value: '12', icon: CheckCircle, color: 'var(--success)' },
    { label: 'Laporan Mendesak', value: '2', icon: AlertOctagon, color: 'var(--danger)' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t.analytics}</h1>
      
      <div className="grid md-grid-cols-1 grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="card flex items-center gap-4"
          >
            <div className="p-3 rounded-full" style={{backgroundColor: `${stat.color}20`, color: stat.color}}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-secondary">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-bold mb-4">Aspirasi Paling Mendesak</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between items-center p-3 border rounded-md" style={{borderColor: 'var(--border)'}}>
              <div>
                <div className="font-medium">Perbaikan Pompa Air RW 02</div>
                <div className="text-sm text-secondary">324 Dukungan - Sangat Mendesak</div>
              </div>
              <button className="btn btn-primary text-sm">Tindak Lanjuti</button>
            </li>
            <li className="flex justify-between items-center p-3 border rounded-md" style={{borderColor: 'var(--border)'}}>
              <div>
                <div className="font-medium">Penambalan Jalan Desa</div>
                <div className="text-sm text-secondary">210 Dukungan - Mendesak</div>
              </div>
              <button className="btn btn-primary text-sm">Tindak Lanjuti</button>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="font-bold mb-4">Status Integrasi Keamanan</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span>Enkripsi Data (AES-256)</span>
              <span className="badge badge-success">Aktif</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Verifikasi NIK (Dukcapil API)</span>
              <span className="badge badge-success">Terhubung</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-Sync Mode Offline</span>
              <span className="badge badge-success">Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
