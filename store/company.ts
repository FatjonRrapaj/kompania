import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";

import { callGetCompany, Company } from "@/api/company";
import { showToastFromError } from "@/utils/toast";
import useAuthStore from "./auth";

type CompanyState = {
  loadingGetCompany: boolean;
  company?: Company;
};

type CompanyActions = {
  getCompany: () => Promise<void>;
};

type CompanyStore = CompanyState & CompanyActions;
type ImmutableCompanyStore = Immutable<CompanyStore>;

const initialState: CompanyState = {
  loadingGetCompany: true,
  company: undefined,
};

const useCompanyStore = create<ImmutableCompanyStore>()(
  immer((set) => ({
    ...initialState,
    getCompany: async () => {
      try {
        set((state) => {
          state.loadingGetCompany = true;
        });
        const company = await callGetCompany({
          companyID: useAuthStore().profile?.companyID!,
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
          state.loadingGetCompany = true;
        });
      }
    },
  }))
);

export default useCompanyStore;
