import {
  AuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";

import { auth, db } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Collections } from "@/constants/Firestore";

export interface UserLoginInfo {
  email: string;
  password: string;
}

export interface ChangePasswordInfo {
  oldPassword: string;
  newPassword: string;
}

export interface CompanyUserProfile {
  email: string;
  companyID: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  passwordChanged: boolean;
}

export const getUserId = () => {
  return auth!.currentUser!.uid;
};

export const getProfileDocumentReference = (uid?: string) => {
  try {
    let uidToUse = uid;
    if (!uid) {
      uidToUse = getUserId();
    }
    if (!uidToUse) {
      throw generateCustomError({ errorKey: "userDocumentNotFound" });
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
    throw generateCustomError({ errorKey: "userDocumentNotFound" });
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

export const reauthenticateUser = async ({
  oldPassword,
}: ChangePasswordInfo): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw generateCustomError({ errorKey: "userNotAuthenticated" });
    }
    const credential = EmailAuthProvider.credential(
      auth.currentUser!.email!,
      oldPassword
    );
    await reauthenticateWithCredential(auth.currentUser!, credential);
  } catch (error) {
    throw error;
  }
};

export const updateUserPasswordChanged = async () => {
  try {
    if (!auth.currentUser) {
      throw generateCustomError({ errorKey: "userNotAuthenticated" });
    }
    const userDocRef = doc(db, "users", auth.currentUser?.uid!);
    await updateDoc(userDocRef, { passwordChanged: true });
  } catch (error) {
    throw error;
  }
};

export const callChangePassword = async ({
  newPassword,
}: ChangePasswordInfo): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw generateCustomError({ errorKey: "userNotAuthenticated" });
    }
    await updatePassword(auth.currentUser!, newPassword);
  } catch (error) {
    throw error;
  }
};
