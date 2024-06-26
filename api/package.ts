import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
  getDoc,
  GeoPoint,
} from "firebase/firestore";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";

import {
  CompanyAddress,
  getCompanyRef,
  Customer,
  Company,
  CustomerAddress,
} from "./company";
import { CompanyUserProfile } from "./auth";
import generateCustomError from "@/utils/customError";
import PackageModel from "@/watermelon/models/Package";
import { checkForExistingCustomer } from "@/watermelon/operations/customer/getCustomer";
import CustomerModel from "@/watermelon/models/Customer";

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
  notesForReceiver?: string;
  address: CustomerAddress;
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

type PackageLogAction =
  | "created"
  | "edited"
  | "updated"
  | "deleted"
  | "accepted"
  | "delivered";

export interface PackageLog {
  action: PackageLogAction;
  package?: Package;
  packageId?: string;
  company?: Company;
  courier?: Courier;
  user?: CompanyUserProfile;
  createdAt: number;
  oldPackageData?: Package;
}

export interface Package {
  uid?: string;
  packageName?: string;
  scanId: string;
  receiver: Customer;
  estimatedDeliveryTimeInSeconds?: number;
  estimatedDeliveryDistanceInMeters?: number;
  googleNamingStandardOriginAddress?: string;
  googleNamingStandardDestinationAddress?: string;
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

interface GoogleDistanceApiResponse {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: DistanceMatrixRow[];
  status: string;
}

interface DistanceMatrixRow {
  elements: DistanceMatrixElement[];
}

interface DistanceMatrixElement {
  distance: Distance;
  duration: Duration;
  status: string;
}

interface Distance {
  text: string;
  value: number;
}

interface Duration {
  text: string;
  value: number;
}

interface SimplifiedTravelTimeAndDistance {
  time: number;
  distance: number;
  googleNamingStandardOriginAddress: string;
  googleNamingStandardDestinationAddress: string;
}

async function getTravelTimeAndDistance(
  warehouseCoords: string,
  clientCoords: string
): Promise<SimplifiedTravelTimeAndDistance | undefined> {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${clientCoords}&language=sq&origins=${warehouseCoords}&units=metric&key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data: GoogleDistanceApiResponse = await response.json();
    console.log("data: ", data);
    if (
      data?.rows?.[0]?.elements?.[0]?.distance?.value &&
      data?.rows?.[0]?.elements?.[0]?.duration?.value
    ) {
      return {
        time: data.rows[0].elements[0].duration.value,
        distance: data.rows[0].elements[0].distance.value,
        googleNamingStandardDestinationAddress:
          data?.destination_addresses?.[0] ?? null,
        googleNamingStandardOriginAddress: data?.origin_addresses?.[0] ?? null,
      } as SimplifiedTravelTimeAndDistance;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("getTravelTimeAndDistance error: ", error);
    return undefined;
  }
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

  let estimatedDeliveryTimeInSeconds: number = 0;
  let estimatedDeliveryDistanceInMeters: number = 0;
  let googleNamingStandardDestinationAddress: string = "";
  let googleNamingStandardOriginAddress: string = "";

  if (
    packageData.address.coordinates?.latitude &&
    packageData.address.coordinates.longitude
  ) {
    const clientCoords = `${packageData.address.coordinates?.latitude},${packageData.address.coordinates?.longitude}`;
    const warehouseCoords = `${company.locations[0].coordinates.latitude},${company.locations[0].coordinates.longitude}`;
    const travelTimeResponse = await getTravelTimeAndDistance(
      warehouseCoords,
      clientCoords
    );

    if (travelTimeResponse) {
      estimatedDeliveryTimeInSeconds = travelTimeResponse.time;
      estimatedDeliveryDistanceInMeters = travelTimeResponse.distance;
      googleNamingStandardDestinationAddress =
        travelTimeResponse.googleNamingStandardDestinationAddress;
      googleNamingStandardOriginAddress =
        travelTimeResponse.googleNamingStandardOriginAddress;
    }
  }

  const receiver: Customer = {
    name: packageData.receiverName,
    profileLink: packageData.profileLink,
    phoneNumber: packageData.phoneNumber,
    notes: packageData.notesForReceiver,
    receiverLocation: {
      description: packageData.address.description,
      coordinates: packageData.address.coordinates,
    },
  };

  try {
    const packageToUpload: Package = {
      scanId: packageData.packageId,
      packageName: packageData.packageName,
      estimatedDeliveryTimeInSeconds,
      googleNamingStandardDestinationAddress,
      googleNamingStandardOriginAddress,
      estimatedDeliveryDistanceInMeters,
      receiver: {
        ...receiver,
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
    const newCustomerForInsideCompany = doc(
      collection(db, Collections.companies, company.uid!, Collections.customers)
    );
    const logsRef = doc(collection(db, Collections.logs));

    const existingCustomer: CustomerModel | undefined =
      await checkForExistingCustomer(receiver.phoneNumber);

    console.log("existingCustomer: ", existingCustomer);

    if (!existingCustomer) {
      console.log("ENTERS HERE.... CUSTOMER DOES NOT EXIST...");
      batch.set(newCustomerForInsideCompany, {
        ...receiver,
        createdAtDate: nowTimestamp,
      });
    }

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
        ...(!existingCustomer && { lastCustomerCreatedAt: nowTimestamp }),
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
    //TODO: it can also be inside the picked packages... but can we edit it at that point??? NO
    //TODO: it can also be inside the delivered packages, etc. NO

    const oldPackageData = packageDocument.data() as Package;

    const packageToEdit: Package = {
      scanId: editingPackageData.packageId,
      packageName: editingPackageData.packageName,
      receiver: {
        name: editingPackageData.receiverName,
        profileLink: editingPackageData.profileLink,
        phoneNumber: editingPackageData.phoneNumber,
        notes: editingPackageData.notesForReceiver,
        receiverLocation: {
          description: editingPackageData.address.description,
          coordinates: new GeoPoint(
            editingPackageData.address.coordinates?.latitude!,
            editingPackageData.address.coordinates?.longitude!
          ),
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
      } as any,
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
      if (doc.id !== "aggregator") {
        //if id==='aggregagtor', the doc is is the aggregator doc, not a package, do not process this
        docs.push({ uid: doc.id, ...doc.data() } as Package);
      }
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
