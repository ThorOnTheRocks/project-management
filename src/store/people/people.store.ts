import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value) => set(({firstName: value}), false, "setFirstName"),
  setLastName: (value) => set(({lastName: value}), false, "setLastName"),
})

export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(storeApi, {
        name: "person-storage",
        // storage: firebaseStorage,
      })
    )
  )
);

