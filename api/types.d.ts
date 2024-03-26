interface Company {
  email: string;
  companyName: string;
}

interface Costumer {
  name: "string";
}

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