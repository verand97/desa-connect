import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  login: (username: string, role?: 'citizen' | 'rtrw' | 'superadmin', nik?: string) => void;
  logout: () => void;
  isOffline: boolean;
  setOffline: (status: boolean) => void;
  loginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
  petitions: Petition[];
  funds: Fund[];
  supportPetition: (id: number) => void;
  createPetition: (title: string, target: number) => void;
  donate: (id: number, amount: number) => void;
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
  login: (username, role = 'citizen', nik?: string) => {
    let finalName = username.trim() || 'Anonim_' + Math.floor(Math.random() * 1000);
    let isVerified = false;
    
    if (role === 'rtrw' || role === 'superadmin') {
      isVerified = true; // Admins are inherently verified
    } else if (nik && nik.length === 16) {
      isVerified = true;
      finalName = username.trim() || 'Warga Terverifikasi';
    }

    set({ 
      user: { 
        username: finalName, 
        name: finalName, 
        role, 
        verified: isVerified,
        nik
      },
      loginModalOpen: false // close modal on successful login
    });
  },
  logout: () => set({ user: null }),
  isOffline: !navigator.onLine,
  setOffline: (status) => set({ isOffline: status }),
  petitions: [
    { id: 1, title: 'Perbaikan Lampu Jalan RT 03', status: 'approved', signatures: 145, target: 150, date: '2026-07-01' },
    { id: 2, title: 'Pembangunan Saluran Air Antisipasi Banjir', status: 'pending', signatures: 89, target: 200, date: '2026-07-05' },
  ],
  funds: [
    { id: 1, title: 'Renovasi Poskamling RW 05', collected: 1500000, target: 5000000, donors: 34 },
  ],
  supportPetition: (id) => set((state) => ({
    petitions: state.petitions.map(p => p.id === id ? { ...p, signatures: p.signatures + 1 } : p)
  })),
  createPetition: (title, target) => set((state) => ({
    petitions: [...state.petitions, {
      id: Date.now(),
      title,
      status: 'pending',
      signatures: 1,
      target,
      date: new Date().toISOString().split('T')[0]
    }]
  })),
  donate: (id, amount) => set((state) => ({
    funds: state.funds.map(f => f.id === id ? { ...f, collected: f.collected + amount, donors: f.donors + 1 } : f)
  }))
    }),
    {
      name: 'desa-connect-storage',
      partialize: (state) => ({ user: state.user, petitions: state.petitions, funds: state.funds }),
    }
  )
);
