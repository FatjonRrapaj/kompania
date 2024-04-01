import { useEffect, useRef } from "react";

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
  const mountedOnce = useRef<boolean>(false);

  const handleSnapshot = (snapshot: QuerySnapshot) => {
    let addsCount = 0;
    let modifiedCount = 0;
    let removedCount = 0;

    snapshot.docChanges().forEach((change) => {
      if (!change.doc.exists) {
        return;
      }

      const firebasePackageObject = {
        ...change.doc.data(),
        uid: change.doc.id,
      } as Package;

      switch (change.type) {
        case "added":
          addsCount++;
          break;
        case "modified":
          modifiedCount++;
          break;
        case "removed":
          removedCount++;
          break;
        default:
          break;
      }

      watermelonDB.write(async () => {
        const existingPackage = await watermelonDB.collections
          .get("packages")
          .find(firebasePackageObject!.uid!);

        if (existingPackage) {
          await existingPackage.update((record) => {});
        } else {
          watermelonDB.collections
            .get<PackageModel>("packages")
            .prepareCreate((newRecord) => {
              newRecord.paymentAmount = firebasePackageObject.paymentAmount;
              newRecord.packageName = firebasePackageObject.packageName;
              newRecord.receiverName = firebasePackageObject?.receiverName;
              newRecord.receiverPhoneNumber =
                firebasePackageObject?.receiverPhoneNumber;

              newRecord.receiverProfileUrl =
                firebasePackageObject?.receiverProfileUrl;
              newRecord.receiverAddress =
                firebasePackageObject?.receiverAddress;

              newRecord.notesForReceiver =
                firebasePackageObject?.notesForReceiver;
              newRecord.packageHeight =
                firebasePackageObject?.packageDetails?.height;
              newRecord.packageWeight =
                firebasePackageObject?.packageDetails?.weight;
              newRecord.packageWidth =
                firebasePackageObject?.packageDetails?.width;
              newRecord.packageLength =
                firebasePackageObject?.packageDetails?.length;
              //left at isfragile
            });
        }
      });
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
