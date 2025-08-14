import { create } from "zustand";

interface ToggleChatState {
  isOpen: boolean;
  setIsOpen: (toggle: boolean) => void;
}

export const useToggleChat = create<ToggleChatState>((set) => ({
  isOpen: false,
  setIsOpen: (toggle) => set({ isOpen: toggle }),
}));
