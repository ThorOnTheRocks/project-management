import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { logger } from "../middlewares/logger.middleware";
import { useWeddingBoundStore } from "../wedding";

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

usePersonStore.subscribe((nextState, prevState) => {
  console.log(nextState, prevState)

  const {firstName, lastName} = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
})
