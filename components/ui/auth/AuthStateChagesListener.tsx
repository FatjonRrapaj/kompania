import { useEffect } from "react";
import { User } from "firebase/auth";
import { router, useSegments } from "expo-router";

import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const AuthStateChangeListener = () => {
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      useAuthStore.getState().updateAuth(currentUser);
      if (currentUser) {
        if (segments?.[0] !== "(tabs)") {
          router.replace("/(tabs)/(home)");
        }
      }
    });
    return unsubscribe;
  }, []);

  return <></>;
};

export default AuthStateChangeListener;
