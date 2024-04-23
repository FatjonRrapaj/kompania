import { Package } from "@/api/package";
import watermelonDB from "@/watermelon";
import PackageModel from "@/watermelon/models/Package";

export const createPackageFromFirebasePackage = async (
  firebasePackageObject: Package
) => {
  const packagesCollection = watermelonDB.get<PackageModel>("packages");

  try {
    await watermelonDB.write(async () => {
      packagesCollection.create((newRecord) => {
        //identification
        newRecord._raw.id = firebasePackageObject.uid!;
        newRecord.packageName = firebasePackageObject.packageName;
        newRecord.packageScanId = firebasePackageObject.scanId;

        //package status
        newRecord.packageStatus = firebasePackageObject.status!;
        newRecord.packageTimeLineStatus = firebasePackageObject.timelineStatus!;

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
        newRecord.notesForPackage = firebasePackageObject.notesForPackage;

        //package price
        newRecord.paymentAmount = firebasePackageObject.paymentAmount;
        newRecord.shippingCost = firebasePackageObject.shippingCost;
        newRecord.cashOnDelivery = firebasePackageObject.cashOnDelivery;
        newRecord.currencyShortValue = firebasePackageObject.currency;

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
    console.log("createPackageFromFirebasePackage error: ", error);
  }
};
