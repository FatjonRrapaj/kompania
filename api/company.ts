import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";

interface Totals {
  completed: number;
  pending: number;
  problematic: number;
}

export interface CompanyAddress {
  coordinates: GeoPoint;
  name?: string;
  description?: string;
}

export interface CustomerAddress {
  coordinates?: GeoPoint;
  description?: string;
}

interface CompanyTotals {
  all: Totals;
  [x: string]: Totals;
}

export interface Company {
  uid: string;
  email: string;
  companyName: string;
  totals: CompanyTotals;
  locations: CompanyAddress[];
  lastUpdatedAt: number;
  lastCustomerCreatedAt?: number;
}

export interface Customer {
  uid?: string;
  name: string;
  phoneNumber: string;
  profileLink?: string;
  notes?: string;
  receiverLocation?: CustomerAddress;
  createdAtDate?: number;
}
export const getCompanyRef = (companyID: string) =>
  doc(db, Collections.companies, companyID);

export const callGetCompany = async ({
  companyID,
}: {
  companyID: string;
}): Promise<Company> => {
  try {
    const companyDocReference = getCompanyRef(companyID);
    const companyDocSnapshot = await getDoc(companyDocReference);
    const uid = companyDocSnapshot.id;
    if (companyDocSnapshot.exists()) {
      return { ...companyDocSnapshot.data(), uid } as Company;
    } else {
      throw generateCustomError({ errorKey: "companyIdNotFound" });
    }
  } catch (error) {
    throw error;
  }
};

export async function callSyncCustomers(
  localLastCreatedAt: number,
  companyId: string
): Promise<Customer[]> {
  try {
    const companyRef = getCompanyRef(companyId);
    const packagesRef = collection(companyRef, Collections.customers);
    const q = query(
      packagesRef,
      where("createdAtDate", ">", localLastCreatedAt)
    );
    const querySnapshot = await getDocs(q);
    const docs: Customer[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ uid: doc.id, ...doc.data() } as Customer);
    });
    return docs;
  } catch (error) {
    throw error;
  }
}
