import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";
import { User } from "firebase/auth";

import { callGetProfile, callLogin, callLogout } from "@/api/auth";
import showToast, { showToastFromError } from "@/utils/toast";
import { router } from "expo-router";

type AuthState = {
  initializing: boolean;
  loadingLogin: boolean;
  loadingLogout: boolean;
  loadingRegister: boolean;
  user: User | null;
  loadingGetProfile: boolean;
  profile?: CompanyUserProfile;
};

type AuthActions = {
  updateAuth: (auth: User | null) => void;
  login: (info: UserLoginInfo) => Promise<void>;
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
      console.log("newUser: ", newUser);
      set((state) => {
        state.user = newUser;
        state.initializing = false;
      });
    },
    login: async (info: UserLoginInfo) => {
      try {
        set((state) => {
          state.loadingLogin = true;
        });
        await callLogin(info);
      } catch (error: any) {
        console.log("error: ", error);
        //TODO: crashlytics or sentry to record error.
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingLogin = false;
        });
      }
    },
    logout: async () => {
      try {
        set((state) => {
          state.loadingLogout = true;
        });
        await callLogout();
        router.replace("/(auth)/login");
      } catch (error) {
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingLogout = false;
        });
      }
    },
    getProfile: async (uid?: string) => {
      set((state) => {
        state.loadingGetProfile = true;
      });
      try {
        const profile = await callGetProfile(uid);
        set((state) => {
          state.profile = profile;
        });
      } catch (error) {
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingGetProfile = false;
        });
      }
    },
  }))
);

export default useAuthStore;
