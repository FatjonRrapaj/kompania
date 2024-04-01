import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { Collections } from "@/constants/Firestore";

import { CompanyLocation, getCompanyRef } from "./company";
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
}

export type PackageStatus = "completed" | "pending" | "problematic";

export type PackageTimelineStatus =
  | "available"
  | "accepted"
  | "picked"
  | "delivered"
  | "returned";

export interface Package {
  uid?: string;
  packageName: string;
  receiverName: string;
  receiverPhoneNumber: string;
  receiverProfileUrl?: string;
  receiverAddress?: string;
  notesForReceiver: string;
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
  courier?: Courier;
  currency: Currency;
  createdAt?: string;
  updatedAt?: string;
  companyLocation?: CompanyLocation;
}

export async function pushMockPackages(companyID: string) {
  const companyRef = getCompanyRef(companyID);
  const last2WeeksPackagesRef = collection(
    companyRef,
    Collections.last2WeeksPackages
  );

  for (let i = 0; i < 1; i++) {
    await addDoc(last2WeeksPackagesRef, mockPackageObject);
  }
}
