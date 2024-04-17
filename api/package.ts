import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Collections } from "@/constants/Firestore";

import { CompanyAddress, getCompanyRef, Customer } from "./company";

import { mockPackageObject } from "@/mocks/packagesMock";

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

export interface Package {
  uid?: string;
  packageName: string;
  scanId: string;
  receiver?: Customer;
  packageDetails: {
    weight: number;
    length: number;
    width: number;
    height: number;
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
  currency: Currency;
  companyAddress?: CompanyAddress;
}

export type PreviousMonths = 2 | 1 | 0;

export async function createPackage(params: any) {}

export async function pushMockPackages(
  companyID: string,
  previousMonths: PreviousMonths = 0
) {
  const companyRef = getCompanyRef(companyID);
  const last7DaysPackagesRef = collection(
    companyRef,
    Collections.last7DaysPackages
  );

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - previousMonths);
  const timeStamp = currentDate.getTime();

  const firebaseTimeStamp = serverTimestamp();
  console.log("firebaseTimeStamp: ", firebaseTimeStamp);
  console.log("timeStamp: ", timeStamp);

  //get date from timeStamp

  const mockPackageObjectWithUpdatedAt = { ...mockPackageObject };
  mockPackageObjectWithUpdatedAt.timeline!.updatedAtDate = timeStamp;

  for (let i = 0; i < 1; i++) {
    await addDoc(last7DaysPackagesRef, mockPackageObjectWithUpdatedAt);
  }
}
