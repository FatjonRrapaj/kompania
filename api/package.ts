import { collection, doc, getDoc } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";

import { Customer, getCompanyRef } from "./company";
import generateCustomError from "@/utils/customError";

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
  uid: string;
  packageName: string;
  receiverName: string;
  receiverPhoneNumber: string;
  address: string;
  notesForReceiver: string;
  packageDetails: {
    weight: number;
    length: number;
    width: number;
    height: number;
    fragile: boolean;
    canBeOpened: boolean;
  };
  paymentAmount: number;
  shippingCost: number;
  cashOnDelivery: number;
  notesForPackage: string;
  status: PackageStatus;
  timelineStatus: PackageTimelineStatus;
  courier: Courier;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}
