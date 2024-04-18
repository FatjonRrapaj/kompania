import { Package } from "@/api/package";
import { isReceivedFirebaseServerTimestamp } from "@/utils/date";
import watermelonDB from "@/watermelon";
import PackageModel from "@/watermelon/models/Package";

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
        existingPackage.currencyShortValue = firebasePackageObject.currency;
        //package company location
        existingWatermelonPackage.companyLocationLat =
          firebasePackageObject.companyAddress?.coordinates.latitude;
        existingWatermelonPackage.companyLocationLng =
          firebasePackageObject.companyAddress?.coordinates.longitude;
        existingWatermelonPackage.companyLocationDescription =
          firebasePackageObject.companyAddress?.description;

        //package timeline
        if (
          isReceivedFirebaseServerTimestamp(
            firebasePackageObject?.timeline?.postedAtDate
          )
        ) {
          existingPackage.postedAtDate =
            firebasePackageObject.timeline?.postedAtDate.seconds * 1000;
        }

        if (
          isReceivedFirebaseServerTimestamp(
            firebasePackageObject?.timeline?.acceptedAtDate
          )
        ) {
          existingPackage.acceptedAtDate =
            firebasePackageObject.timeline?.acceptedAtDate.seconds * 1000;
        }

        if (
          isReceivedFirebaseServerTimestamp(
            firebasePackageObject?.timeline?.pickedAtDate
          )
        ) {
          existingPackage.pickedAtDate =
            firebasePackageObject.timeline?.pickedAtDate.seconds * 1000;
        }

        if (
          isReceivedFirebaseServerTimestamp(
            firebasePackageObject?.timeline?.deliveredAtDate
          )
        ) {
          existingPackage.deliveredAtDate =
            firebasePackageObject.timeline?.deliveredAtDate.seconds * 1000;
        }

        if (
          isReceivedFirebaseServerTimestamp(
            firebasePackageObject?.timeline?.returnedAtDate
          )
        ) {
          existingPackage.returnedAtDate =
            firebasePackageObject.timeline?.returnedAtDate.seconds * 1000;
        }

        if (
          isReceivedFirebaseServerTimestamp(
            firebasePackageObject?.timeline?.updatedAtDate
          )
        ) {
          existingPackage.updatedAtDate =
            firebasePackageObject.timeline?.updatedAtDate.seconds * 1000;
        }

        existingPackage.createdAtDate =
          firebasePackageObject.timeline?.createdAtDate;
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
