import {
  FieldValue,
  addDoc,
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";

import { CompanyAddress, getCompanyRef, Customer, Company } from "./company";

import { mockPackageObject } from "@/mocks/packagesMock";
import { UserProfile } from "firebase/auth";
import { CompanyUserProfile } from "./auth";
import { merge } from "@nozbe/watermelondb/utils/rx";

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
  updatedAtDate?: FieldValue;
  postedAtDate?: FieldValue;
  acceptedAtDate?: FieldValue;
  pickedAtDate?: FieldValue;
  deliveredAtDate?: FieldValue;
  returnedAtDate?: FieldValue;
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
    weight?: string;
    length?: string;
    width?: string;
    height?: string;
    isFragile: boolean;
    canBeOpened: boolean;
  };
  paymentAmount: string;
  shippingCost: string;
  cashOnDelivery: string;
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
  //TODO: the logs collection boi (the user who posted this & timestamps & everything.)
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
        weight: packageData.packageWeight,
        width: packageData.packageWidth,
        height: packageData.packageHeight,
        length: packageData.packageLength,
      },
      paymentAmount: packageData.paymentAmount,
      shippingCost: packageData.shippingCost,
      cashOnDelivery: packageData.cashOnDelivery,
      notesForPackage: packageData.notesForPackage,
      status: "pending",
      timelineStatus: "available",
      timeline: {
        createdAtDate: nowTimestamp,
        updatedAtDate: serverTimestamp(),
        postedAtDate: serverTimestamp(),
      },
      currency: packageData.currency,
      companyAddress: company.location,
      companyId: company?.uid,
    };

    const packageLog: PackageLog = {
      action: "created",
      package: packageToUpload,
      company: company,
      user: profile,
      createdAt: serverTimestamp(),
    };

    await runTransaction(db, async (transaction) => {
      const companyRef = getCompanyRef(company.uid!);
      const allTotalsRef = doc(companyRef, "totals", "allTotals");
      const periodKey = `packages-${year}-${month}`;
      const periodTotalsRef = doc(companyRef, "totals", periodKey);

      const packagesRef = doc(companyRef, Collections.packages);
      const logsRef = doc(db, Collections.logs);

      const availablePackagesRef = collection(
        db,
        Collections.availablePackages
      );
      const newAvailablePackage = doc(availablePackagesRef);

      transaction.set(
        allTotalsRef,
        {
          pending: increment(1),
        },
        { merge: true }
      );

      transaction.set(
        periodTotalsRef,
        {
          pending: increment(1),
        },
        { merge: true }
      );

      transaction.set(packagesRef, packageToUpload);
      transaction.set(newAvailablePackage, packageToUpload);
      transaction.set(logsRef, packageLog);

      //TODO: link to zustand, add loading & toast messages & error handling
      //TODO: do the updatedAtListener.
    });
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
  const timeStamp = currentDate.getTime();

  const firebaseTimeStamp = serverTimestamp();
  console.log("firebaseTimeStamp: ", firebaseTimeStamp);
  console.log("timeStamp: ", timeStamp);

  //get date from timeStamp

  const mockPackageObjectWithUpdatedAt = { ...mockPackageObject };
  mockPackageObjectWithUpdatedAt.timeline!.updatedAtDate = serverTimestamp();

  for (let i = 0; i < 1; i++) {
    await addDoc(packagesRef, mockPackageObjectWithUpdatedAt);
  }
}
