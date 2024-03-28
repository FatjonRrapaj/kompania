import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";

const getUserId = () => {
  return auth?.currentUser?.uid;
};

export const callLogin = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    throw generateCustomError({ errorKey: "failedToAddPackage" });
  } catch (error) {
    throw error;
  }
};
