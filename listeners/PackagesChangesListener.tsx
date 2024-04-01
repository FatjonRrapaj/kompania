import { useEffect, useRef } from "react";

import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import { Collections } from "@/constants/Firestore";
import { QuerySnapshot, collection, doc, onSnapshot } from "firebase/firestore";
import { getCompanyRef } from "@/api/company";
import watermelonDB from "@/watermelon";
import { Package } from "@/api/package";
import PackageModel from "@/watermelon/models/Package";
import { updateExistingPackage } from "@/watermelon/operations/updatePackage";
import { createPackageFromFirebasePackage } from "@/watermelon/operations/createPackage";

const PackagesChangesListener = () => {
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);
  const mountedOnce = useRef<boolean>(false);

  const handleSnapshot = async (snapshot: QuerySnapshot) => {
    let addsCount = 0;
    let modifiedCount = 0;
    let removedCount = 0;

    snapshot.docChanges().forEach(async (change) => {
      if (!change.doc.exists) {
        return;
      }

      const firebasePackageObject = {
        ...change.doc.data(),
        uid: change.doc.id,
      } as Package;

      const existingPackage = (await watermelonDB.collections
        .get("packages")
        .find(firebasePackageObject!.uid!)) as PackageModel;

      switch (change.type) {
        case "added":
          if (existingPackage) {
            if (
              existingPackage.updatedAt !==
              firebasePackageObject.timeline?.updatedAt
            ) {
              await updateExistingPackage(
                existingPackage,
                firebasePackageObject
              );
            }
            return;
          } else {
            await createPackageFromFirebasePackage(firebasePackageObject);
          }
          break;
        case "modified":
          if (existingPackage) {
            if (
              existingPackage.updatedAt !==
              firebasePackageObject.timeline?.updatedAt
            ) {
              await updateExistingPackage(
                existingPackage,
                firebasePackageObject
              );
            }
          }
          break;
        case "removed":
          if (existingPackage) {
            await existingPackage.destroyPermanently();
          }
          break;
        default:
          break;
      }
    });

    console.log("addsCount: ", addsCount);
    console.log("modifiedCount: ", modifiedCount);
    console.log("removedCount: ", removedCount);
  };

  useEffect(() => {
    if (!auth?.currentUser || !user) {
      console.log("PackagesChangesListener Not logged in****");
      return;
    }
    if (!company?.uid) {
      console.log("PackagesChangesListener company not okkkk in****");
      return;
    }

    let unsubscribe: any;

    if (!mountedOnce.current) {
      const companyRef = getCompanyRef(company.uid);
      const last2WeeksPackagesRef = collection(
        companyRef,
        Collections.last2WeeksPackages
      );
      unsubscribe = onSnapshot(last2WeeksPackagesRef, handleSnapshot);
      mountedOnce.current = true;
    }

    return () => {
      unsubscribe?.();
    };
  }, [user, company]);

  return <></>;
};

export default PackagesChangesListener;
