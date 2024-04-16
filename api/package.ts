import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { Collections } from "@/constants/Firestore";

import {
  CompanyAddress,
  CustomerAddress,
  getCompanyRef,
  Customer,
} from "./company";
import generateCustomError from "@/utils/customError";

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
  createdAtDate?: string;
  updatedAtDate?: string;
  postedAtDate?: string;
  acceptedAtDate?: string;
  pickedAtDate?: string;
  deliveredAtDate?: string;
  returnedAtDate?: string;
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

export async function pushMockPackages(companyID: string) {
  const companyRef = getCompanyRef(companyID);
  const last7DaysPackagesRef = collection(
    companyRef,
    Collections.last7DaysPackages
  );

  for (let i = 0; i < 1; i++) {
    await addDoc(last7DaysPackagesRef, mockPackageObject);
  }
}
