import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Shield, TrendingUp, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const Landing = () => {
  const { user, setLoginModalOpen } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="flex-col gap-16 py-8" style={{ overflowX: 'hidden' }}>
      
      {/* Dynamic Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 min-h-[70vh]">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="badge badge-warning mb-6 font-bold tracking-widest uppercase">
            <Zap size={14} className="inline mr-1" /> Visi Baru Tata Kelola
          </div>
          <h1 className="text-3xl md-text-4xl font-extrabold mb-6 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
            Kekuatan <span className="gradient-text">Warga.</span><br />
            Tanpa Jejak <span style={{ color: 'var(--text-secondary)' }}>Identitas.</span>
          </h1>
          <p className="text-lg text-secondary mb-10 max-w-xl" style={{ fontSize: '1.25rem' }}>
            DesaConnect adalah ekosistem digital untuk menyuarakan petisi, menggalang dana, dan mengawasi kinerja tanpa takut represi. Sepenuhnya anonim, transparan, dan dapat diandalkan.
          </p>
          
          <div className="flex gap-4">
            {!user ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLoginModalOpen(true)} 
                className="btn btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
              >
                Mulai Bersuara <ArrowRight size={20} className="ml-2" />
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href='/app'} 
                className="btn btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
              >
                Ke Dasbor <ArrowRight size={20} className="ml-2" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Floating Mockup Right Side */}
        <motion.div 
          className="flex-1 relative desktop-only"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Background Blob */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'var(--accent-primary)', opacity: 0.1, filter: 'blur(60px)', borderRadius: '50%', zIndex: -1 }}></div>

          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="card p-6 w-full max-w-md mx-auto"
            style={{ background: 'rgba(var(--bg-secondary-rgb), 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="badge badge-success">Target Tercapai</span>
              <span className="text-xs text-secondary font-bold">LIVE UPDATE</span>
            </div>
            <h3 className="font-bold text-xl mb-2">Perbaikan Pompa Air Utama</h3>
            <div className="progress-bar mb-2">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>Rp 15.000.000 Terkumpul</p>
            
            {/* Mock Donators */}
            <div className="flex items-center mt-6 gap-2">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: `var(--bg-primary)`, border: '2px solid var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                    W{i}
                  </div>
                ))}
              </div>
              <span className="text-xs text-secondary ml-2 font-medium">+142 Warga berpartisipasi (Anonim)</span>
            </div>
          </motion.div>
          
          {/* Small floating badge */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            className="card absolute"
            style={{ bottom: '-20px', left: '-20px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-hover)' }}
          >
            <CheckCircle2 color="var(--accent-primary)" />
            <div>
              <div className="text-sm font-bold">Data Terenkripsi</div>
              <div className="text-xs text-secondary">AES-256 Bit</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-16"
      >
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Mendobrak Keterbatasan <span className="text-secondary">Birokrasi</span></h2>
          <p className="text-secondary max-w-2xl text-lg">Tidak ada lagi proposal yang menumpuk di balai desa. Semua transparan, cepat, dan digerakkan langsung oleh warga.</p>
        </div>

        {/* Bento Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', gridAutoRows: 'minmax(200px, auto)' }}>
          
          {/* Big Feature 1 */}
          <motion.div variants={itemVariants} className="card flex flex-col justify-between" style={{ gridColumn: '1 / -1', background: 'var(--accent-gradient)', color: 'white' }}>
            <div className="mb-8">
              <Shield size={40} className="mb-4 text-white opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Privasi Absolut</h3>
              <p className="opacity-90 max-w-xl">Kami memahami pentingnya keamanan dalam menyuarakan kritik. Identitas Anda 100% disembunyikan dalam wujud *Nama Samaran*. Verifikasi NIK hanya bersifat opsional bagi yang menginginkan lencana khusus.</p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="card flex flex-col gap-4">
            <div className="p-3 w-fit rounded-lg" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)' }}>
              <TrendingUp size={28} color="var(--warning)" />
            </div>
            <h3 className="text-xl font-bold">Pantau Transparansi</h3>
            <p className="text-secondary">Setiap rupiah yang digalang, setiap petisi yang didukung dapat dipantau *real-time*. Tidak ada ruang untuk manipulasi data.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="card flex flex-col gap-4">
            <div className="p-3 w-fit rounded-lg" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
              <Users size={28} color="var(--success)" />
            </div>
            <h3 className="text-xl font-bold">Kekuatan Kolektif</h3>
            <p className="text-secondary">Satu suara mungkin tidak terdengar, tapi ratusan dukungan warga akan memaksa perubahan terjadi lebih cepat.</p>
          </motion.div>

        </div>
      </motion.section>

      {/* Interactive CTA */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="card text-center py-16 px-8 relative overflow-hidden my-8"
        style={{ borderColor: 'var(--accent-primary)' }}
      >
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'var(--accent-primary)', opacity: 0.03, transform: 'rotate(-45deg)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-3xl font-extrabold mb-4">Mulai Bawa Perubahan Hari Ini</h2>
          <p className="text-secondary text-lg mb-8 max-w-xl mx-auto">Masuk tanpa ribet, langsung tulis aspirasi atau galang dana untuk lingkungan Anda. Waktunya bergerak.</p>
          {!user ? (
            <button onClick={() => setLoginModalOpen(true)} className="btn btn-primary text-lg" style={{ padding: '1rem 3rem' }}>
              Masuk Sekarang
            </button>
          ) : (
            <button onClick={() => window.location.href='/app'} className="btn btn-primary text-lg" style={{ padding: '1rem 3rem' }}>
              Kembali ke Dasbor
            </button>
          )}
        </div>
      </motion.section>

    </div>
  );
};

export default Landing;
