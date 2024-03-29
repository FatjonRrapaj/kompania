interface UserLoginInfo {
  email: string;
  password: string;
}

interface CompanyUserProfile {
  email: string;
  companyID: string;
  firstName: string;
  lastName: string;
}

interface Totals {
  completed: number;
  pending: number;
  problematic: number;
}

interface CompanyTotals {
  allTotals: Totals;
  [x: string]: Totals;
}

interface Company {
  email: string;
  companyName: string;
}

interface Customer {
  name: string;
  phoneNumber: string;
  address: string;
  notes?: string;
  profileLink?: string;
}

type CurrencyShortValue = "ALL" | "EUR";

interface Currency {
  symbol: string;
  name: string;
}

type PackageStatus = "completed" | "pending" | "problematic";

type PackageTimelineStatus =
  | "available"
  | "accepted"
  | "picked"
  | "delivered"
  | "returned";

interface Package {
  customer: Customer;
  creationDate: Date;
  currency: Currency;
  price: number;
  status: PackageStatus;
  uid?: string;
}
