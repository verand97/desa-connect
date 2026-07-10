import { useState } from 'react';
import { useStore, translations } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, MessageSquare, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return dateString;
};

const Home = () => {
  const { language, user, isOffline, petitions, funds, events, supportPetition, createPetition, createFund, createEvent, donate } = useStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'petitions' | 'funds' | 'events'>('petitions');
  const [petitionModalOpen, setPetitionModalOpen] = useState(false);
  const [petitionType, setPetitionType] = useState<'petition' | 'vote'>('petition');
  const [petitionTitle, setPetitionTitle] = useState('');
  const [petitionDescription, setPetitionDescription] = useState('');
  const [petitionDeadline, setPetitionDeadline] = useState('');
  const [petitionTarget, setPetitionTarget] = useState('100');
  const [petitionOptions, setPetitionOptions] = useState<string[]>(['', '']);
  const [petitionImage, setPetitionImage] = useState('');
  
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [fundTitle, setFundTitle] = useState('');
  const [fundTarget, setFundTarget] = useState('5000000');
  const [fundImage, setFundImage] = useState('');
  
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventImage, setEventImage] = useState('');

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
              <div key={p.id} className="card flex-col gap-4 p-6">
                {p.image_url && <img src={p.image_url} alt={p.title} className="card-image-cover" />}
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl">{p.title}</h3>
                  {p.status === 'approved' ? (
                     <span className="badge badge-success"><CheckCircle size={12} className="inline mr-1"/> Disetujui</span>
                  ) : (
                     <span className="badge badge-warning"><Clock size={12} className="inline mr-1"/> Menunggu Verifikasi</span>
                  )}
                </div>
                <div className="text-sm text-secondary mb-2">Dibuat: {formatDate(p.date)} {p.deadline && `• Berakhir: ${formatDate(p.deadline)}`}</div>
                {p.description && <p className="text-sm mb-4">{p.description}</p>}
                
                {p.type === 'vote' ? (
                  <div className="flex flex-col gap-2 mt-2">
                    {p.poll_options?.map(opt => {
                      const totalVotes = p.poll_options?.reduce((sum, o) => sum + o.votes, 0) || 0;
                      const pct = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                      return (
                        <div key={opt.id} className="relative w-full h-10 bg-gray-100 rounded-md overflow-hidden flex items-center cursor-pointer border hover:border-accent-primary"
                             onClick={() => {
                               if (!user) alert('Login untuk ikut voting');
                               else useStore.getState().votePoll(p.id, opt.id);
                             }}>
                          <div className="absolute left-0 top-0 bottom-0 bg-accent-primary opacity-20" style={{ width: `${pct}%` }}></div>
                          <div className="relative z-10 flex justify-between w-full px-3 text-sm font-medium">
                            <span>{opt.text}</span>
                            <span>{opt.votes} Suara ({Math.round(pct)}%)</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-accent-primary">{p.signatures} Dukungan</span>
                      <span className="text-secondary">Target: {p.target}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${Math.min(100, (p.signatures/p.target)*100)}%`}}></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  {p.type !== 'vote' && (
                    <button 
                      className="btn btn-primary flex-1" 
                      disabled={!user || isOffline}
                      onClick={() => supportPetition(p.id)}
                    >
                      <ThumbsUp size={16} /> {t.supportPetition}
                    </button>
                  )}
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
               <div key={f.id} className="card flex-col gap-4 p-6">
                  {f.image_url && <img src={f.image_url} alt={f.title} className="card-image-cover" />}
                  <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                  <div className="text-sm text-secondary mb-4">{f.donors} Donatur telah berpartisipasi</div>
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
             {user && (user.role === 'rtrw' || user.role === 'superadmin') && (
               <div 
                 className="card flex items-center justify-center border-dashed cursor-pointer" 
                 style={{borderStyle: 'dashed', backgroundColor: 'transparent'}}
                 onClick={() => setFundModalOpen(true)}
               >
                 <div className="text-center text-secondary">
                   <div className="text-2xl mb-2">+</div>
                   <div className="font-bold">Buat Galang Dana</div>
                 </div>
               </div>
             )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid md-grid-cols-1 grid-cols-2 gap-6">
             {events && events.map(e => (
               <div key={e.id} className="card flex-col gap-4 p-6">
                  {e.image_url && <img src={e.image_url} alt={e.title} className="card-image-cover" />}
                  <h3 className="font-bold text-xl">{e.title}</h3>
                  <div className="text-sm text-secondary">Tanggal: {formatDate(e.date)}</div>
                  <div className="text-sm font-medium">Lokasi: {e.location}</div>
               </div>
             ))}
             {events && events.length === 0 && (
               <div className="text-secondary col-span-2 text-center py-4">Belum ada acara lokal saat ini.</div>
             )}
             {user && (user.role === 'rtrw' || user.role === 'superadmin') && (
               <div 
                 className="card flex items-center justify-center border-dashed cursor-pointer" 
                 style={{borderStyle: 'dashed', backgroundColor: 'transparent'}}
                 onClick={() => setEventModalOpen(true)}
               >
                 <div className="text-center text-secondary">
                   <div className="text-2xl mb-2">+</div>
                   <div className="font-bold">Tambah Acara Lokal</div>
                 </div>
               </div>
             )}
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
              className="modal-glass p-8"
              style={{ width: '100%', maxWidth: '600px', position: 'relative' }}
            >
              <button onClick={() => setPetitionModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)' }}><X size={24} /></button>
              <h2 className="text-2xl font-extrabold mb-6">Buat Petisi / Voting Baru</h2>
              <div className="flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" checked={petitionType === 'petition'} onChange={() => setPetitionType('petition')} />
                    Petisi Warga (Dukungan)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" checked={petitionType === 'vote'} onChange={() => setPetitionType('vote')} />
                    Polling / Voting
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-secondary">Judul</label>
                  <input type="text" className="input" placeholder={petitionType === 'vote' ? "Contoh: Pemilihan Warna Cat Poskamling" : "Contoh: Perbaikan Jalan Berlubang di RT 01"} value={petitionTitle} onChange={e => setPetitionTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-secondary">Deskripsi Singkat</label>
                  <textarea className="input" placeholder="Jelaskan alasan dan latar belakang..." rows={3} value={petitionDescription} onChange={e => setPetitionDescription(e.target.value)}></textarea>
                </div>
                
                {petitionType === 'petition' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-secondary">Target Dukungan (Suara)</label>
                    <input type="number" className="input" value={petitionTarget} onChange={e => setPetitionTarget(e.target.value)} />
                  </div>
                )}

                {petitionType === 'vote' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-secondary">Opsi Polling</label>
                    <div className="flex flex-col gap-2">
                      {petitionOptions.map((opt, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" className="input flex-1" placeholder={`Opsi ${i + 1}`} value={opt} onChange={e => {
                            const newOpts = [...petitionOptions];
                            newOpts[i] = e.target.value;
                            setPetitionOptions(newOpts);
                          }} />
                          {petitionOptions.length > 2 && (
                            <button className="text-danger p-2" onClick={() => setPetitionOptions(petitionOptions.filter((_, idx) => idx !== i))}><X size={16} /></button>
                          )}
                        </div>
                      ))}
                      <button className="text-accent-primary text-sm font-medium mt-1 text-left" onClick={() => setPetitionOptions([...petitionOptions, ''])}>+ Tambah Opsi</button>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-secondary">Batas Waktu (Opsional)</label>
                  <input type="date" className="input" value={petitionDeadline} onChange={e => setPetitionDeadline(e.target.value)} />
                </div>

                <ImageUploader 
                  label="Gambar Pendukung" 
                  value={petitionImage} 
                  onChange={setPetitionImage} 
                />
                <button  
                  className="btn btn-primary w-full justify-center mt-4 py-3 text-lg"
                  onClick={() => {
                    if (petitionTitle.trim()) {
                      const validOptions = petitionOptions.filter(o => o.trim() !== '').map(text => ({ id: Math.random().toString(36).substr(2, 9), text, votes: 0 }));
                      createPetition(
                        petitionTitle, 
                        petitionDescription, 
                        petitionType, 
                        validOptions, 
                        petitionDeadline, 
                        parseInt(petitionTarget) || 100, 
                        petitionImage
                      );
                      setPetitionModalOpen(false);
                      setPetitionTitle('');
                      setPetitionDescription('');
                      setPetitionType('petition');
                      setPetitionOptions(['', '']);
                      setPetitionDeadline('');
                      setPetitionImage('');
                    }
                  }}
                >
                  Publikasikan
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

        {fundModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-glass p-8"
              style={{ width: '100%', maxWidth: '600px', position: 'relative' }}
            >
              <button onClick={() => setFundModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)' }}><X size={24} /></button>
              <h2 className="text-2xl font-extrabold mb-6">Buat Galang Dana Baru</h2>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-secondary">Judul Galang Dana</label>
                  <input type="text" className="input" placeholder="Contoh: Renovasi Poskamling" value={fundTitle} onChange={e => setFundTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-secondary">Target Dana (Rp)</label>
                  <input type="number" className="input" value={fundTarget} onChange={e => setFundTarget(e.target.value)} />
                </div>
                <ImageUploader 
                  label="Gambar Header Galang Dana" 
                  value={fundImage} 
                  onChange={setFundImage} 
                />
                <button 
                  className="btn btn-primary w-full justify-center mt-4 py-3 text-lg"
                  onClick={() => {
                    if (fundTitle.trim()) {
                      createFund(fundTitle, parseInt(fundTarget, 10), fundImage);
                      setFundModalOpen(false);
                      setFundTitle('');
                      setFundImage('');
                    }
                  }}
                >
                  Buat Galang Dana
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {eventModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-glass p-8"
              style={{ width: '100%', maxWidth: '600px', position: 'relative' }}
            >
              <button onClick={() => setEventModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)' }}><X size={24} /></button>
              <h2 className="text-2xl font-extrabold mb-6">Tambah Acara Lokal</h2>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-secondary">Nama Acara</label>
                  <input type="text" className="input" placeholder="Kerja Bakti RT 01" value={eventTitle} onChange={e => setEventTitle(e.target.value)} />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold mb-2 text-secondary">Tanggal</label>
                    <input type="date" className="input" value={eventDate} onChange={e => setEventDate(e.target.value)} />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold mb-2 text-secondary">Lokasi</label>
                    <input type="text" className="input" placeholder="Lapangan Utama" value={eventLocation} onChange={e => setEventLocation(e.target.value)} />
                  </div>
                </div>
                <ImageUploader 
                  label="Poster Acara Lokal" 
                  value={eventImage} 
                  onChange={setEventImage} 
                />
                <button 
                  className="btn btn-primary w-full justify-center mt-4 py-3 text-lg"
                  onClick={() => {
                    if (eventTitle.trim()) {
                      createEvent(eventTitle, eventDate, eventLocation, eventImage);
                      setEventModalOpen(false);
                      setEventTitle('');
                      setEventDate('');
                      setEventLocation('');
                      setEventImage('');
                    }
                  }}
                >
                  Simpan Acara
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
