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
    const token = Cookies.get('token');
    if (token) {
      const decodedData = jwtDecode<userData>(token); // Gunakan generic untuk memastikan tipe decodedData
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
    set({ userData: null });
  }
}));

export default useUserStore;