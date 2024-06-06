import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { useToast } from "@/components/ui/use-toast";
import { Rooms } from "@/types";
import create from 'zustand';
import { toast } from "sonner"

interface RoomManagementState {
  dialogEdit: boolean;
  roomsId: number;
  selectedRoom: Rooms | null;
  setDialogEdit: (dialogEdit: boolean) => void;
  setRoomsId: (roomsId: number) => void;
  setSelectedRoom: (selectedRoom: Rooms | null) => void;
}

export const useRoomManagementStore = create<RoomManagementState>((set) => ({
  dialogEdit: false,
  roomsId: 0,
  selectedRoom: null,
  setDialogEdit: (dialogEdit) => set({ dialogEdit }),
  setRoomsId: (roomsId) => set({ roomsId }),
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
}));

export const useRoomManagement = () => {
  const navigate = useNavigate();
  const { setRoomsId, setSelectedRoom, setDialogEdit } = useRoomManagementStore();

  const handleEdit = (id: number) => {
    setRoomsId(id);
    navigate(`/admin/rooms/edit/${id}`);
  };

  const handleDelete = (id: number, room: Rooms) => {
    setDialogEdit(true);
    setRoomsId(id);
    setSelectedRoom(room);
  };

  const handleView = (id: number) => {
    navigate(`/rooms/${id}`);
  }

  const onDelete = async () => {
    const { roomsId } = useRoomManagementStore.getState();
    try {
      const response = await axios.delete(`http://localhost:3000/api/rooms/${roomsId}`);
      if (response.data.status === 200) {
        setDialogEdit(false);
        mutate("/rooms");
        toast.success("Kamar Berhasil DiHapus", { duration: 2000 });
      }
    } catch (error) {
        toast.error("Kamar Gagal DiHapus", { duration: 2000 });
    }
  };

  return {
    ...useRoomManagementStore(),
    handleEdit,
    handleDelete,
    onDelete,
    handleView
  };
};