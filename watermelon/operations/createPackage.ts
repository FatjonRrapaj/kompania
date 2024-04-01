import { Package } from "@/api/package";
import watermelonDB from "..";
import PackageModel from "../models/Package";

export const createPackageFromFirebasePackage = async (
  firebasePackageObject: Package
) => {
  await watermelonDB.write(async () => {
    // const existingPackage = await watermelonDB.collections
    //   .get("packages")
    //   .find(firebasePackageObject!.uid!);

    // if (existingPackage) {
    //   existingPackage.prepareUpdate((record) => {});
    // } else {
    watermelonDB.collections
      .get<PackageModel>("packages")
      .prepareCreate((newRecord) => {
        //identification
        //TODO: id
        newRecord._setRaw("id", firebasePackageObject.uid!);
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

        //package dates
        newRecord.createdAt = firebasePackageObject.timeline?.createdAt;
        newRecord.postedAt = firebasePackageObject.timeline?.postedAt;
        newRecord.acceptedAt = firebasePackageObject.timeline?.acceptedAt;
        newRecord.pickedAt = firebasePackageObject.timeline?.pickedAt;
        newRecord.deliveredAt = firebasePackageObject.timeline?.deliveredAt;
        newRecord.returnedAt = firebasePackageObject.timeline?.returnedAt;
      });
  });
};
