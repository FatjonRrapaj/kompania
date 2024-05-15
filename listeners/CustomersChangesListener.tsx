import { useEffect } from "react";
import { auth, db } from "@/utils/firebase";
import { Collections } from "@/constants/Firestore";
import { doc, onSnapshot } from "firebase/firestore";

import { Company } from "@/api/company";
import useAuthStore from "@/store/auth";
import useCompanyStore from "@/store/company";
import { getCustomerLocalLastCreatedAt } from "@/watermelon/operations/customer/getCustomer";

const CustomersChangesListener = () => {
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
        let lastServerCreatedAt = company.lastCustomerCreatedAt;
        if (!lastServerCreatedAt) {
          lastServerCreatedAt = 0;
        }
        let localLastCreatedAt = await getCustomerLocalLastCreatedAt();
        if (!localLastCreatedAt) {
          localLastCreatedAt = 0;
        }

        if (lastServerCreatedAt > localLastCreatedAt) {
          //we have new packages on the server, need to sync
          useCompanyStore.getState().syncCustomers(localLastCreatedAt);
        } else {
          //TODO: loading sync customers if needed
        }
      }
    );

    return () => {
      unsubscribe?.();
    };
  }, [user, company?.lastUpdatedAt]);

  return <></>;
};

export default CustomersChangesListener;
