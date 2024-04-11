import { useEffect, useRef } from "react";

import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import { Collections } from "@/constants/Firestore";
import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { getCompanyRef } from "@/api/company";
import { Package } from "@/api/package";
import {
  findPackage,
  createPackageFromFirebasePackage,
  updateExistingPackage,
} from "@/watermelon/operations/package";

const PackagesChangesListener = () => {
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);
  const mountedOnce = useRef<boolean>(false);

  const handleSnapshot = async (snapshot: QuerySnapshot) => {
    try {
      snapshot.docChanges().forEach(async (change) => {
        console.log("change: ", change);
        if (!change.doc.exists) {
          return;
        }

        const firebasePackageObject = {
          ...change.doc.data(),
          uid: change.doc.id,
        } as Package;

        const existingPackage = await findPackage(firebasePackageObject.uid!);
        console.log("existingPackage: ", existingPackage);

        switch (change?.type) {
          case "added":
            if (existingPackage) {
              if (
                existingPackage.updatedAtDate !==
                firebasePackageObject.timeline?.updatedAtDate
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
                existingPackage.updatedAtDate !==
                firebasePackageObject.timeline?.updatedAtDate
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
    } catch (error) {
      console.log("error@handleSnapshot: ", error);
    }
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
      const last7DaysPackagesRef = collection(
        companyRef,
        Collections.last7DaysPackages
      );
      unsubscribe = onSnapshot(last7DaysPackagesRef, handleSnapshot);
      mountedOnce.current = true;
    }

    return () => {
      unsubscribe?.();
    };
  }, [user, company]);

  return <></>;
};

export default PackagesChangesListener;
