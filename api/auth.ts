import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, db } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";
import { doc, getDoc } from "firebase/firestore";
import { Collections } from "@/constants/Firestore";

const getUserId = () => {
  return auth!.currentUser!.uid;
};

const getProfileDocumentReference = (uid?: string) => {
  try {
    let uidToUse = uid;
    if (!uid) {
      //get current uid
      console.log("getUserId() ", getUserId());
      uidToUse = getUserId();
    }
    if (!uidToUse) {
      throw new Error("Something went wrong");
    }
    return doc(db, Collections.users, uidToUse);
  } catch (error) {
    throw error;
  }
};

export const callGetProfile = async (
  uid?: string
): Promise<CompanyUserProfile> => {
  const docRef = getProfileDocumentReference(uid);
  const documentSnapshot = await getDoc(docRef);
  if (documentSnapshot.exists()) {
    return documentSnapshot.data() as CompanyUserProfile;
  } else {
    throw new Error("driver does not exist");
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
