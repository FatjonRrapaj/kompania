import { Model } from "@nozbe/watermelondb";
import { date, field, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "../index";
class PackageModel extends Model {
  static table: TableName = "packages";

  @field("packageId") packageId!: string;
  @field("packageName") packageName?: string;
  @field("packageWeight") packageWeight?: number;
  @field("packageLength") packageLength?: number;
  @field("packageWidth") packageWidth?: number;
  @field("packageHeight") packageHeight?: number;
  @field("paymentAmount") paymentAmount!: number;
  @field("shippingCost") shippingCost!: number;
  @field("currencySymbol") currencySymbol!: string;
  @field("currencyName") currencyName!: string;
  @field("fragile") fragile?: boolean;
  @field("canBeOpened") canBeOpened?: boolean;
  @field("packageStatus") packageStatus!: string;
  @field("packageTimeLineStatus") packageTimeLineStatus!: string;
  @field("createdAt") createdAt!: Date;
  @field("postedAt") postedAt?: Date;
  @field("acceptedAt") acceptedAt?: Date;
  @field("pickedAt") pickedAt?: Date;
  @field("deliveredAt") deliveredAt?: Date;
  @date("returnedAt") returnedAt?: Date;
  @field("courierName") courierName?: string;
  @field("courierSurname") courierSurname?: string;
  @field("courierId") courierId?: string;
  @field("courierProfilePicture") courierProfilePicture?: string;
  @field("courierPhoneNumber") courierPhoneNumber?: string;
}

export default Package;
