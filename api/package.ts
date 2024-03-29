import { doc, getDoc } from "firebase/firestore";
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

export type PackageStatus = "completed" | "pending" | "problematic";

export type PackageTimelineStatus =
  | "available"
  | "accepted"
  | "picked"
  | "delivered"
  | "returned";

export interface Package {
  customer: Customer;
  creationDate: Date;
  currency: Currency;
  price: number;
  status: PackageStatus;
  uid?: string;
}

type MonthHalfPeriod = 1 | 2;
interface PackagesPeriod {
  year: number;
  month: number;
  monthHalfPeriod: MonthHalfPeriod;
  packagesPeriodName: string;
}

function getPeriod(date?: Date): PackagesPeriod {
  const dateToUse = date ?? new Date();
  const year = dateToUse.getFullYear();
  const month = dateToUse.getMonth() + 1;
  const day = dateToUse.getDate();
  let monthHalfPeriod: MonthHalfPeriod = day <= 15 ? 1 : 2;

  const packagesPeriodName = `packages-${year}-${month
    .toString()
    .padStart(2, "0")}-${monthHalfPeriod}`;

  return {
    year,
    month,
    monthHalfPeriod,
    packagesPeriodName,
  };
}

function getPreviousPeriod(): PackagesPeriod {
  const {
    year: currentYear,
    month: currentMonth,
    monthHalfPeriod: currentMonthHalfPeriod,
  } = getPeriod();

  let prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  let prevMonth =
    currentMonthHalfPeriod === 1 ? currentMonth - 1 : currentMonth;
  if (prevMonth === 0) {
    //it means the current month is january, and we need to reset to december
    prevMonth = 12;
  }
  let prevMonthHalfPeriod: MonthHalfPeriod =
    currentMonthHalfPeriod === 2 ? 1 : 2;

  let prevPackagesPeriodName = `packages-${prevYear}-${prevMonth
    .toString()
    .padStart(2, "0")}-${prevMonthHalfPeriod}`;

  return {
    year: prevYear,
    month: prevMonth,
    monthHalfPeriod: prevMonthHalfPeriod,
    packagesPeriodName: prevPackagesPeriodName,
  };
}

const getLatestPeriodWithPackages = async (companyID: string): Promise<any> => {
  const companyRef = getCompanyRef(companyID);
  const companySnapshot = await getDoc(companyRef);

  if (!companySnapshot.exists) {
    throw generateCustomError({ errorKey: "companyIdNotFound" });
  }

  const companyData = companySnapshot.data();

  if (!companyData || !companyData.totals) {
    throw generateCustomError({ errorKey: "companyDocumentNotFound" });
  }

  const periodsWithPackages = Object.keys(companyData.totals).filter(
    (period) => {
      const totals = companyData.totals[period];
      return (
        totals.completed > 0 || totals.pending > 0 || totals.problematic > 0
      );
    }
  );

  // Sort periods by date in descending order to get the latest
  periodsWithPackages.sort((a, b) => {
    const dateA = new Date(a);
    console.log("dateA: ", dateA);
    const dateB = new Date(b);
    console.log("dateB: ", dateB);
    return dateB.getTime() - dateA.getTime();
  });
  console.log("periodsWithPackages: ", periodsWithPackages);
  return periodsWithPackages;
};
