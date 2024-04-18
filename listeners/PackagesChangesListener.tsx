import { useEffect, useRef } from "react";

import { auth, db } from "@/utils/firebase";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import { Collections } from "@/constants/Firestore";
import { QuerySnapshot, doc, onSnapshot } from "firebase/firestore";
import { Company } from "@/api/company";
import { Package } from "@/api/package";
import {
  findPackage,
  getLocalLastUpdatedAt,
} from "@/watermelon/operations/package/getPackage";
import { deleteExistingPackage } from "@/watermelon/operations/package/deletePackage";
import { createPackageFromFirebasePackage } from "@/watermelon/operations/package/createPackage";
import { updateExistingPackage } from "@/watermelon/operations/package/updatePackage";
import usePackageStore from "@/store/package";

const PackagesChangesListener = () => {
  //TODO: convert this to company listener, fix the totals.
  //Në total = pending + problematic + completed
  //në proces = pending
  //(completed) = completed => this is not developed.
  //problematike = problematic
  //Start form the input then move to the db both schema and model,
  //then do the conversion of a package correctly from the firebasetimestamp to watermelon timestamp....
  // maybe check the date field of watermelon
  //after this you can maybe work on the listener function for available packages (firebase admin project & functions repo.)
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);

  const handleSnapshot = async (snapshot: QuerySnapshot) => {
    try {
      snapshot.docChanges().forEach(async (change) => {
        if (!change.doc.exists) {
          return;
        }

        const firebasePackageObject = {
          ...change.doc.data(),
          uid: change.doc.id,
        } as Package;

        console.log(
          "firebasePackageObject: ",
          JSON.stringify(firebasePackageObject)
        );

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
              await updateExistingPackage(
                existingPackage,
                firebasePackageObject
              );
            }
            break;
          case "removed":
            if (existingPackage) {
              await deleteExistingPackage(existingPackage);
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

    unsubscribe = onSnapshot(
      doc(db, Collections.companies, company.uid!),
      async (doc) => {
        const company = doc.data() as Company;
        let lastServerUpdatedAt = company.lastUpdatedAt;
        if (!lastServerUpdatedAt) {
          lastServerUpdatedAt = { seconds: 0, nanoseconds: 0 };
        }

        let localLastUpdatedAt = await getLocalLastUpdatedAt();
        if (!localLastUpdatedAt) {
          localLastUpdatedAt = 0;
        }

        if (lastServerUpdatedAt > localLastUpdatedAt) {
          //we have new packages on the server, need to sync
          usePackageStore.getState().syncPackages(localLastUpdatedAt);
        } else {
          //no packages to sync, just turn off the loading
          usePackageStore.getState().setLoadingSyncPackages(false);
        }
      }
    );

    return () => {
      unsubscribe?.();
    };
  }, [user, company]);

  return <></>;
};

export default PackagesChangesListener;
