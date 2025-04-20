import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirm.slice";


type ShareBoundedState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareBoundedState>()(
  devtools(
    (...args) => ({
      ...createPersonSlice(...args),
      ...createGuestSlice(...args),
      ...createDateSlice(...args),
      ...createConfirmationSlice(...args),
    })
  )
);