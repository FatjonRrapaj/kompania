import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";

import {
  callGetCompany,
  callSyncCustomers,
  Company,
  Customer,
} from "@/api/company";
import { showToastFromError } from "@/utils/toast";
import useAuthStore from "./auth";
import { createCustomerFromFirebaseCustomer } from "@/watermelon/operations/customer/createCustomer";
import { findCustomer } from "@/watermelon/operations/customer/getCustomer";

type CompanyState = {
  loadingGetCompany: boolean;
  company?: Company;
};

type CompanyActions = {
  getCompany: () => Promise<void>;
  setCompany: (company: Company) => void;
  syncCustomers: (localLastUpdatedAt: number) => Promise<void>;
};

type CompanyStore = CompanyState & CompanyActions;
type ImmutableCompanyStore = Immutable<CompanyStore>;

const initialState: CompanyState = {
  loadingGetCompany: true,
  company: undefined,
};

const syncNewCustomersWithDB = async (newCustomers: Customer[]) => {
  newCustomers.forEach(async (customer) => {
    const existingCustomerInDb = await findCustomer(customer.uid!);
    if (!existingCustomerInDb) {
      await createCustomerFromFirebaseCustomer(customer);
    }
  });
};

const useCompanyStore = create<ImmutableCompanyStore>()(
  immer((set) => ({
    ...initialState,
    setCompany: (company: Company) => {
      set((state) => {
        state.company = company;
      });
    },
    getCompany: async () => {
      try {
        set((state) => {
          state.loadingGetCompany = true;
        });
        const company = await callGetCompany({
          companyID: useAuthStore.getState().profile?.companyID!,
        });

        set((state) => {
          state.company = company;
        });
      } catch (error) {
        console.log("error @getCompany: ", error);
        //TODO: crashlytics or sentry to record error.
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingGetCompany = false;
        });
      }
    },
    syncCustomers: async (localLastUpdatedAt: number) => {
      try {
        const company = useCompanyStore.getState().company as Company;
        const newCustomers = await callSyncCustomers(
          localLastUpdatedAt,
          company.uid!
        );
        await syncNewCustomersWithDB(newCustomers);
      } catch (error) {
      } finally {
      }
    },
  }))
);

export default useCompanyStore;
