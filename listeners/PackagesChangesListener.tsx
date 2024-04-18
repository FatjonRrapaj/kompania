import { useEffect } from "react";
import { auth, db } from "@/utils/firebase";
import { Collections } from "@/constants/Firestore";
import { doc, onSnapshot } from "firebase/firestore";

import { Company } from "@/api/company";
import { getLocalLastUpdatedAt } from "@/watermelon/operations/package/getPackage";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import usePackageStore from "@/store/package";

const PackagesChangesListener = () => {
  //TODO: convert this to company listener, fix the totals.
  //Në total = pending + problematic + completed
  //në proces = pending
  //(completed) = completed => this is not developed.
  //problematike = problematic
  //after this you can maybe work on the listener function for available packages (firebase admin project & functions repo.)
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);

  useEffect(() => {
    if (!auth?.currentUser || !user) {
      return;
    }
    if (!company?.uid) {
      return;
    }

    let unsubscribe: any;

    unsubscribe = onSnapshot(
      doc(db, Collections.companies, company.uid!),
      async (doc) => {
        const company = doc.data() as Company;
        let lastServerUpdatedAt = company.lastUpdatedAt;
        if (!lastServerUpdatedAt) {
          lastServerUpdatedAt = 0;
        }

        let localLastUpdatedAt = await getLocalLastUpdatedAt();
        console.log("lastServerUpdatedAt: ", lastServerUpdatedAt);
        console.log("localLastUpdatedAt: ", localLastUpdatedAt);
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
