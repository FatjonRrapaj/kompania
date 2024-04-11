import { useEffect } from "react";
import { User } from "firebase/auth";
import { router, useNavigation } from "expo-router";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const AuthStateChangeListener = () => {
  const { getState } = useNavigation();
  const updateAuth = useAuthStore((state) => state.updateAuth);
  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((currentUser: User | null) => {
      const state = getState?.();

      updateAuth(currentUser);
      if (currentUser) {
        const screenName = state?.routes?.[state?.index]?.name;
        if (screenName !== "(tabs)") {
          router.replace("/(tabs)/(home)");
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
