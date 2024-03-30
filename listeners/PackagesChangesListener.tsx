import { useEffect } from "react";

import { auth, db } from "@/utils/firebase";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import { Collections } from "@/constants/Firestore";
import { QuerySnapshot, collection, doc, onSnapshot } from "firebase/firestore";
import { getCompanyRef } from "@/api/company";
import watermelonDB from "@/watermelon";
import { Package } from "@/api/package";
import { TableName } from "@/watermelon/index";
import PackageModel from "@/watermelon/models/Package";

const PackagesChangesListener = () => {
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);

  const handleSnapshot = (snapshot: QuerySnapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log("change: ", change);
      //TODO: check change has a type = added.
      //For easier querying the local db with additions, updates, etc
      const firebasePackageObject = {
        ...change.doc.data(),
        uid: change.doc.id,
      } as Package;

      // watermelonDB.write(async () => {
      //   const existingPackage = await watermelonDB.collections
      //     .get("packages")
      //     .find(firebasePackageObject.uid);

      //   if (existingPackage) {
      //     await existingPackage.update((record) => {});
      //   } else {
      //     watermelonDB.collections
      //       .get<PackageModel>("packages")
      //       .prepareCreate((newRecord) => {
      //         newRecord.paymentAmount = firebasePackageObject.price;
      //       });
      //   }
      // });
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
    return () => {
      unsubscribe();
    };
  }, [user, company]);

  return <></>;
};

export default PackagesChangesListener;
