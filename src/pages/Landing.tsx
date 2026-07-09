
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, ArrowRight, Heart } from 'lucide-react';
import { useStore } from '../store';

const Landing = () => {
  const { user, setLoginModalOpen } = useStore();

  return (
    <div className="flex-col gap-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md-text-4xl font-extrabold mb-6">
            Suara Warga, <span className="text-accent-primary">Aksi Nyata</span>
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
            Platform komunitas desa yang memberdayakan warga untuk menyuarakan aspirasi, berdiskusi, dan menggalang dana secara anonim, aman, dan transparan.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/app" className="btn btn-primary text-lg px-8 py-3">
              Mulai Berpartisipasi <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Mengapa DesaConnect?</h2>
          <p className="text-secondary">Kami membangun platform ini untuk menciptakan lingkungan yang lebih baik.</p>
        </div>
        
        <div className="grid md-grid-cols-1 grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="card flex-col items-center text-center gap-4"
          >
            <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(15, 118, 110, 0.1)' }}>
              <Shield size={32} color="var(--accent-primary)" />
            </div>
            <h3 className="font-bold text-lg">Anonim & Aman</h3>
            <p className="text-secondary text-sm">
              Sampaikan aspirasi tanpa takut. Identitas Anda 100% dirahasiakan dengan menggunakan nama samaran.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="card flex-col items-center text-center gap-4"
          >
            <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)' }}>
              <TrendingUp size={32} color="var(--success)" />
            </div>
            <h3 className="font-bold text-lg">Transparan</h3>
            <p className="text-secondary text-sm">
              Pantau langsung progress setiap petisi dan dana desa yang digalang. Semua terbuka untuk warga.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="card flex-col items-center text-center gap-4"
          >
            <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)' }}>
              <Heart size={32} color="var(--warning)" />
            </div>
            <h3 className="font-bold text-lg">Kolaborasi Warga</h3>
            <p className="text-secondary text-sm">
              Galang dana sosial, rencanakan acara lokal, dan bangun lingkungan bersama-sama dengan mudah.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center mt-8 card" style={{ borderColor: 'var(--accent-primary)' }}>
        <h2 className="text-2xl font-bold mb-4">Siap untuk membuat perubahan?</h2>
        <p className="text-secondary mb-8">Tidak perlu verifikasi identitas, cukup gunakan nama samaran dan mulailah bersuara.</p>
        {!user ? (
          <button onClick={() => setLoginModalOpen(true)} className="btn btn-primary text-lg">
            Masuk / Daftar Sekarang
          </button>
        ) : (
          <Link to="/app" className="btn btn-primary text-lg">
            Lanjut ke Komunitas
          </Link>
        )}
      </section>
    </div>
  );
};

export default Landing;
