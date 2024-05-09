import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface UserState {
  userData: any;
  setUserData: (data: any) => void;
  checkUserToken: () => { login: boolean };
  signOut: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  checkUserToken: () => {
    const token = Cookies.get('token');
    if (token) {
      return { login: true };
    } else {
      return { login: false };
    }
  },
  signOut: () => {
    Cookies.remove('token');
    set({ userData: null });
  }
}));

export default useUserStore;