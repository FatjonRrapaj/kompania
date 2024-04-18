import {
  FieldValue,
  Timestamp,
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
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

export type ReceivedFirebaseServerTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export interface PackageTimeline {
  createdAtDate?: number;
  updatedAtDate?: FieldValue | ReceivedFirebaseServerTimestamp;
  postedAtDate?: FieldValue | ReceivedFirebaseServerTimestamp;
  acceptedAtDate?: FieldValue | ReceivedFirebaseServerTimestamp;
  pickedAtDate?: FieldValue | ReceivedFirebaseServerTimestamp;
  deliveredAtDate?: FieldValue | ReceivedFirebaseServerTimestamp;
  returnedAtDate?: FieldValue | ReceivedFirebaseServerTimestamp;
}

export interface CreatePackageData {
  receiverName: string;
  phoneNumber: string;
  profileLink: string;
  address: string;
  notesForReceiver: string;
  packageId: string;
  packageName?: string;
  packageWeight?: string;
  packageWidth?: string;
  packageLength?: string;
  packageHeight?: string;
  paymentAmount: string;
  shippingCost: string;
  cashOnDelivery: string;
  notesForPackage: string;
  canBeOpened: boolean;
  currency?: CurrencyShortValue;
  isFragile: boolean;
}

type PackageLogAction = "created" | "updated" | "deleted";

export interface PackageLog {
  action: PackageLogAction;
  package: Package;
  company: Company;
  user: CompanyUserProfile;
  createdAt: FieldValue;
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
  notesForPackage: string;
  status: PackageStatus;
  timelineStatus: PackageTimelineStatus;
  timeline?: PackageTimeline;
  courier?: Courier;
  currency?: CurrencyShortValue;
  companyAddress?: CompanyAddress;
  companyId?: string;
}

export type PreviousMonths = 2 | 1 | 0;

export async function callCreatePackage(
  packageData: CreatePackageData,
  company: Company,
  profile: CompanyUserProfile
) {
  //TODO: check internet connectivity before posting to make sure you are online, if not put as draft....

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const nowTimestamp = now.getTime();

  try {
    const packageToUpload: Package = {
      scanId: packageData.packageId,
      packageName: packageData.packageName,
      receiver: {
        name: packageData.receiverName,
        uid: packageData.profileLink,
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
      notesForPackage: packageData.notesForPackage,
      status: "pending",
      timelineStatus: "available",
      timeline: {
        createdAtDate: nowTimestamp,
        updatedAtDate: serverTimestamp(),
        postedAtDate: serverTimestamp(),
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
      createdAt: serverTimestamp(),
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
        totals: {
          pending: increment(1),
        },
        [periodKey]: {
          pending: increment(1),
        },
      },
      { merge: true }
    );
    batch.set(newPackageForInsideCompany, packageToUpload);
    batch.set(packageRefForAvailablePackages, packageToUpload);
    batch.set(totalsRef, packageLog);

    await batch.commit();
  } catch (error) {
    throw error;
  }
}

export async function pushMockPackages(
  companyID: string,
  previousMonths: PreviousMonths = 0
) {
  const companyRef = getCompanyRef(companyID);
  const packagesRef = collection(companyRef, Collections.packages);

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - previousMonths);

  const mockPackageObjectWithUpdatedAt = { ...mockPackageObject };
  mockPackageObjectWithUpdatedAt.timeline!.updatedAtDate = serverTimestamp();

  for (let i = 0; i < 1; i++) {
    await addDoc(packagesRef, mockPackageObjectWithUpdatedAt);
  }
}
