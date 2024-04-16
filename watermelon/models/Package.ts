import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

import { TableName } from "../index";
class PackageModel extends Model {
  static table: TableName = "packages";
  @text("packageScanId") packageScanId!: string;

  @text("packageName") packageName?: string;
  @text("packageWeight") packageWeight?: number;
  @text("packageLength") packageLength?: number;
  @text("packageWidth") packageWidth?: number;
  @text("packageHeight") packageHeight?: number;
  @text("isFragile") isFragile?: boolean;
  @text("canBeOpened") canBeOpened?: boolean;

  @text("paymentAmount") paymentAmount!: number;
  @text("shippingCost") shippingCost!: number;
  @text("cashOnDelivery") cashOnDelivery!: number;
  @text("currencySymbol") currencySymbol!: string;
  @text("currencyName") currencyName!: string;

  @text("packageStatus") packageStatus!: string;
  @text("packageTimeLineStatus") packageTimeLineStatus!: string;

  @text("createdAtDate") createdAtDate?: string;
  @text("postedAtDate") postedAtDate?: string;
  @text("acceptedAtDate") acceptedAtDate?: string;
  @text("pickedAtDate") pickedAtDate?: string;
  @text("deliveredAtDate") deliveredAtDate?: string;
  @text("returnedAtDate") returnedAtDate?: string;
  @text("updatedAtDate") updatedAtDate?: string;

  @text("courierName") courierName?: string;
  @text("courierSurname") courierSurname?: string;
  @text("courierId") courierId?: string;
  @text("courierProfilePicture") courierProfilePicture?: string;
  @text("courierPhoneNumber") courierPhoneNumber?: string;

  @text("receiverId") receiverId?: string;
  @text("receiverName") receiverName?: string;
  @text("receiverProfileUrl") receiverProfileUrl?: string;
  @text("receiverAddressDescription") receiverAddressDescription?: string;
  @text("receiverAddressLat") receiverAddressLat?: number;
  @text("receiverAddressLng") receiverAddressLng?: number;
  @text("receiverPhoneNumber") receiverPhoneNumber?: string;
  @text("notesForReceiver") notesForReceiver?: string;

  @text("companyLocationLat") companyLocationLat?: number;
  @text("companyLocationLng") companyLocationLng?: number;
  @text("companyLocationDescription") companyLocationDescription?: string;
}

export default PackageModel;
