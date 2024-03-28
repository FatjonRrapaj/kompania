import { useEffect } from "react";
import { User } from "firebase/auth";

import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";

const OnAuthStateChanged = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      useAuthStore.getState().updateAuth(currentUser);
    });
    return unsubscribe;
  }, []);

  return <></>;
};

export default OnAuthStateChanged;
