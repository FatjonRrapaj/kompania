import { doc, getDoc } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
import { getUserId } from "./auth";
import { Collections } from "@/constants/Firestore";
import { db } from "@/utils/firebase";
import generateCustomError from "@/utils/customError";

interface Totals {
  completed: number;
  pending: number;
  problematic: number;
}

interface CompanyLocation {
  coordinates: GeoPoint;
  name: string;
  description?: string;
}

interface CompanyTotals {
  allTotals: Totals;
  [x: string]: Totals;
}

export interface Company {
  email: string;
  companyName: string;
  totals: CompanyTotals;
  locations: CompanyLocation[];
}

export interface Customer {
  name: string;
  phoneNumber: string;
  address: string;
  notes?: string;
  profileLink?: string;
}

export const callGetCompany = async ({
  companyID,
}: {
  companyID: string;
}): Promise<Company> => {
  try {
    const companyDocReference = doc(db, Collections.companies, companyID);
    const companyDocSnapshot = await getDoc(companyDocReference);
    if (companyDocSnapshot.exists()) {
      return companyDocSnapshot.data() as Company;
    } else {
      throw generateCustomError({ errorKey: "companyIdNotFound" });
    }
  } catch (error) {
    throw error;
  }
};
