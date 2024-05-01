import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";
import { User } from "firebase/auth";

import {
  ChangePasswordInfo,
  CompanyUserProfile,
  UserLoginInfo,
  callChangePassword,
  callGetProfile,
  callLogin,
  callLogout,
  reauthenticateUser,
} from "@/api/auth";
import showToast, { showToastFromError } from "@/utils/toast";
import { router } from "expo-router";

type AuthState = {
  initializing: boolean;
  loadingLogin: boolean;
  loadingLogout: boolean;
  loadingChangePassword: boolean;
  user: User | null;
  loadingGetProfile: boolean;
  profile?: CompanyUserProfile;
};

type AuthActions = {
  updateAuth: (auth: User | null) => void;
  login: (info: UserLoginInfo) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: (uid?: string) => Promise<void>;
  changePassword: (info: ChangePasswordInfo) => Promise<void>;
};

type AuthStore = AuthState & AuthActions;
type ImmutableAuthStore = Immutable<AuthStore>;

const initialState: AuthState = {
  initializing: true,
  loadingLogin: false,
  loadingGetProfile: false,
  loadingLogout: false,
  profile: undefined,
  user: null,
  loadingChangePassword: false,
};

const useAuthStore = create<ImmutableAuthStore>()(
  immer((set) => ({
    ...initialState,
    updateAuth: (newUser) => {
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
        console.log("error @login: ", error);
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
        console.log("error@ getProfile: ", error);
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingGetProfile = false;
        });
      }
    },
    changePassword: async (changePasswordInfo: ChangePasswordInfo) => {
      set((state) => {
        state.loadingChangePassword = true;
      });
      try {
        await reauthenticateUser(changePasswordInfo);
        await callChangePassword(changePasswordInfo);
        showToast({
          type: "success",
          text1Key: "successfullyChangedPasswordText1",
        });
      } catch (error) {
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingChangePassword = false;
        });
      }
    },
  }))
);

export default useAuthStore;
