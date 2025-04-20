import { StateCreator } from "zustand";


export interface GuestSlice {
  guestNumber: number;

  setGuestNumber: (guestNumber: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = ((set) => ({
  guestNumber: 0,

  setGuestNumber: (guestNumber: number) => set((
    {
      guestNumber: guestNumber > 0 ? guestNumber : 0
    }
  )),
}));