import { useEffect } from "react";
import { User } from "firebase/auth";
import { router, useNavigation } from "expo-router";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const AuthStateChangeListener = () => {
  const { getState } = useNavigation();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    if (profile) {
      if (profile.passwordChanged) {
        const state = getState?.();
        const screenName = state?.routes?.[state?.index]?.name;
        if (screenName !== "(tabs)") {
          router.replace("/(tabs)/(home)");
        }
      } else {
        router.push("/(auth)/change_password");
      }
    }
  }, [profile]);

  useEffect(() => {}, [user]);

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((currentUser: User | null) => {
      console.log("CALLED!");
      useAuthStore.getState().updateAuth(currentUser);
      if (user) {
        useAuthStore.getState().getProfile();
      } else {
        router.replace("/(auth)/login");
      }
    });
    return unsubscribe;
  }, []);

  return <></>;
};

export default AuthStateChangeListener;
