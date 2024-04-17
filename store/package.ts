import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";

import { CreatePackageData, callCreatePackage } from "@/api/package";
import { showToastFromError } from "@/utils/toast";
import useAuthStore from "./auth";
import useCompanyStore from "./company";

type PackageState = {
  loadingCreatePackage: boolean;
};

type PackageActions = {
  createPackage: (createPackageData: CreatePackageData) => Promise<void>;
};

type PackageStore = PackageState & PackageActions;
type ImmutablePackageStore = Immutable<PackageStore>;

const initialState: PackageState = {
  loadingCreatePackage: false,
};

const usePackageStore = create<ImmutablePackageStore>()(
  immer((set) => ({
    ...initialState,
    createPackage: async (createPackageData: CreatePackageData) => {
      try {
        set((state) => {
          state.loadingCreatePackage = true;
        });
        const company = useCompanyStore.getState().company;
        const companyUserProfile = useAuthStore.getState().profile;
        await callCreatePackage(
          createPackageData,
          company!,
          companyUserProfile!
        );
        //TODO: send the user to create package success page
      } catch (error) {
        console.log("error @createPackage: ", error);
        //TODO: crashlytics or sentry to record error.
        showToastFromError(error);
      } finally {
        set((state) => {
          state.loadingCreatePackage = false;
        });
      }
    },
  }))
);

export default usePackageStore;
