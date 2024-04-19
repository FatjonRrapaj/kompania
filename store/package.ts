import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Immutable } from "immer";

import {
  CreatePackageData,
  Package,
  callCreatePackage,
  callSyncPackages,
} from "@/api/package";
import { showToastFromError } from "@/utils/toast";
import useAuthStore from "./auth";
import useCompanyStore from "./company";
import { Company } from "@/api/company";
import { findPackage } from "@/watermelon/operations/package/getPackage";
import { updateExistingPackage } from "@/watermelon/operations/package/updatePackage";
import { createPackageFromFirebasePackage } from "@/watermelon/operations/package/createPackage";

type PackageState = {
  loadingCreatePackage: boolean;
  loadingSyncPackages: boolean;
  newCreatedPackageId?: string;
};

type PackageActions = {
  createPackage: (createPackageData: CreatePackageData) => Promise<void>;
  syncPackages: (localLastUpdatedAt: number) => Promise<void>;
  setLoadingSyncPackages: (loading: boolean) => void;
  setNewCreatedPackageId: (newCreatedPackageId?: string) => void;
};

type PackageStore = PackageState & PackageActions;
type ImmutablePackageStore = Immutable<PackageStore>;

const initialState: PackageState = {
  loadingCreatePackage: false,
  loadingSyncPackages: true,
};

const syncNewPackagesWDb = async (newPackages: Package[]) => {
  newPackages.forEach(async (firebasePackage) => {
    const existingPackageInDb = await findPackage(firebasePackage.uid!);
    if (existingPackageInDb) {
      //package already exists, update it.
      await updateExistingPackage(existingPackageInDb, firebasePackage);
    } else {
      //package is new, create it.
      await createPackageFromFirebasePackage(firebasePackage);
      //TODO: deal w package deletion. from app -> on package click send to package screen & delete locally & globally.
      //from dashboard -> notification or a deleted packages listener.
      //TODO: the same logic when updating from another dashboard. Need to change the updated at or else the ap won't get the updates.
    }
  });
};

const usePackageStore = create<ImmutablePackageStore>()(
  immer((set, get) => ({
    ...initialState,
    createPackage: async (createPackageData: CreatePackageData) => {
      try {
        set((state) => {
          state.loadingCreatePackage = true;
        });
        const company = useCompanyStore.getState().company as Company;
        const companyUserProfile = useAuthStore.getState().profile;
        const newCreatedPackageUid = await callCreatePackage(
          createPackageData,
          company!,
          companyUserProfile!
        );
        set((state) => {
          state.newCreatedPackageId = newCreatedPackageUid;
        });
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
        const company = useCompanyStore.getState().company as Company;
        const newPackages = await callSyncPackages(
          localLastUpdatedAt,
          company.uid!
        );
        await syncNewPackagesWDb(newPackages);
      } catch (error) {
      } finally {
        set((state) => {
          state.loadingSyncPackages = false;
        });
      }
    },
    setLoadingSyncPackages: (loading: boolean) => {
      set((state) => {
        state.loadingSyncPackages = loading;
      });
    },
    setNewCreatedPackageId: (newCreatedPackageId?: string) => {
      set((state) => {
        state.newCreatedPackageId = newCreatedPackageId;
      });
    },
  }))
);

export default usePackageStore;
