import { devtools, persist } from 'zustand/middleware';
import { create, StateCreator } from "zustand";
import { AuthStatus } from "../../interfaces/auth-status.interface";
import { User } from "../../interfaces/user.interface";
import { AuthService } from "../../services/auth.service";


export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkStatus: () => Promise<void>;
  logout: () => void;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({status: 'authorized', token, user})
    } catch (error) {
      set({status: 'unauthorized', token: undefined, user: undefined});
      throw 'Unauthorized';
    }
  },

  checkStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({status: 'authorized', token, user})
    } catch (error) {
      set({status: 'unauthorized', token: undefined, user: undefined})
    }
  },

  logout: () => {
    set({status: 'unauthorized', token: undefined, user: undefined})
  }
});

export const useAuthStore = create<AuthState>()(
  persist(devtools(storeApi), {name: 'auth-storage'})
);