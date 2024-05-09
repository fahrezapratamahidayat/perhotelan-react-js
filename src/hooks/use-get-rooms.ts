import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { TypeRooms } from '@/types';

interface UserState {
  roomsData: TypeRooms | [];
  setRoomsData: (data: any) => void;
}

export const useRoomStore = create<UserState>((set) => ({
  roomsData: [],
  setRoomsData: (data) => set({ roomsData: data }),
}));