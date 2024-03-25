import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/utils/firebase";

export const callLogin = async (
  email: string,
  password: string
): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};
