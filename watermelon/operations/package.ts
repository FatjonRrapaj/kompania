import { Package } from "@/api/package";
import watermelonDB from "..";
import PackageModel from "../models/Package";
import { Q } from "@nozbe/watermelondb";

const packagesCollection = watermelonDB.get<PackageModel>("packages");

export const findPackage = async (
  uid: string
): Promise<PackageModel | undefined> => {
  try {
    const existingPackage = await packagesCollection.find(uid);
    return existingPackage as PackageModel;
  } catch (error) {
    console.log("findPackage error: ", error);
    return undefined;
  }
};

export const createPackageFromFirebasePackage = async (
  firebasePackageObject: Package
) => {
  try {
    await watermelonDB.write(async () => {
      packagesCollection.create((newRecord) => {
        //identification
        newRecord._raw.id = firebasePackageObject.uid!;
        newRecord.packageName = firebasePackageObject.packageName;
        newRecord.packageScanId = firebasePackageObject.scanId;

        //package status
        newRecord.packageStatus = firebasePackageObject.status;
        newRecord.packageTimeLineStatus = firebasePackageObject.timelineStatus;

        //receiver
        newRecord.receiverId = firebasePackageObject?.receiver?.uid;
        newRecord.receiverName = firebasePackageObject.receiver?.name;
        newRecord.receiverPhoneNumber =
          firebasePackageObject.receiver?.phoneNumber;
        newRecord.receiverProfileUrl =
          firebasePackageObject.receiver?.profileUrl;
        newRecord.notesForReceiver = firebasePackageObject.receiver?.notes;
        newRecord.receiverAddressLat =
          firebasePackageObject.receiver?.receiverLocation?.coordinates?.latitude;
        newRecord.receiverAddressLng =
          firebasePackageObject.receiver?.receiverLocation?.coordinates?.longitude;
        newRecord.receiverAddressDescription =
          firebasePackageObject.receiver?.receiverLocation?.description;

        //package courier
        newRecord.courierId = firebasePackageObject.courier?.uid;
        newRecord.courierName = firebasePackageObject?.courier?.name;
        newRecord.courierPhoneNumber =
          firebasePackageObject?.courier?.phoneNumber;
        newRecord.courierProfilePicture =
          firebasePackageObject?.courier?.profilePicture;

        //package size & speficics
        newRecord.packageHeight = firebasePackageObject.packageDetails.height;
        newRecord.packageWeight = firebasePackageObject.packageDetails.weight;
        newRecord.packageWidth = firebasePackageObject.packageDetails.width;
        newRecord.packageLength = firebasePackageObject.packageDetails.length;
        newRecord.isFragile = firebasePackageObject.packageDetails.isFragile;
        newRecord.canBeOpened =
          firebasePackageObject.packageDetails.canBeOpened;

        //package price
        newRecord.paymentAmount = firebasePackageObject.paymentAmount;
        newRecord.shippingCost = firebasePackageObject.shippingCost;
        newRecord.cashOnDelivery = firebasePackageObject.cashOnDelivery;
        newRecord.currencyName = firebasePackageObject?.currency?.name;
        newRecord.currencySymbol = firebasePackageObject?.currency?.symbol;

        //package company location
        newRecord.companyLocationLat =
          firebasePackageObject.companyAddress?.coordinates.latitude;
        newRecord.companyLocationLng =
          firebasePackageObject.companyAddress?.coordinates.longitude;
        newRecord.companyLocationDescription =
          firebasePackageObject.companyAddress?.description;

        //package timeline
        newRecord.createdAtDate = firebasePackageObject.timeline?.createdAtDate;
        newRecord.postedAtDate = firebasePackageObject.timeline?.postedAtDate;
        newRecord.acceptedAtDate =
          firebasePackageObject.timeline?.acceptedAtDate;
        newRecord.pickedAtDate = firebasePackageObject.timeline?.pickedAtDate;
        newRecord.deliveredAtDate =
          firebasePackageObject.timeline?.deliveredAtDate;
        newRecord.returnedAtDate =
          firebasePackageObject.timeline?.returnedAtDate;
        newRecord.updatedAtDate = firebasePackageObject.timeline?.updatedAtDate;
      });
    });
  } catch (error) {
    console.log(
      "createPackageFromFirebasePackage error: ",
      error
      //   "package: ",
      //   firebasePackageObject
    );
  }
};

export const updateExistingPackage = async (
  existingPackage: PackageModel,
  firebasePackageObject: Package
) => {
  try {
    await watermelonDB.write(async () => {
      existingPackage.update((existingWatermelonPackage) => {
        existingWatermelonPackage.packageName =
          firebasePackageObject.packageName;
        existingWatermelonPackage.packageScanId = firebasePackageObject.scanId;

        //package status
        existingWatermelonPackage.packageStatus = firebasePackageObject.status;
        existingWatermelonPackage.packageTimeLineStatus =
          firebasePackageObject.timelineStatus;

        //receiver
        existingWatermelonPackage.receiverId =
          firebasePackageObject?.receiver?.uid;
        existingWatermelonPackage.receiverName =
          firebasePackageObject.receiver?.name;
        existingWatermelonPackage.receiverPhoneNumber =
          firebasePackageObject.receiver?.phoneNumber;
        existingWatermelonPackage.receiverProfileUrl =
          firebasePackageObject.receiver?.profileUrl;
        existingWatermelonPackage.notesForReceiver =
          firebasePackageObject.receiver?.notes;
        existingWatermelonPackage.receiverAddressLat =
          firebasePackageObject.receiver?.receiverLocation?.coordinates?.latitude;
        existingWatermelonPackage.receiverAddressLng =
          firebasePackageObject.receiver?.receiverLocation?.coordinates?.longitude;
        existingWatermelonPackage.receiverAddressDescription =
          firebasePackageObject.receiver?.receiverLocation?.description;

        //package courier
        existingWatermelonPackage.courierId =
          firebasePackageObject.courier?.uid;
        existingWatermelonPackage.courierName =
          firebasePackageObject?.courier?.name;
        existingWatermelonPackage.courierPhoneNumber =
          firebasePackageObject?.courier?.phoneNumber;
        existingWatermelonPackage.courierProfilePicture =
          firebasePackageObject?.courier?.profilePicture;

        //package size & speficics
        existingWatermelonPackage.packageHeight =
          firebasePackageObject.packageDetails.height;
        existingWatermelonPackage.packageWeight =
          firebasePackageObject.packageDetails.weight;
        existingWatermelonPackage.packageWidth =
          firebasePackageObject.packageDetails.width;
        existingWatermelonPackage.packageLength =
          firebasePackageObject.packageDetails.length;
        existingWatermelonPackage.isFragile =
          firebasePackageObject.packageDetails.isFragile;
        existingWatermelonPackage.canBeOpened =
          firebasePackageObject.packageDetails.canBeOpened;

        //package price
        existingWatermelonPackage.paymentAmount =
          firebasePackageObject.paymentAmount;
        existingWatermelonPackage.shippingCost =
          firebasePackageObject.shippingCost;
        existingWatermelonPackage.cashOnDelivery =
          firebasePackageObject.cashOnDelivery;
        existingWatermelonPackage.currencyName =
          firebasePackageObject?.currency?.name;
        existingWatermelonPackage.currencySymbol =
          firebasePackageObject?.currency?.symbol;

        //package company location
        existingWatermelonPackage.companyLocationLat =
          firebasePackageObject.companyAddress?.coordinates.latitude;
        existingWatermelonPackage.companyLocationLng =
          firebasePackageObject.companyAddress?.coordinates.longitude;
        existingWatermelonPackage.companyLocationDescription =
          firebasePackageObject.companyAddress?.description;

        //package dates
        existingWatermelonPackage.createdAtDate =
          firebasePackageObject.timeline?.createdAtDate;
        existingWatermelonPackage.postedAtDate =
          firebasePackageObject.timeline?.postedAtDate;
        existingWatermelonPackage.acceptedAtDate =
          firebasePackageObject.timeline?.acceptedAtDate;
        existingWatermelonPackage.pickedAtDate =
          firebasePackageObject.timeline?.pickedAtDate;
        existingWatermelonPackage.deliveredAtDate =
          firebasePackageObject.timeline?.deliveredAtDate;
        existingWatermelonPackage.returnedAtDate =
          firebasePackageObject.timeline?.returnedAtDate;
      });
    });
  } catch (error) {
    console.log(
      "updateExistingPackage error: ",
      error,
      "package: ",
      firebasePackageObject,
      "existing package: ",
      existingPackage
    );
  }
};

export const deleteExistingPackage = async (existingPackage: PackageModel) => {
  try {
    await watermelonDB.write(async () => {
      existingPackage.destroyPermanently();
    });
  } catch (error) {}
};

export const getAllPackagesCount = async () => {
  const count = packagesCollection.query().fetchCount();
  return count;
};

export const observePackages = () =>
  packagesCollection.query(Q.sortBy("updatedAtDate", Q.desc)).observe();

//Maybe you do not need a second packages table just one that queries and gets the fresh packages, last week or last 30.

//TODO: I think from here you can change the query type and fetch specific packages
// export const observePackages = () =>
//   packagesCollection.query(Q.sortBy("updatedAtDate", Q.desc)).observe();
