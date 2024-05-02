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
  updateUserPasswordChanged,
} from "@/api/auth";
import showToast, { showToastFromError } from "@/utils/toast";
import { Router, router } from "expo-router";
import { auth } from "@/utils/firebase";

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
  login: (info: UserLoginInfo, router: Router) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: (uid?: string) => Promise<void>;
  changePassword: (info: ChangePasswordInfo) => Promise<void>;
};

type AuthStore = AuthState & AuthActions;
type ImmutableAuthStore = Immutable<AuthStore>;

const initialState: AuthState = {
  initializing: true,
  loadingLogin: false,
  loadingGetProfile: true,
  loadingLogout: false,
  profile: undefined,
  user: null,
  loadingChangePassword: false,
};

const _getProfile = async (set: any, uid?: string) => {
  try {
    set((state: AuthState) => {
      state.loadingGetProfile = true;
    });
    const profile = await callGetProfile(uid);
    set((state: AuthState) => {
      state.profile = profile;
    });
  } catch (error) {
    console.log("error@ getProfile: ", error);
    showToastFromError(error);
  } finally {
    set((state: AuthState) => {
      state.loadingGetProfile = false;
    });
  }
};

const useAuthStore = create<ImmutableAuthStore>()(
  immer((set, get) => ({
    ...initialState,
    updateAuth: (newUser) => {
      set((state) => {
        state.user = newUser;
        state.initializing = false;
      });
    },
    login: async (info: UserLoginInfo, router: Router) => {
      try {
        set((state) => {
          state.loadingLogin = true;
        });
        await callLogin(info);
        const profile = get().profile;
        if (!!auth.currentUser && !!profile) {
          //it means the user has logged in, went to set new password, and went back to login and tried to relogin again.
          if (!profile.passwordChanged) {
            router.push("/(auth)/change_password");
          } else {
            router.replace("/(tabs)/(home)");
          }
        }
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
      return await _getProfile(set, uid);
    },
    changePassword: async (changePasswordInfo: ChangePasswordInfo) => {
      console.log("changePasswordInfo: ", changePasswordInfo);
      set((state) => {
        state.loadingChangePassword = true;
      });
      try {
        await reauthenticateUser(changePasswordInfo);
        await callChangePassword(changePasswordInfo);
        await updateUserPasswordChanged();
        await _getProfile(set);
        showToast({
          type: "success",
          text1Key: "successfullyChangedPasswordText1",
        });
      } catch (error) {
        console.log("error: ", error);
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
