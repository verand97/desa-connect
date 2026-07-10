import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabase';

interface User {
  username: string;
  name: string;
  role: 'citizen' | 'rtrw' | 'superadmin';
  verified: boolean;
  nik?: string;
}

export interface Petition {
  id: number;
  title: string;
  status: 'pending' | 'approved';
  signatures: number;
  target: number;
  date: string;
}

export interface Fund {
  id: number;
  title: string;
  collected: number;
  target: number;
  donors: number;
}

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
  a11yHighContrast: boolean;
  toggleA11y: () => void;
  user: User | null;
  login: (username: string, password?: string) => Promise<boolean>;
  register: (username: string, password?: string, nik?: string) => Promise<boolean>;
  logout: () => void;
  isOffline: boolean;
  setOffline: (status: boolean) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
  petitions: Petition[];
  funds: Fund[];
  fetchData: () => Promise<void>;
  supportPetition: (id: number) => Promise<void>;
  createPetition: (title: string, target: number) => Promise<void>;
  donate: (id: number, amount: number) => Promise<void>;
}

// Simple translation dictionary
export const translations = {
  id: {
    home: 'Beranda',
    community: 'Komunitas',
    dashboard: 'Dasbor Desa',
    petitions: 'Petisi Warga',
    funds: 'Galang Dana',
    events: 'Acara Lokal',
    login: 'Masuk dengan Alias',
    logout: 'Keluar',
    verified: 'Warga Terverifikasi',
    unverified: 'Belum Terverifikasi',
    offline: 'Anda sedang offline. Data akan disinkronkan saat terhubung kembali.',
    createPetition: 'Buat Petisi Baru',
    supportPetition: 'Dukung',
    donate: 'Donasi',
    analytics: 'Analisis Aspirasi Warga',
    highContrast: 'Kontras Tinggi',
    loginBtn: 'Masuk / Daftar',
    heroBadge: 'Visi Baru Tata Kelola',
    heroTitle1: 'Kekuatan ',
    heroTitle2: 'Warga.',
    heroTitle3: 'Tanpa Jejak ',
    heroTitle4: 'Identitas.',
    heroDesc: 'DesaConnect adalah ekosistem digital untuk menyuarakan petisi, menggalang dana, dan mengawasi kinerja tanpa takut represi. Sepenuhnya anonim, transparan, dan dapat diandalkan.',
    heroBtn: 'Mulai Bersuara',
    heroBtnDashboard: 'Ke Dasbor',
    targetReached: 'Target Tercapai',
    liveUpdate: 'LIVE UPDATE',
    mockTitle: 'Perbaikan Pompa Air Utama',
    mockCollected: 'Rp 15.000.000 Terkumpul',
    mockDonors: '+142 Warga berpartisipasi (Anonim)',
    mockSecure: 'Data Terenkripsi',
    bentoTitle1: 'Mendobrak Keterbatasan ',
    bentoTitle2: 'Birokrasi',
    bentoDesc: 'Tidak ada lagi proposal yang menumpuk di balai desa. Semua transparan, cepat, dan digerakkan langsung oleh warga.',
    feature1Title: 'Privasi Absolut',
    feature1Desc: 'Kami memahami pentingnya keamanan dalam menyuarakan kritik. Identitas Anda 100% disembunyikan dalam wujud *Nama Samaran*. Verifikasi NIK hanya bersifat opsional bagi yang menginginkan lencana khusus.',
    feature2Title: 'Pantau Transparansi',
    feature2Desc: 'Setiap rupiah yang digalang, setiap petisi yang didukung dapat dipantau *real-time*. Tidak ada ruang untuk manipulasi data.',
    feature3Title: 'Kekuatan Kolektif',
    feature3Desc: 'Satu suara mungkin tidak terdengar, tapi ratusan dukungan warga akan memaksa perubahan terjadi lebih cepat.',
    ctaTitle: 'Mulai Bawa Perubahan Hari Ini',
    ctaDesc: 'Masuk tanpa ribet, langsung tulis aspirasi atau galang dana untuk lingkungan Anda. Waktunya bergerak.',
    ctaBtnLogin: 'Masuk Sekarang',
    ctaBtnDash: 'Kembali ke Dasbor',
  },
  en: {
    home: 'Home',
    community: 'Community',
    dashboard: 'Village Dashboard',
    petitions: 'Citizen Petitions',
    funds: 'Crowdfunding',
    events: 'Local Events',
    login: 'Login Anonymously',
    logout: 'Logout',
    verified: 'Verified Citizen',
    unverified: 'Unverified',
    offline: 'You are offline. Data will sync when connection is restored.',
    createPetition: 'Create New Petition',
    supportPetition: 'Support',
    donate: 'Donate',
    analytics: 'Citizen Aspiration Analytics',
    highContrast: 'High Contrast',
    loginBtn: 'Login / Register',
    heroBadge: 'New Vision for Governance',
    heroTitle1: 'Power of the ',
    heroTitle2: 'Citizens.',
    heroTitle3: 'Without an ',
    heroTitle4: 'Identity Trace.',
    heroDesc: 'DesaConnect is a digital ecosystem to voice petitions, raise funds, and oversee performance without fear of reprisal. Fully anonymous, transparent, and reliable.',
    heroBtn: 'Start Voicing',
    heroBtnDashboard: 'To Dashboard',
    targetReached: 'Target Reached',
    liveUpdate: 'LIVE UPDATE',
    mockTitle: 'Main Water Pump Repair',
    mockCollected: 'Rp 15.000.000 Collected',
    mockDonors: '+142 Citizens participated (Anonymous)',
    mockSecure: 'Encrypted Data',
    bentoTitle1: 'Breaking the Limits of ',
    bentoTitle2: 'Bureaucracy',
    bentoDesc: 'No more piling proposals at the village hall. Everything is transparent, fast, and driven directly by citizens.',
    feature1Title: 'Absolute Privacy',
    feature1Desc: 'We understand the importance of security when voicing criticism. Your identity is 100% hidden in the form of a *Pseudonym*. NIK verification is strictly optional for those who want a special badge.',
    feature2Title: 'Monitor Transparency',
    feature2Desc: 'Every rupiah raised, every petition supported can be monitored *real-time*. There is no room for data manipulation.',
    feature3Title: 'Collective Power',
    feature3Desc: 'One voice might not be heard, but hundreds of citizen supports will force change to happen faster.',
    ctaTitle: 'Start Bringing Change Today',
    ctaDesc: 'Login without hassle, directly write aspirations or raise funds for your neighborhood. It is time to move.',
    ctaBtnLogin: 'Login Now',
    ctaBtnDash: 'Back to Dashboard',
  }
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        return { theme: newTheme };
      }),
      language: 'id',
      setLanguage: (lang) => set({ language: lang }),
      a11yHighContrast: false,
      toggleA11y: () => set((state) => {
        const newStatus = !state.a11yHighContrast;
        if (newStatus) {
          document.documentElement.setAttribute('data-a11y', 'high-contrast');
        } else {
          document.documentElement.removeAttribute('data-a11y');
        }
        return { a11yHighContrast: newStatus };
      }),
      user: null,
      loginModalOpen: false,
      setLoginModalOpen: (isOpen) => set({ loginModalOpen: isOpen }),
      login: async (username, password = '') => {
        try {
          const { data, error } = await supabase
            .from('app_users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

          if (error || !data) {
            console.error('Login failed', error);
            alert('ID Akun atau kata sandi salah!');
            return false;
          }

          set({ 
            user: { 
              username: data.username, 
              name: data.username, 
              role: data.role, 
              verified: data.verified,
              nik: data.nik
            },
            loginModalOpen: false 
          });
          return true;
        } catch (err) {
          console.error(err);
          alert('Terjadi kesalahan sistem.');
          return false;
        }
      },
      register: async (username, password = '', nik?: string) => {
        try {
          // Check if exists
          const { data: existing } = await supabase.from('app_users').select('id').eq('username', username).maybeSingle();
          if (existing) {
            alert('Nama Samaran / ID Akun sudah terpakai!');
            return false;
          }

          let finalName = username.trim() || 'Anonim_' + Math.floor(Math.random() * 1000);
          let isVerified = false;
          
          if (nik && nik.length === 16) {
            isVerified = true;
          }

          const newUser = {
            username: finalName,
            password,
            role: 'citizen',
            nik: nik || null,
            verified: isVerified
          };

          const { data, error } = await supabase.from('app_users').insert([newUser]).select().single();
          
          if (error || !data) {
            console.error('Register failed', error);
            alert('Gagal mendaftar, coba lagi.');
            return false;
          }

          set({ 
            user: { 
              username: data.username, 
              name: data.username, 
              role: data.role, 
              verified: data.verified,
              nik: data.nik
            },
            loginModalOpen: false 
          });
          return true;
        } catch (err) {
          console.error(err);
          alert('Terjadi kesalahan sistem.');
          return false;
        }
      },
      logout: () => set({ user: null }),
      isOffline: !navigator.onLine,
      setOffline: (status) => set({ isOffline: status }),
      
      petitions: [],
      funds: [],

      fetchData: async () => {
        try {
          const { data: petitionsData } = await supabase.from('petitions').select('*').order('created_at', { ascending: false });
          const { data: fundsData } = await supabase.from('funds').select('*').order('created_at', { ascending: false });
          
          if (petitionsData) set({ petitions: petitionsData });
          if (fundsData) set({ funds: fundsData });
        } catch (error) {
          console.error("Gagal mengambil data dari Supabase:", error);
        }
      },

      supportPetition: async (id) => {
        set((state) => ({
          petitions: state.petitions.map(p => p.id === id ? { ...p, signatures: p.signatures + 1 } : p)
        }));
        
        const { data } = await supabase.from('petitions').select('signatures').eq('id', id).single();
        if (data) {
          await supabase.from('petitions').update({ signatures: data.signatures + 1 }).eq('id', id);
        }
      },

      createPetition: async (title, target) => {
        const newPetition = {
          title,
          target,
          status: 'pending',
          signatures: 1,
          date: new Date().toISOString().split('T')[0]
        };
        
        // Optimistic update
        const tempId = Date.now();
        set((state) => ({
          petitions: [{ id: tempId, ...newPetition } as unknown as Petition, ...state.petitions]
        }));

        // Real DB insert
        const { data } = await supabase.from('petitions').insert([newPetition]).select().single();
        if (data) {
          set((state) => ({
            petitions: state.petitions.map(p => p.id === tempId ? data : p)
          }));
        }
      },

      donate: async (id, amount) => {
        set((state) => ({
          funds: state.funds.map(f => f.id === id ? { ...f, collected: f.collected + amount, donors: f.donors + 1 } : f)
        }));

        const { data } = await supabase.from('funds').select('collected, donors').eq('id', id).single();
        if (data) {
          await supabase.from('funds').update({ 
            collected: data.collected + amount,
            donors: data.donors + 1
          }).eq('id', id);
        }
      }
    }),
    {
      name: 'desa-connect-storage',
      // Hanya simpan state 'user' ke localStorage (sesi login)
      // Data petisi dan galang dana selalu ditarik fresh dari Supabase
      partialize: (state) => ({ user: state.user }),
    }
  )
);
