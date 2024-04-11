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
    createdAt: 1712062143,
    updatedAtDate: 1712062143,
    pickedAt: 1712062143,
    acceptedAt: 1712062143,
    deliveredAt: 1712062143,
    returnedAt: 1712062143,
    postedAt: 1712062143,
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
