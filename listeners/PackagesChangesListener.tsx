import { useEffect } from "react";

import { auth, db } from "@/utils/firebase";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import { Collections } from "@/constants/Firestore";
import { QuerySnapshot, collection, doc, onSnapshot } from "firebase/firestore";
import { getCompanyRef } from "@/api/company";
import watermelonDB from "@/watermelon";
import { Package } from "@/api/package";

const PackagesChangesListener = () => {
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);

  const handleSnapshot = (snapshot: QuerySnapshot) => {
    snapshot.docChanges().forEach((change) => {
      const packageObj = {
        ...change.doc.data(),
        uid: change.doc.id,
      } as Package;

      watermelonDB.write(async () => {
        const existingPackage = watermelonDB.collections
          .get("packages")
          .findAndObserve(packageObj.uid);

        if (existingPackage) {
          await existingPackage.update((record) => {
            record.packageData = packageObj;
          });
        } else {
          await watermelonDB.collections
            .get("packages")
            .create((newPackage) => {
              newPackage.id = packageData.packageId;
              newPackage.packageData = packageData;
            });
        }
      });
    });
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

    const companyRef = getCompanyRef(company.uid);
    const last2WeeksPackagesRef = collection(
      companyRef,
      Collections.last2WeeksPackages
    );

    const unsubscribe = onSnapshot(last2WeeksPackagesRef, handleSnapshot);
  }, [user, company]);

  return <></>;
};

export default PackagesChangesListener;
