import { useEffect } from "react";
import { User } from "firebase/auth";
import { router, useNavigation } from "expo-router";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const AuthStateChangeListener = () => {
  const { getState } = useNavigation();
  const updateAuth = useAuthStore((state) => state.updateAuth);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      updateAuth(currentUser);
      if (currentUser) {
        const { index, routes } = getState();
        const screenName = routes[index].name;
        if (screenName !== "(tabs)") {
          router.replace("/(tabs)/(home)");
        }
      }
    });
    return unsubscribe;
  }, []);

  return <></>;
};

export default AuthStateChangeListener;
