import { USER } from "@/types/user";
import axios from "axios";
import { create } from "zustand";

interface IUserState {
  user: USER | null;
  setUser: () => void;
}

const useMe = create<IUserState>((set) => ({
  user: null,
  setUser: async () => {
    const response = await axios.get("/api/user/me");
    if (response.status === 200) set({ user: response.data.data });
  },
}));

export default useMe;
