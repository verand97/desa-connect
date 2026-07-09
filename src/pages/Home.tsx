import { useState } from 'react';
import { useStore, translations } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, MessageSquare, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';



const Home = () => {
  const { language, user, isOffline, petitions, funds, supportPetition, createPetition, donate } = useStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'petitions' | 'funds' | 'events'>('petitions');
  const [petitionModalOpen, setPetitionModalOpen] = useState(false);
  const [petitionTitle, setPetitionTitle] = useState('');
  const [donateModalOpen, setDonateModalOpen] = useState<number | null>(null);
  const [donateAmount, setDonateAmount] = useState('50000');

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
          <div className="mt-8 p-4 max-w-3xl mx-auto flex items-start text-left gap-3" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--accent-primary)', backgroundColor: 'rgba(15, 118, 110, 0.05)' }}>
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} color="var(--accent-primary)"/>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>Masuk secara anonim dengan klik tombol <b>Masuk / Daftar</b> di pojok kanan atas untuk ikut berdiskusi dan membuat petisi. Privasi Anda 100% terjaga.</span>
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
            {petitions.map(p => (
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
                    <span className="text-accent-primary">{p.signatures} Dukungan</span>
                    <span className="text-secondary">Target: {p.target}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${Math.min(100, (p.signatures/p.target)*100)}%`}}></div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    className="btn btn-primary flex-1" 
                    disabled={!user || isOffline}
                    onClick={() => supportPetition(p.id)}
                  >
                    <ThumbsUp size={16} /> {t.supportPetition}
                  </button>
                  <button 
                    className="btn btn-secondary flex-1"
                    onClick={() => alert('Fitur diskusi sedang dalam pengembangan.')}
                  >
                    <MessageSquare size={16} /> Diskusi
                  </button>
                </div>
              </div>
            ))}
            <div 
              className="card flex items-center justify-center border-dashed cursor-pointer" 
              style={{borderStyle: 'dashed', backgroundColor: 'transparent'}}
              onClick={() => {
                if (!user) {
                  alert('Silakan login dengan nama samaran terlebih dahulu.');
                  return;
                }
                setPetitionModalOpen(true);
              }}
            >
              <div className="text-center text-secondary">
                <div className="text-2xl mb-2">+</div>
                <div className="font-bold">{t.createPetition}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funds' && (
          <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
             {funds.map(f => (
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
                  <button 
                    className="btn btn-primary mt-4 w-full" 
                    disabled={!user || isOffline}
                    onClick={() => setDonateModalOpen(f.id)}
                  >
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

      <AnimatePresence>
        {petitionModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card"
              style={{ width: '100%', maxWidth: '450px', position: 'relative' }}
            >
              <button onClick={() => setPetitionModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}><X size={24} /></button>
              <h2 className="text-xl font-bold mb-4">Buat Petisi Baru</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-secondary">Judul Petisi</label>
                  <input type="text" className="input" placeholder="Contoh: Perbaikan Jalan Berlubang di RT 01" value={petitionTitle} onChange={e => setPetitionTitle(e.target.value)} />
                </div>
                <button 
                  className="btn btn-primary w-full justify-center mt-2 py-3 text-lg"
                  onClick={() => {
                    if (petitionTitle.trim()) {
                      createPetition(petitionTitle, 100);
                      setPetitionModalOpen(false);
                      setPetitionTitle('');
                    }
                  }}
                >
                  Ajukan Petisi
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {donateModalOpen !== null && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card"
              style={{ width: '100%', maxWidth: '400px', position: 'relative' }}
            >
              <button onClick={() => setDonateModalOpen(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)' }}><X size={24} /></button>
              <h2 className="text-xl font-bold mb-4">Nominal Donasi</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-secondary">Jumlah (Rp)</label>
                  <input type="number" className="input" placeholder="50000" value={donateAmount} onChange={e => setDonateAmount(e.target.value)} />
                </div>
                <button 
                  className="btn btn-primary w-full justify-center mt-2 py-3 text-lg"
                  onClick={() => {
                    const parsed = parseInt(donateAmount || '0', 10);
                    if (parsed > 0) {
                      donate(donateModalOpen, parsed);
                      setDonateModalOpen(null);
                      setDonateAmount('50000');
                    }
                  }}
                >
                  Kirim Donasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
