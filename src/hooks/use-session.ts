import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { userData } from '@/types';

interface UserState {
  userData: userData | null;
  setUserData: (data: any) => void;
  checkUserToken: () => { login: boolean };
  signOut: () => void;
}

const useUserStore = create<UserState>((set, get) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  checkUserToken: () => {
    const token = Cookies.get('token') || localStorage.getItem('token'); // Mengambil token dari Cookies atau localStorage
    if (token) {
      const decodedData = jwtDecode<userData>(token); // Decode token
      // Hanya update state jika data yang didecode berbeda dengan userData saat ini
      if (JSON.stringify(get().userData) !== JSON.stringify(decodedData)) {
        set({ userData: decodedData });
      }
      return { login: true };
    } else {
      // Hanya clear userData jika saat ini tidak null
      if (get().userData !== null) {
        set({ userData: null });
      }
      return { login: false };
    }
  },
  signOut: () => {
    Cookies.remove('token');
    localStorage.removeItem('token'); // Menghapus token dari localStorage
    set({ userData: null });
  }
}));

export default useUserStore;