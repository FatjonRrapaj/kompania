import {
  Courier,
  Currency,
  Package,
  PackageStatus,
  PackageTimelineStatus,
} from "@/api/package";
import { Firestore, GeoPoint, Timestamp } from "firebase/firestore";

export const mockPackageObject: Package = {
  uid: "yadkajdknljadlknmaejfla",
  packageName: "Sample Package",
  scanId: "1712062143",
  receiver: {
    name: "John doe",
    phoneNumber: "123-456-7890",
    profileUrl: "https://google.com",
    notes: "Leave at front door",
    receiverLocation: {
      description: "Don Bosko street",
    },
  },
  packageDetails: {
    weight: 2.5,
    length: 20,
    width: 15,
    height: 10,
    isFragile: true,
    canBeOpened: false,
  },
  paymentAmount: 50,
  shippingCost: 10,
  cashOnDelivery: 20,
  timeline: {
    createdAtDate: 1712062143,
    updatedAtDate: 1712062143,
    pickedAtDate: 1712062143,
    acceptedAtDate: 1712062143,
    deliveredAtDate: 1712062143,
    returnedAtDate: 1712062143,
    postedAtDate: 1712062143,
  },
  notesForPackage: "Urgent delivery",
  status: "pending" as PackageStatus,
  timelineStatus: "available" as PackageTimelineStatus,
  courier: {
    name: "Jane Smith",
    phoneNumber: "987-654-3210",
    profilePicture: "https://example.com/profile.jpg",
  } as Courier,
  currency: {
    symbol: "$",
    name: "USD",
  } as Currency,
};

const packagesMockList: Package[] = [
  mockPackageObject,
  mockPackageObject,
  mockPackageObject,
  mockPackageObject,
  mockPackageObject,
];

export { packagesMockList };
