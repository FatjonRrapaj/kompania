import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

import { TableName } from "../index";
class PackageModel extends Model {
  static table: TableName = "packages";
  @field("packageScanId") packageScanId!: string;

  @field("packageName") packageName?: string;
  @field("packageWeight") packageWeight?: number;
  @field("packageLength") packageLength?: number;
  @field("packageWidth") packageWidth?: number;
  @field("packageHeight") packageHeight?: number;
  @field("isFragile") isFragile?: boolean;
  @field("canBeOpened") canBeOpened?: boolean;

  @field("paymentAmount") paymentAmount!: number;
  @field("shippingCost") shippingCost!: number;
  @field("cashOnDelivery") cashOnDelivery!: number;
  @field("currencySymbol") currencySymbol!: string;
  @field("currencyName") currencyName!: string;

  @field("packageStatus") packageStatus!: string;
  @field("packageTimeLineStatus") packageTimeLineStatus!: string;

  @field("createdAtDate") createdAtDate?: string;
  @field("postedAtDate") postedAtDate?: string;
  @field("acceptedAtDate") acceptedAtDate?: string;
  @field("pickedAtDate") pickedAtDate?: string;
  @field("deliveredAtDate") deliveredAtDate?: string;
  @field("returnedAtDate") returnedAtDate?: string;
  @field("updatedAtDate") updatedAtDate?: string;

  @field("courierName") courierName?: string;
  @field("courierId") courierId?: string;
  @field("courierProfilePicture") courierProfilePicture?: string;
  @field("courierPhoneNumber") courierPhoneNumber?: string;

  @field("receiverId") receiverId?: string;
  @field("receiverName") receiverName?: string;
  @field("receiverProfileUrl") receiverProfileUrl?: string;
  @field("receiverAddressDescription") receiverAddressDescription?: string;
  @field("receiverAddressLat") receiverAddressLat?: number;
  @field("receiverAddressLng") receiverAddressLng?: number;
  @field("receiverPhoneNumber") receiverPhoneNumber?: string;
  @field("notesForReceiver") notesForReceiver?: string;

  @field("companyLocationLat") companyLocationLat?: number;
  @field("companyLocationLng") companyLocationLng?: number;
  @field("companyLocationDescription") companyLocationDescription?: string;
}

export default PackageModel;
