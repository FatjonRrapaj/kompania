import { Customer } from "@/api/company";
import watermelonDB from "@/watermelon";
import CustomerModel from "@/watermelon/models/Customer";

export const createCustomerFromFirebaseCustomer = async (
  customerObject: Customer
) => {
  const customersCollection = watermelonDB.get<CustomerModel>("customers");

  try {
    await watermelonDB.write(async () => {
      customersCollection.create((newRecord) => {
        newRecord._raw.id = customerObject.uid!;
        newRecord.name = customerObject.name;
        newRecord.phoneNumber = customerObject.phoneNumber;
        newRecord.lat = customerObject.receiverLocation?.coordinates?.latitude;
        newRecord.lng = customerObject.receiverLocation?.coordinates?.longitude;
        newRecord.addressDescription =
          customerObject.receiverLocation?.description;
        newRecord.profileLink = customerObject.profileLink;
        newRecord.createdAtDate = customerObject.createdAtDate;
      });
    });
  } catch (error) {
    console.log("createPackageFromFirebasePackage error: ", error);
  }
};
