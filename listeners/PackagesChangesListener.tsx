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
  //TODO: this thing does not listen for deleted packages. How to solve: Build the admin on React,
  //      and create a listener on each package that lets them know for deleted packages as an array.
  //      and then never delete packages directly from firebase console.

  //TODO: this is not realtime, the packages status is not working
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
        const company = { uid: doc.id, ...doc.data() } as Company;
        useCompanyStore.getState().setCompany(company);
        let lastServerUpdatedAt = company.lastUpdatedAt;
        if (!lastServerUpdatedAt) {
          lastServerUpdatedAt = 0;
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
  }, [user, company?.lastUpdatedAt]);

  return <></>;
};

export default PackagesChangesListener;
