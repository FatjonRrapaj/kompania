import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/utils/firebase";

const getUserId = () => {
  return auth?.currentUser?.uid;
};

export const callLogin = async (
  email: string,
  password: string
): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};
