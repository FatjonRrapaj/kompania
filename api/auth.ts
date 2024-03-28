import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";

const getUserId = () => {
  return auth?.currentUser?.uid;
};

export const callLogin = async (info: UserLoginInfo): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, info.email, info.password);
  } catch (error) {
    throw error;
  }
};
