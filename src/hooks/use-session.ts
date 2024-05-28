import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
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
    const token = Cookies.get('token') || localStorage.getItem('token');
    if (token) {
      try {
        const decodedData = jwtDecode<userData>(token);
        const currentTime = Date.now() / 1000; 
        if (decodedData.exp < currentTime) {
          get().signOut();
          Cookies.remove('refreshToken');
          return { login: false };
        }
        if (JSON.stringify(get().userData) !== JSON.stringify(decodedData)) {
          set({ userData: decodedData });
        }
        return { login: true };
      } catch (error) {
        get().signOut();
        return { login: false };
      }
    } else {
      if (get().userData !== null) {
        set({ userData: null });
      }
      return { login: false };
    }
  },
  signOut: () => {
    Cookies.remove('refreshToken');
    localStorage.removeItem('token');
    set({ userData: null });
  }
}));

export default useUserStore;