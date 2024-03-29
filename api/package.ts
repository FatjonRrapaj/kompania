import { Customer } from "./company";

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
