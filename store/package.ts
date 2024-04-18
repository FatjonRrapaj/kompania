import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";

import { CreatePackageData, callCreatePackage } from "@/api/package";
import { showToastFromError } from "@/utils/toast";
import useAuthStore from "./auth";
import useCompanyStore from "./company";
import { Company } from "@/api/company";

type PackageState = {
  loadingCreatePackage: boolean;
  loadingSyncPackages: boolean;
};

type PackageActions = {
  createPackage: (createPackageData: CreatePackageData) => Promise<void>;
  syncPackages: (localLastUpdatedAt: number) => Promise<void>;
};

type PackageStore = PackageState & PackageActions;
type ImmutablePackageStore = Immutable<PackageStore>;

const initialState: PackageState = {
  loadingCreatePackage: false,
  loadingSyncPackages: true,
};

const usePackageStore = create<ImmutablePackageStore>()(
  immer((set) => ({
    ...initialState,
    createPackage: async (createPackageData: CreatePackageData) => {
      try {
        set((state) => {
          state.loadingCreatePackage = true;
        });
        const company = useCompanyStore.getState().company as Company;
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
    syncPackages: async (localLastUpdatedAt: number) => {
      try {
        set((state) => {
          state.loadingSyncPackages = true;
        });
      } catch (error) {
      } finally {
        set((state) => {
          state.loadingSyncPackages = false;
        });
      }
    },
  }))
);

export default usePackageStore;
