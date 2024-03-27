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

interface Package {
  customer: Customer;
  creationDate: Date;
  currency: Currency;
  price: number;
  status: PackageStatus;
  uid?: string;
}
