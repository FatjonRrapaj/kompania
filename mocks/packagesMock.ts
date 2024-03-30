import {
  Courier,
  Currency,
  Package,
  PackageStatus,
  PackageTimelineStatus,
} from "@/api/package";

export const mockPackageObject: Package = {
  packageName: "Sample Package",
  receiverName: "John Doe",
  receiverPhoneNumber: "123-456-7890",
  address: "1234 Main St, City, Country",
  notesForReceiver: "Leave at front door",
  packageDetails: {
    weight: 2.5,
    length: 20,
    width: 15,
    height: 10,
    fragile: true,
    canBeOpened: false,
  },
  paymentAmount: 50,
  shippingCost: 10,
  cashOnDelivery: 20,
  notesForPackage: "Urgent delivery",
  createdAt: "2024-03-30T10:00:00Z",
  updatedAt: "2024-03-30T13:30:00Z",
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
