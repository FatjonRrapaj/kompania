import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";
import { User } from "firebase/auth";

import { callLogin } from "@/api/auth";

type AuthState = {
  initializing: boolean;
  loadingLogin: boolean;
  loadingLogout: boolean;
  loadingRegister: boolean;
  user: User | null;
  loadingGetProfile: boolean;
  profile?: Company;
};

type AuthActions = {
  updateAuth: (auth: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: (uid?: string) => Promise<void>;
};

const initialState: AuthState = {
  initializing: true,
  loadingLogin: false,
  loadingGetProfile: false,
  loadingRegister: false,
  loadingLogout: false,
  profile: undefined,
  user: null,
};

type AuthStore = AuthState & AuthActions;
type ImmutableAuthStore = Immutable<AuthStore>;

const useAuthStore = create<ImmutableAuthStore>()(
  immer((set) => ({
    ...initialState,
    updateAuth: (newUser) => {
      set((state) => {
        state.user = newUser;
      });
    },
    login: async (email: string, password: string) => {
      try {
        await callLogin(email, password);
      } catch (error) {
      } finally {
      }
    },
    logout: async () => {
      try {
      } catch (error) {
      } finally {
      }
    },
    getProfile: async (uid?: string) => {
      try {
      } catch (error) {
      } finally {
      }
    },
  }))
);
