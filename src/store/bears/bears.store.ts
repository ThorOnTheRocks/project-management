import { create } from "zustand";

type Bear = {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  computed: {
    totalBears: number
  };

  increaseBlackBears: (by: number) => void;
  decreaseBlackBears: (by: number) => void;

  increasePolarBears: (by: number) => void;
  decreasePolarBears: (by: number) => void;

  increasePandaBears: (by: number) => void;
  decreasePandaBears: (by: number) => void;

  doNothing: () => void;
  addBear: (bear: Bear) => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>((set, get) => ({
  blackBears: 100,
  polarBears: 10,
  pandaBears: 2,

  bears: [{id: 1, name: "Bear 1"}],

  computed: {
    get totalBears() {
      return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
    }
  },

  increaseBlackBears: (by: number) => set((state) => ({blackBears: state.blackBears + by})), 
  decreaseBlackBears: (by: number) => set((state) => ({blackBears: state.blackBears - by})),
  
  increasePolarBears: (by: number) => set((state) => ({polarBears: state.polarBears + by})), 
  decreasePolarBears: (by: number) => set((state) => ({polarBears: state.polarBears - by})),

  increasePandaBears: (by: number) => set((state) => ({pandaBears: state.pandaBears + by})), 
  decreasePandaBears: (by: number) => set((state) => ({pandaBears: state.pandaBears - by})),

  doNothing: () => set((state) => ({bears: [...state.bears]})),
  addBear: (bear) => set((state) => ({bears: [...state.bears, bear]})),
  clearBears: () => set(() => ({bears: []}))
}))