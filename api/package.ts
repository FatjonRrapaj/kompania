import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";

import { CompanyAddress, getCompanyRef, Customer, Company } from "./company";
import { mockPackageObject } from "@/mocks/packagesMock";
import { CompanyUserProfile } from "./auth";

export type CurrencyShortValue = "ALL" | "EUR";

export interface Currency {
  symbol: string;
  name: string;
}

export interface Courier {
  name: string;
  phoneNumber: string;
  profilePicture?: string;
  uid?: string;
}

export type PackageStatus = "completed" | "pending" | "problematic";

export type PackageTimelineStatus =
  | "available"
  | "accepted"
  | "picked"
  | "delivered"
  | "returned";

export interface PackageTimeline {
  createdAtDate?: number;
  updatedAtDate?: number;
  postedAtDate?: number;
  acceptedAtDate?: number;
  pickedAtDate?: number;
  deliveredAtDate?: number;
  returnedAtDate?: number;
}

export interface PackageFormData {
  uid?: string;
  receiverName: string;
  phoneNumber: string;
  profileLink: string;
  address: string;
  notesForReceiver?: string;
  packageId: string;
  packageName?: string;
  packageWeight?: string;
  packageWidth?: string;
  packageLength?: string;
  packageHeight?: string;
  paymentAmount: string;
  shippingCost: string;
  cashOnDelivery: string;
  notesForPackage?: string;
  canBeOpened: boolean;
  currency: CurrencyShortValue;
  isFragile: boolean;
}

type PackageLogAction = "created" | "updated" | "deleted";

export interface PackageLog {
  action: PackageLogAction;
  package: Package;
  company: Company;
  user: CompanyUserProfile;
  createdAt: number;
}

export interface Package {
  uid?: string;
  packageName?: string;
  scanId: string;
  receiver: Customer;
  packageDetails: {
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    isFragile: boolean;
    canBeOpened: boolean;
  };
  paymentAmount: number;
  shippingCost: number;
  cashOnDelivery: number;
  notesForPackage?: string;
  status: PackageStatus;
  timelineStatus: PackageTimelineStatus;
  timeline?: PackageTimeline;
  courier?: Courier;
  currency: CurrencyShortValue;
  companyAddress?: CompanyAddress;
  companyId?: string;
}

export async function callCreatePackage(
  packageData: PackageFormData,
  company: Company,
  profile: CompanyUserProfile
): Promise<string> {
  //TODO: check internet connectivity before posting to make sure you are online, if not put as draft....
  //TODO: compose a string that contains package title, client name, client phone number, description, etc so that the user can easily search for the package...
  //TODO: make the composed string easy to edit.

  //TODO: create a notifications collection inside each company & update through the diff cloud functions, also have them as notifications.
  //TODO: do the notifications subscription on a company ID Base.
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const nowTimestamp = now.getTime();

  //TODO: maybe pass uid to receiver

  try {
    const packageToUpload: Package = {
      scanId: packageData.packageId,
      packageName: packageData.packageName,
      receiver: {
        name: packageData.receiverName,
        profileUrl: packageData.profileLink,
        phoneNumber: packageData.phoneNumber,
        notes: packageData.notesForReceiver,
        receiverLocation: {
          description: packageData.address,
        },
      },
      packageDetails: {
        canBeOpened: packageData.canBeOpened,
        isFragile: packageData.isFragile,
        ...(packageData.packageWeight && {
          weight: parseInt(packageData.packageWeight),
        }),
        ...(packageData.packageWidth && {
          width: parseInt(packageData.packageWidth),
        }),
        ...(packageData.packageHeight && {
          height: parseInt(packageData.packageHeight),
        }),
        ...(packageData.packageLength && {
          length: parseInt(packageData.packageLength),
        }),
      },
      paymentAmount: parseInt(packageData.paymentAmount),
      shippingCost: parseInt(packageData.shippingCost),
      cashOnDelivery: parseInt(packageData.cashOnDelivery),
      ...(packageData.notesForPackage && {
        notesForPackage: packageData.notesForPackage,
      }),
      status: "pending",
      timelineStatus: "available",
      timeline: {
        createdAtDate: nowTimestamp,
        updatedAtDate: nowTimestamp,
        postedAtDate: nowTimestamp,
      },
      currency: packageData.currency,
      companyAddress: company!.locations![0] as CompanyAddress,
      companyId: company?.uid,
    };

    const packageLog: PackageLog = {
      action: "created",
      package: packageToUpload,
      company: company,
      user: profile,
      createdAt: nowTimestamp,
    };

    const batch = writeBatch(db);
    const aggregatorRef = doc(
      db,
      Collections.companies,
      Collections.aggregator
    );
    const companyRef = getCompanyRef(company.uid!);
    const periodKey = `packages-${year}-${month}`;
    const newPackageForInsideCompany = doc(
      collection(db, Collections.companies, company.uid!, Collections.packages)
    );
    const totalsRef = doc(collection(db, Collections.logs));
    const packageRefForAvailablePackages = doc(
      db,
      Collections.availablePackages,
      newPackageForInsideCompany.id
    );
    batch.set(
      aggregatorRef,
      {
        pending: increment(1),
      },
      { merge: true }
    );
    batch.set(
      companyRef,
      {
        lastUpdatedAt: nowTimestamp,
        totals: {
          all: {
            pending: increment(1),
          },
          [periodKey]: {
            pending: increment(1),
          },
        },
      },
      { merge: true }
    );
    batch.set(newPackageForInsideCompany, packageToUpload);
    batch.set(packageRefForAvailablePackages, packageToUpload);
    batch.set(totalsRef, packageLog);

    await batch.commit();
    return newPackageForInsideCompany.id;
  } catch (error) {
    throw error;
  }
}

export async function callEditPackage(editingPackageData: PackageFormData) {
  //TODO: do this very simmilar to edit package
}

export async function callSyncPackages(
  localLastUpdatedAt: number,
  companyId: string
): Promise<Package[]> {
  try {
    const companyRef = getCompanyRef(companyId);
    const packagesRef = collection(companyRef, Collections.packages);
    const q = query(
      packagesRef,
      where("timeline.updatedAtDate", ">", localLastUpdatedAt)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ uid: doc.id, ...doc.data() } as Package)
    );
  } catch (error) {
    throw error;
  }
}

export type PreviousMonths = 2 | 1 | 0;

export async function pushMockPackages(
  companyID: string,
  previousMonths: PreviousMonths = 0
) {
  const companyRef = getCompanyRef(companyID);
  const packagesRef = collection(companyRef, Collections.packages);

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - previousMonths);

  const mockPackageObjectWithUpdatedAt = { ...mockPackageObject };
  mockPackageObjectWithUpdatedAt.timeline!.updatedAtDate =
    currentDate.getTime();

  for (let i = 0; i < 1; i++) {
    await addDoc(packagesRef, mockPackageObjectWithUpdatedAt);
  }
}
