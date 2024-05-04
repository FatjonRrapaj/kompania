import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  increment,
  query,
  where,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";

import { CompanyAddress, getCompanyRef, Customer, Company } from "./company";
import { mockPackageObject } from "@/mocks/packagesMock";
import { CompanyUserProfile } from "./auth";
import generateCustomError from "@/utils/customError";
import PackageModel from "@/watermelon/models/Package";

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

type PackageLogAction = "created" | "edited" | "updated" | "deleted";

export interface PackageLog {
  action: PackageLogAction;
  package?: Package;
  packageId?: string;
  company: Company;
  user: CompanyUserProfile;
  createdAt: number;
  oldPackageData?: Package;
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
  status?: PackageStatus;
  timelineStatus?: PackageTimelineStatus;
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

  //TODO: create a notifications collection inside each company & update through the diff cloud functions, also have them as notifications.
  //TODO: do the notifications subscription on a company ID Base.
  //TODO: maybe pass uid to receiver

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
    const logsRef = doc(collection(db, Collections.logs));
    const availablePackagesCollectionInfoRef = doc(
      db,
      Collections.availablePackages,
      "info"
    );
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
    batch.set(
      availablePackagesCollectionInfoRef,
      {
        lastUpdatedAt: nowTimestamp,
      },
      { merge: true }
    );
    batch.set(logsRef, packageLog);

    await batch.commit();
    return newPackageForInsideCompany.id;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
}

export async function callEditPackage(
  editingPackageData: PackageFormData,
  company: Company,
  profile: CompanyUserProfile
): Promise<void> {
  const now = new Date();
  const nowTimestamp = now.getTime();

  try {
    const packageRef = doc(
      db,
      Collections.companies,
      company.uid!,
      Collections.packages,
      editingPackageData.uid!
    );
    const packageDocument = await getDoc(packageRef);

    if (!packageDocument.exists()) {
      throw generateCustomError({ errorKey: "packageDoesNotExist" });
    }

    //the package is inside the available packages packages...
    //TODO: it can also be inside the picked packages... but can we edit it at that point???
    //TODO: it can also be inside the delivered packages, etc.
    //TODO: customers api...

    const oldPackageData = packageDocument.data() as Package;

    const packageToEdit: Package = {
      scanId: editingPackageData.packageId,
      packageName: editingPackageData.packageName,
      receiver: {
        name: editingPackageData.receiverName,
        profileUrl: editingPackageData.profileLink,
        phoneNumber: editingPackageData.phoneNumber,
        notes: editingPackageData.notesForReceiver,
        receiverLocation: {
          description: editingPackageData.address,
        },
      },
      packageDetails: {
        canBeOpened: editingPackageData.canBeOpened,
        isFragile: editingPackageData.isFragile,
        ...(editingPackageData.packageWeight && {
          weight: parseInt(editingPackageData.packageWeight),
        }),
        ...(editingPackageData.packageWidth && {
          width: parseInt(editingPackageData.packageWidth),
        }),
        ...(editingPackageData.packageHeight && {
          height: parseInt(editingPackageData.packageHeight),
        }),
        ...(editingPackageData.packageLength && {
          length: parseInt(editingPackageData.packageLength),
        }),
      },
      paymentAmount: parseInt(editingPackageData.paymentAmount),
      shippingCost: parseInt(editingPackageData.shippingCost),
      cashOnDelivery: parseInt(editingPackageData.cashOnDelivery),
      ...(editingPackageData.notesForPackage && {
        notesForPackage: editingPackageData.notesForPackage,
      }),
      timeline: {
        ...oldPackageData.timeline,
        updatedAtDate: nowTimestamp,
      },
      currency: editingPackageData.currency,
      companyAddress: company!.locations![0] as CompanyAddress,
    };

    const companyRef = getCompanyRef(company.uid!);
    const logsRef = doc(collection(db, Collections.logs));

    const packageLog: PackageLog = {
      action: "edited",
      package: packageToEdit,
      company: company,
      user: profile,
      createdAt: nowTimestamp,
      oldPackageData: oldPackageData,
    };

    const packageRefInsideAvailablePackages = doc(
      db,
      Collections.availablePackages,
      packageDocument.id
    );

    const batch = writeBatch(db);

    const packageDocInsideAvailablePackages = await getDoc(
      packageRefInsideAvailablePackages
    );

    if (packageDocInsideAvailablePackages.exists()) {
      batch.set(packageRefInsideAvailablePackages, packageToEdit, {
        merge: true,
      });
    }

    batch.update(packageRef, packageToEdit as any);
    batch.set(logsRef, packageLog);
    batch.set(
      companyRef,
      {
        lastUpdatedAt: nowTimestamp,
      },
      { merge: true }
    );
    await batch.commit();
  } catch (error) {
    throw error;
  }
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
    const docs: Package[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ uid: doc.id, ...doc.data() } as Package);
    });
    return docs;
  } catch (error) {
    throw error;
  }
}

export async function callDeletePackage(
  packageObject: PackageModel,
  company: Company,
  profile: CompanyUserProfile
): Promise<void> {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const nowTimestamp = now.getTime();
  try {
    const packageRef = doc(
      db,
      Collections.companies,
      company.uid!,
      Collections.packages,
      packageObject.id
    );
    const packageDocument = await getDoc(packageRef);
    if (!packageDocument.exists()) {
      throw generateCustomError({ errorKey: "packageDoesNotExist" });
    }
    const oldPackageData = packageDocument.data() as Package;

    const logsRef = doc(collection(db, Collections.logs));

    const packageLog: PackageLog = {
      action: "deleted",
      company: company,
      package: oldPackageData,
      user: profile,
      createdAt: nowTimestamp,
    };

    //TODO: it can also be inside picked etc, see what you can do w delete operation for these types of packages.
    const packageRefInsideAvailablePackages = doc(
      db,
      Collections.availablePackages,
      packageDocument.id
    );

    const packageDocInsideAvailablePackages = await getDoc(
      packageRefInsideAvailablePackages
    );

    const batch = writeBatch(db);

    if (packageDocInsideAvailablePackages.exists()) {
      batch.delete(packageRefInsideAvailablePackages);
    }
    batch.delete(packageRef);
    batch.set(logsRef, packageLog);

    //updating the stats for deleted package
    const currentPackageStatus = packageObject.packageStatus;
    const aggregatorRef = doc(
      db,
      Collections.companies,
      Collections.aggregator
    );
    const periodKey = `packages-${year}-${month}`;
    const companyRef = getCompanyRef(company.uid!);
    batch.set(
      aggregatorRef,
      {
        [currentPackageStatus]: increment(-1),
      },
      { merge: true }
    );
    batch.set(
      companyRef,
      {
        lastUpdatedAt: nowTimestamp,
        totals: {
          all: {
            [currentPackageStatus]: increment(-1),
          },
          [periodKey]: {
            [currentPackageStatus]: increment(-1),
          },
        },
      },
      { merge: true }
    );
    await batch.commit();
  } catch (error) {}
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
