import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, db } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";
import { doc } from "firebase/firestore";

const getUserId = () => {
  return auth?.currentUser?.uid;
};

const getUserDocumentReference = (uid?: string) => {
  try {
    let uidToUse = uid;
    if (!uid) {
      //get current uid
      uidToUse = auth.currentUser?.uid;
    }
    if (!uidToUse) {
      throw new Error("Something went wrong");
    }
    return doc(db, "drivers", uidToUse);
  } catch (error) {
    throw error;
  }
};

export const callLogin = async (info: UserLoginInfo): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, info.email, info.password);
  } catch (error) {
    throw error;
  }
};

export const callLogout = async () => {
  await signOut(auth);
};
