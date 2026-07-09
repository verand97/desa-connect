import { create } from 'zustand';

interface User {
  username: string;
  name: string;
  role: 'citizen' | 'official';
  verified: boolean;
}

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
  a11yHighContrast: boolean;
  toggleA11y: () => void;
  user: User | null;
  login: (username: string, role?: 'citizen' | 'official') => void;
  logout: () => void;
  isOffline: boolean;
  setOffline: (status: boolean) => void;
}

// Simple translation dictionary
export const translations = {
  id: {
    home: 'Beranda',
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

export const useStore = create<AppState>((set) => ({
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
  login: (username, role = 'citizen') => {
    const finalName = username.trim() || 'Anonim_' + Math.floor(Math.random() * 1000);
    set({ user: { username: finalName, name: finalName, role, verified: true } });
  },
  logout: () => set({ user: null }),
  isOffline: !navigator.onLine,
  setOffline: (status) => set({ isOffline: status }),
}));
