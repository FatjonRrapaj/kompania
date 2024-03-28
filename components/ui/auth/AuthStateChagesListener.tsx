import { useEffect } from "react";
import { User } from "firebase/auth";
import { router, useSegments } from "expo-router";

import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const AuthStateChangeListener = () => {
  const segment = useSegments();
  console.log("segment: ", segment);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      useAuthStore.getState().updateAuth(currentUser);
      if (currentUser) {
        if (!segment?.[0]?.includes("tabs")) {
          router.replace("/(tabs)/(home)");
        }
      } else {
        if (!segment?.[0]?.includes("auth")) {
          router.replace("/(auth)/login");
        }
      }
    });
    return unsubscribe;
  }, []);

  return <></>;
};

export default AuthStateChangeListener;
