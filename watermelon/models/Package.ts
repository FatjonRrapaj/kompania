import { Model } from "@nozbe/watermelondb";
import { date, field, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "../index";
class Package extends Model {
  static table: TableName = "packages";

  @field("packageId") packageId!: string;
  @field("packageName") packageName!: string;
  @field("packageWeight") packageWeight!: number;
  @field("packageLength") packageLength!: number;
  @field("packageWidth") packageWidth!: number;
  @field("packageHeight") packageHeight!: number;
  @field("paymentAmount") paymentAmount!: number;
  @field("shippingCost") shippingCost!: number;
  @field("currency") currency!: { symbol: string; name: string } | null;
  @field("fragile") fragile!: boolean | null;
  @field("canBeOpened") canBeOpened!: boolean | null;
  @field("packageStatus") packageStatus!: string;
  @field("packageTimeLineStatus") packageTimeLineStatus!: string;
  @field("createdAt") createdAt!: Date;
  @field("postedAt") postedAt!: Date;
  @field("acceptedAt") acceptedAt!: Date | null;
  @field("pickedAt") pickedAt!: Date | null;
  @field("deliveredAt") deliveredAt!: Date | null;
  @date("returnedAt") returnedAt!: Date | null;
  @field("courierName") courierName!: string | null;
  @field("courierSurname") courierSurname!: string | null;
  @field("courierId") courierId!: string | null;
  @field("courierProfilePicture") courierProfilePicture!: string | null;
  @field("courierPhoneNumber") courierPhoneNumber!: string | null;
}

export default Package;
