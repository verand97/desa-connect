import { useState } from 'react';
import { useStore, translations } from '../store';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const mockPetitions = [
  { id: 1, title: 'Perbaikan Lampu Jalan RT 03', status: 'approved', signatures: 145, target: 150, date: '2026-07-01' },
  { id: 2, title: 'Pembangunan Saluran Air Antisipasi Banjir', status: 'pending', signatures: 89, target: 200, date: '2026-07-05' },
];

const mockFunds = [
  { id: 1, title: 'Renovasi Poskamling RW 05', collected: 1500000, target: 5000000, donors: 34 },
];

const Home = () => {
  const { language, user, isOffline } = useStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'petitions' | 'funds' | 'events'>('petitions');

  return (
    <div className="flex-col gap-6">
      <header className="mb-12 text-center mt-6">
        <h1 className="text-3xl md-text-4xl font-extrabold mb-4">
          Platform Kolaborasi <span className="gradient-text">Komunitas Lokal</span>
        </h1>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          Suarakan aspirasi, galang dana, dan majukan lingkungan secara transparan dengan mudah.
        </p>
        {!user && (
          <div className="mt-8 p-4 max-w-3xl mx-auto flex items-start text-left gap-3" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--warning)', backgroundColor: 'rgba(217, 119, 6, 0.05)' }}>
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} color="var(--warning)"/>
            <span className="text-sm font-medium" style={{ color: '#b45309' }}>Anda belum terverifikasi. Masukkan NIK Anda di kanan atas untuk ikut berpartisipasi dan berdiskusi. Data terenkripsi dengan aman.</span>
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b" style={{borderColor: 'var(--border)'}}>
        <button onClick={() => setActiveTab('petitions')} className={`tab-btn ${activeTab === 'petitions' ? 'active' : ''}`}>{t.petitions}</button>
        <button onClick={() => setActiveTab('funds')} className={`tab-btn ${activeTab === 'funds' ? 'active' : ''}`}>{t.funds}</button>
        <button onClick={() => setActiveTab('events')} className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}>{t.events}</button>
      </div>

      {/* Content */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'petitions' && (
          <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
            {mockPetitions.map(p => (
              <div key={p.id} className="card flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  {p.status === 'approved' ? (
                     <span className="badge badge-success"><CheckCircle size={12} className="inline mr-1"/> Disetujui</span>
                  ) : (
                     <span className="badge badge-warning"><Clock size={12} className="inline mr-1"/> Menunggu Verifikasi</span>
                  )}
                </div>
                <div className="text-sm text-secondary mb-4">Dibuat: {p.date}</div>
                
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-primary">{p.signatures} Dukungan</span>
                    <span className="text-secondary">Target: {p.target}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${Math.min(100, (p.signatures/p.target)*100)}%`}}></div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="btn btn-primary flex-1" disabled={!user || isOffline}>
                    <ThumbsUp size={16} /> {t.supportPetition}
                  </button>
                  <button className="btn btn-secondary flex-1">
                    <MessageSquare size={16} /> Diskusi (Transparan)
                  </button>
                </div>
              </div>
            ))}
            <div className="card flex items-center justify-center border-dashed cursor-pointer hover:bg-opacity-50" style={{borderStyle: 'dashed'}}>
              <div className="text-center text-secondary">
                <div className="text-2xl mb-2">+</div>
                <div className="font-bold">{t.createPetition}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funds' && (
          <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
             {mockFunds.map(f => (
               <div key={f.id} className="card flex-col gap-4">
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <div className="text-sm mb-4">{f.donors} Donatur telah berpartisipasi</div>
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span>Rp {(f.collected).toLocaleString('id-ID')}</span>
                      <span>Target: Rp {(f.target).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${Math.min(100, (f.collected/f.target)*100)}%`}}></div>
                    </div>
                  </div>
                  <button className="btn btn-primary mt-4 w-full" disabled={!user || isOffline}>
                    {t.donate}
                  </button>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="text-center py-8 text-secondary">
            Belum ada acara lokal minggu ini.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
