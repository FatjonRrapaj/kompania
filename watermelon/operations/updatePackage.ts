import { Package } from "@/api/package";
import watermelonDB from "..";
import PackageModel from "../models/Package";

export const updateExistingPackage = async (
  existingPackage: PackageModel,
  firebasePackageObject: Package
) => {
  await watermelonDB.write(async () => {
    existingPackage.prepareUpdate((existingWatermelonPackage) => {
      existingWatermelonPackage.packageName = firebasePackageObject.packageName;
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
      existingWatermelonPackage.courierId = firebasePackageObject.courier?.uid;
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
      existingWatermelonPackage.createdAt =
        firebasePackageObject.timeline?.createdAt;
      existingWatermelonPackage.postedAt =
        firebasePackageObject.timeline?.postedAt;
      existingWatermelonPackage.acceptedAt =
        firebasePackageObject.timeline?.acceptedAt;
      existingWatermelonPackage.pickedAt =
        firebasePackageObject.timeline?.pickedAt;
      existingWatermelonPackage.deliveredAt =
        firebasePackageObject.timeline?.deliveredAt;
      existingWatermelonPackage.returnedAt =
        firebasePackageObject.timeline?.returnedAt;
    });
  });
};
