import { doc, getDoc } from "firebase/firestore";
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
  name: string;
  description?: string;
}

export interface CustomerAddress {
  coordinates?: GeoPoint;
  description?: string;
}

interface CompanyTotals {
  allTotals: Totals;
  [x: string]: Totals;
}

export interface Company {
  uid: string;
  email: string;
  companyName: string;
  totals: CompanyTotals;
  locations: CompanyAddress[];
}

export interface Customer {
  name: string;
  phoneNumber: string;
  address: CustomerAddress;
  notes?: string;
  profileLink?: string;
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
