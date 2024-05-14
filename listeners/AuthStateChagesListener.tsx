import { useEffect } from "react";
import { User } from "firebase/auth";
import { router, useNavigation } from "expo-router";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const AuthStateChangeListener = () => {
  const { getState } = useNavigation();
  const profile = useAuthStore((state) => state.profile);
  const loadingGetProfile = useAuthStore((state) => state.loadingGetProfile);

  const goToTabs = () => {
    const state = getState?.();
    const screenName = state?.routes?.[state?.index]?.name as string;
    if (!screenName?.includes("tabs")) {
      router.replace("/(tabs)/(home)");
    }
  };

  useEffect(() => {
    if (loadingGetProfile) {
      return;
    }
    if (profile?.passwordChanged) {
      goToTabs();
    } else {
      router.push("/(auth)/change_password");
    }
  }, [profile, loadingGetProfile]);

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((currentUser: User | null) => {
      useAuthStore.getState().updateAuth(currentUser);
      if (currentUser) {
        if (!useAuthStore.getState().profile) {
          useAuthStore.getState().getProfile();
        } else {
          goToTabs();
        }
      } else {
        router.replace("/(auth)/login");
      }
    });
    return unsubscribe;
  }, []);

  return <></>;
};

export default AuthStateChangeListener;
