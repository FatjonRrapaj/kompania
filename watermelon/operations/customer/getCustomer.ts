import watermelonDB from "@/watermelon";
import CustomerModel from "@/watermelon/models/Customer";
import { Q } from "@nozbe/watermelondb";

const customersCollection = watermelonDB.get<CustomerModel>("customers");

export const findCustomer = async (
  uid: string
): Promise<CustomerModel | undefined> => {
  try {
    const existingPackage = await customersCollection.find(uid);
    return existingPackage as CustomerModel;
  } catch (error) {
    return undefined;
  }
};

export const getCustomerLocalLastCreatedAt = async () => {
  const latestCusomters: CustomerModel[] = await customersCollection
    .query(Q.sortBy("createdAtDate", Q.desc), Q.take(1))
    .fetch();
  return latestCusomters[0]?.createdAtDate;
};

export const observeAndFilterCustomers = (searchTerm: string) =>
  customersCollection
    .query(
      Q.or(
        Q.where("name", Q.like(`${Q.sanitizeLikeString(searchTerm)}%`)),
        Q.where("phoneNumber", Q.like(`${Q.sanitizeLikeString(searchTerm)}%`))
      ),
      Q.sortBy("createdAtDate", Q.desc)
    )
    .observe();

export const checkForExistingCustomer = async (
  searchTerm: string
): Promise<CustomerModel | undefined> => {
  try {
    const latestCustomers: CustomerModel[] = await customersCollection
      .query(
        Q.where("phoneNumber", Q.like(`${Q.sanitizeLikeString(searchTerm)}%`)),
        Q.sortBy("createdAtDate", Q.desc)
      )
      .fetch();
    return latestCustomers?.[0];
  } catch {
    return undefined;
  }
};
